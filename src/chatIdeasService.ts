import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './lib/firebase';

export interface ChatIdea {
  id: string;
  content: string;
  likes: number;
  likedBy: string[];
  createdAt?: any;
}

const LOCAL_STORAGE_KEY_USER_ID = 'longUyen_userId';

/**
 * Lấy hoặc khởi tạo ID người dùng ẩn danh từ LocalStorage
 */
export function getChatUserId(): string {
  if (typeof window === 'undefined') return 'guest_user';
  let userId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
  if (!userId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      userId = crypto.randomUUID();
    } else {
      userId = 'guest_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, userId);
  }
  return userId;
}

/**
 * Lắng nghe danh sách ý tưởng theo thời gian thực (Real-time listener qua onSnapshot)
 * Tự động sắp xếp nhiều tim nhất lên đầu
 */
export function subscribeToChatIdeas(
  callback: (ideas: ChatIdea[]) => void,
  onError?: (error: Error) => void
): () => void {
  const ideasCol = collection(db, 'chat_ideas');
  const q = query(ideasCol, orderBy('likes', 'desc'));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const ideas: ChatIdea[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          content: data.content || '',
          likes: typeof data.likes === 'number' ? data.likes : 0,
          likedBy: Array.isArray(data.likedBy) ? data.likedBy : [],
          createdAt: data.createdAt,
        };
      });

      // Sắp xếp giảm dần theo lượt tim, nếu bằng tim thì ý tưởng mới hơn sẽ xếp ở cuối (timeA - timeB)
      ideas.sort((a, b) => {
        if (b.likes !== a.likes) {
          return b.likes - a.likes;
        }
        const timeA = (a.createdAt as any)?.toMillis?.() || (a.createdAt as any)?.seconds * 1000 || 0;
        const timeB = (b.createdAt as any)?.toMillis?.() || (b.createdAt as any)?.seconds * 1000 || 0;
        return timeA - timeB;
      });

      callback(ideas);
    },
    (err) => {
      console.warn('Lỗi lắng nghe chat_ideas Firestore:', err);
      // Fallback query không orderBy nếu gặp lỗi index/chưa đồng bộ
      const fallbackUnsub = onSnapshot(
        ideasCol,
        (snapshot) => {
          const ideas: ChatIdea[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              content: data.content || '',
              likes: typeof data.likes === 'number' ? data.likes : 0,
              likedBy: Array.isArray(data.likedBy) ? data.likedBy : [],
              createdAt: data.createdAt,
            };
          });
          ideas.sort((a, b) => {
            if (b.likes !== a.likes) {
              return b.likes - a.likes;
            }
            const timeA = (a.createdAt as any)?.toMillis?.() || (a.createdAt as any)?.seconds * 1000 || 0;
            const timeB = (b.createdAt as any)?.toMillis?.() || (b.createdAt as any)?.seconds * 1000 || 0;
            return timeA - timeB;
          });
          callback(ideas);
        },
        (error) => {
          if (onError) onError(error);
        }
      );
      return fallbackUnsub;
    }
  );

  return unsubscribe;
}

/**
 * Xóa toàn bộ ý tưởng hiện tại trong collection chat_ideas
 */
export async function clearAllChatIdeas(): Promise<number> {
  const colRef = collection(db, 'chat_ideas');
  const snapshot = await getDocs(colRef);
  let count = 0;
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, 'chat_ideas', docSnap.id));
    count++;
  }
  return count;
}

/**
 * Gửi thêm ý tưởng mới vào Firestore (Không giới hạn số lần đăng)
 */
export async function addChatIdea(content: string): Promise<string> {
  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error('Nội dung ý tưởng không được để trống.');
  }

  const colRef = collection(db, 'chat_ideas');
  const newDoc = await addDoc(colRef, {
    content: trimmed,
    likes: 0,
    likedBy: [],
    createdAt: serverTimestamp(),
  });

  return newDoc.id;
}

/**
 * Thả tim hoặc Bỏ tim cho một ý tưởng
 */
export async function toggleLikeChatIdea(ideaId: string, userId: string): Promise<boolean> {
  const docRef = doc(db, 'chat_ideas', ideaId);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    throw new Error('Không tìm thấy ý tưởng này.');
  }

  const data = snap.data();
  const likedBy: string[] = Array.isArray(data.likedBy) ? data.likedBy : [];
  const hasLiked = likedBy.includes(userId);

  if (hasLiked) {
    // Bỏ tim
    await updateDoc(docRef, {
      likes: Math.max(0, (data.likes || 1) - 1),
      likedBy: arrayRemove(userId),
    });
    return false;
  } else {
    // Thả tim
    await updateDoc(docRef, {
      likes: (data.likes || 0) + 1,
      likedBy: arrayUnion(userId),
    });
    return true;
  }
}
