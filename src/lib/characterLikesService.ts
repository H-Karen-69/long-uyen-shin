/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  collection
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { CharacterLike } from '../types';

const USER_ID_KEY_PRIMARY = 'longUyen_userId';
const USER_ID_KEY_LEGACY = 'longuyen_userid';

/**
 * Lấy hoặc khởi tạo ID người dùng duy nhất cho toàn bộ hệ thống Long Uyển
 * Đồng bộ lưu cả 2 key localStorage để tương thích Confession & Feedback
 */
export function getUserId(): string {
  if (typeof window === 'undefined') return 'guest_user';
  
  let uid = localStorage.getItem(USER_ID_KEY_PRIMARY) || localStorage.getItem(USER_ID_KEY_LEGACY);
  if (!uid) {
    uid = 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem(USER_ID_KEY_PRIMARY, uid);
    localStorage.setItem(USER_ID_KEY_LEGACY, uid);
  } else {
    // Đảm bảo cả 2 key đều có giá trị đồng bộ
    if (!localStorage.getItem(USER_ID_KEY_PRIMARY)) localStorage.setItem(USER_ID_KEY_PRIMARY, uid);
    if (!localStorage.getItem(USER_ID_KEY_LEGACY)) localStorage.setItem(USER_ID_KEY_LEGACY, uid);
  }
  return uid;
}

/**
 * Lắng nghe real-time lượt thả tim của 1 nhân vật cụ thể
 */
export function subscribeCharacterLike(
  charId: string,
  initialLikes: number = 0,
  onUpdate: (data: { totalLikes: number; isLiked: boolean }) => void
): () => void {
  const currentUserId = getUserId();
  const charDocRef = doc(db, 'character_likes', charId);

  try {
    const unsubscribe = onSnapshot(
      charDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as CharacterLike;
          const totalLikes = typeof data.totalLikes === 'number' ? Math.max(0, data.totalLikes) : initialLikes;
          const isLiked = Array.isArray(data.likedBy) && data.likedBy.includes(currentUserId);
          onUpdate({ totalLikes, isLiked });
        } else {
          // Chưa có document trên Firestore -> dùng initial likes
          onUpdate({ totalLikes: initialLikes, isLiked: false });
        }
      },
      (error) => {
        console.warn(`[character_likes] Firestore subscription warning for ${charId}:`, error);
        // Fallback an toàn khi offline hoặc quyền bị từ chối
        onUpdate({ totalLikes: initialLikes, isLiked: false });
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn(`[character_likes] Failed to init snapshot for ${charId}:`, err);
    onUpdate({ totalLikes: initialLikes, isLiked: false });
    return () => {};
  }
}

/**
 * Lắng nghe real-time toàn bộ collection character_likes
 */
export function subscribeAllCharacterLikes(
  initialLikesMap: Record<string, number>,
  onUpdate: (dataMap: Record<string, { totalLikes: number; isLiked: boolean }>) => void
): () => void {
  const currentUserId = getUserId();
  const likesCollectionRef = collection(db, 'character_likes');

  try {
    const unsubscribe = onSnapshot(
      likesCollectionRef,
      (snapshot) => {
        const result: Record<string, { totalLikes: number; isLiked: boolean }> = {};
        
        // Khởi tạo trước từ initial map
        Object.entries(initialLikesMap).forEach(([id, initCount]) => {
          result[id] = { totalLikes: initCount, isLiked: false };
        });

        snapshot.forEach((docSnap) => {
          const charId = docSnap.id;
          const data = docSnap.data() as CharacterLike;
          const initCount = initialLikesMap[charId] ?? 0;
          const totalLikes = typeof data.totalLikes === 'number' ? Math.max(0, data.totalLikes) : initCount;
          const isLiked = Array.isArray(data.likedBy) && data.likedBy.includes(currentUserId);
          result[charId] = { totalLikes, isLiked };
        });

        onUpdate(result);
      },
      (error) => {
        console.warn('[character_likes] Firestore collection subscription warning:', error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('[character_likes] Failed to init collection snapshot:', err);
    return () => {};
  }
}

/**
 * Bật/Tắt thả tim nhân vật (Toggle Like)
 * Hỗ trợ Atomic Firestore Update và SetDoc khởi tạo nếu chưa có document
 */
export async function toggleCharacterLike(
  charId: string,
  currentTotalLikes: number,
  isCurrentlyLiked: boolean
): Promise<{ success: boolean; newTotalLikes: number; isLiked: boolean }> {
  const userId = getUserId();
  const charDocRef = doc(db, 'character_likes', charId);

  const nextIsLiked = !isCurrentlyLiked;
  const nextTotalLikes = Math.max(0, currentTotalLikes + (nextIsLiked ? 1 : -1));

  try {
    const docSnap = await getDoc(charDocRef);

    if (!docSnap.exists()) {
      if (nextIsLiked) {
        // Document chưa tồn tại và user thả tim lần đầu
        await setDoc(charDocRef, {
          charId,
          totalLikes: 1,
          likedBy: [userId],
          lastUpdated: serverTimestamp(),
        });
      }
    } else {
      const data = docSnap.data() as CharacterLike;
      const alreadyLiked = Array.isArray(data.likedBy) && data.likedBy.includes(userId);

      if (nextIsLiked && !alreadyLiked) {
        await updateDoc(charDocRef, {
          totalLikes: increment(1),
          likedBy: arrayUnion(userId),
          lastUpdated: serverTimestamp(),
        });
      } else if (!nextIsLiked && alreadyLiked) {
        const currentCount = typeof data.totalLikes === 'number' ? data.totalLikes : 1;
        await updateDoc(charDocRef, {
          totalLikes: currentCount > 0 ? increment(-1) : 0,
          likedBy: arrayRemove(userId),
          lastUpdated: serverTimestamp(),
        });
      }
    }

    return {
      success: true,
      newTotalLikes: nextTotalLikes,
      isLiked: nextIsLiked,
    };
  } catch (error) {
    console.error(`[character_likes] Error toggling like for ${charId}:`, error);
    try {
      handleFirestoreError(error, OperationType.WRITE, `character_likes/${charId}`);
    } catch {
      // Ignored to avoid breaking caller
    }
    return {
      success: false,
      newTotalLikes: currentTotalLikes,
      isLiked: isCurrentlyLiked,
    };
  }
}
