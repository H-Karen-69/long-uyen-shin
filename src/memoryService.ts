import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './lib/firebase';

export interface LeaderboardEntry {
  id?: string;
  playerName: string;
  timeSec: number;
  moves: number;
  playedAt?: any;
}

const COLLECTION_NAME = 'memory_leaderboard';

/**
 * Lấy danh sách Top 5 người chơi nhanh nhất (timeSec tăng dần)
 */
export async function getTop5(): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('timeSec', 'asc'),
      limit(5)
    );
    const snapshot = await getDocs(q);
    const list: LeaderboardEntry[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        playerName: data.playerName || 'Lữ Khách',
        timeSec: typeof data.timeSec === 'number' ? data.timeSec : 0,
        moves: typeof data.moves === 'number' ? data.moves : 0,
        playedAt: data.playedAt,
      });
    });
    return list;
  } catch (error) {
    console.error('Lỗi khi tải Top 5 Memory Game:', error);
    return [];
  }
}

/**
 * Lưu kết quả người chơi vào bảng xếp hạng
 */
export async function saveToLeaderboard(
  playerName: string,
  timeSec: number,
  moves: number
): Promise<string> {
  try {
    const cleanName = (playerName || '').trim() || 'Lữ Khách';
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      playerName: cleanName.slice(0, 30),
      timeSec,
      moves,
      playedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    throw error;
  }
}
