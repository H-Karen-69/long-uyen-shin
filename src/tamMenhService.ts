import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export interface TamMenhDrawState {
  userId: string;
  totalDraws: number;
  streak: number;
  lastDrawDate: string | null;
  lastStreakDate: string | null;
  lastCardId: string | null;
  lastCharId: string | null;
  updatedAt?: any;
}

const LOCAL_STORAGE_KEY_USER_ID = 'longUyen_userId';
const LOCAL_STORAGE_KEY_STATE = 'longUyen_tamMenh_state';

/**
 * Lấy hoặc tạo mới userId lưu trong localStorage
 */
export function getUserId(): string {
  if (typeof window === 'undefined') return 'guest_default';
  
  let userId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
  if (!userId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      userId = crypto.randomUUID();
    } else {
      userId = 'user_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, userId);
  }
  return userId;
}

/**
 * Định dạng ngày YYYY-MM-DD theo giờ địa phương
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Lấy trạng thái rút thẻ hiện tại (từ Firestore, fallback về localStorage nếu lỗi)
 */
export async function getDrawState(): Promise<TamMenhDrawState> {
  const userId = getUserId();
  const defaultState: TamMenhDrawState = {
    userId,
    totalDraws: 0,
    streak: 0,
    lastDrawDate: null,
    lastStreakDate: null,
    lastCardId: null,
    lastCharId: null,
  };

  // 1. Kiểm tra cache localStorage trước
  let cachedState = defaultState;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_STATE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        cachedState = { ...defaultState, ...parsed, userId };
      }
    }
  } catch (err) {
    console.warn('Lỗi đọc local storage tâm mệnh:', err);
  }

  // 2. Thử lấy từ Firebase Firestore
  try {
    const docRef = doc(db, 'taminh_draws', userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as Partial<TamMenhDrawState>;
      const merged: TamMenhDrawState = {
        userId,
        totalDraws: typeof data.totalDraws === 'number' ? data.totalDraws : cachedState.totalDraws,
        streak: typeof data.streak === 'number' ? data.streak : cachedState.streak,
        lastDrawDate: data.lastDrawDate || cachedState.lastDrawDate,
        lastStreakDate: data.lastStreakDate || cachedState.lastStreakDate,
        lastCardId: data.lastCardId || cachedState.lastCardId,
        lastCharId: data.lastCharId || cachedState.lastCharId,
      };
      // Đồng bộ lại local
      localStorage.setItem(LOCAL_STORAGE_KEY_STATE, JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.warn('Firestore taminh_draws getDoc unavailable, fallback local:', error);
  }

  return cachedState;
}

/**
 * Ghi nhận một lần rút thẻ mới:
 * - totalDraws + 1
 * - Tính streak theo ngày:
 *    + lastStreakDate === hôm nay: giữ nguyên streak
 *    + lastStreakDate === hôm qua: streak + 1
 *    + khác / null: streak = 1
 */
export async function recordDraw(
  cardId: string,
  charId?: string
): Promise<TamMenhDrawState> {
  const userId = getUserId();
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  // Đọc state hiện tại từ cache / Firestore
  const currentState = await getDrawState();

  let newStreak = currentState.streak;
  if (currentState.lastStreakDate === today) {
    // Đã tính streak hôm nay rồi, giữ nguyên streak (tối thiểu 1 nếu đã từng rút)
    newStreak = Math.max(1, currentState.streak || 1);
  } else if (currentState.lastStreakDate === yesterday) {
    // Ghé thăm liên tiếp ngày hôm qua -> streak tăng 1
    newStreak = (currentState.streak || 0) + 1;
  } else {
    // Bị ngắt chuỗi hoặc lần đầu rút -> streak = 1
    newStreak = 1;
  }

  const newTotalDraws = (currentState.totalDraws || 0) + 1;

  const newState: TamMenhDrawState = {
    userId,
    totalDraws: newTotalDraws,
    streak: newStreak,
    lastDrawDate: today,
    lastStreakDate: today,
    lastCardId: cardId,
    lastCharId: charId || '',
  };

  // Lưu vào localStorage ngay lập tức
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_STATE, JSON.stringify(newState));
  } catch (err) {
    console.warn('Không thể lưu localStorage:', err);
  }

  // Ghi nhận lên Firestore (không block UI nếu thất bại)
  try {
    const docRef = doc(db, 'taminh_draws', userId);
    await setDoc(
      docRef,
      {
        ...newState,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Không thể đồng bộ Firestore taminh_draws (vẫn tiếp tục với local):', error);
  }

  return newState;
}
