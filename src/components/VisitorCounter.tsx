import React, { useEffect, useState, useRef } from 'react';
import { doc, setDoc, onSnapshot, increment } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Sparkles } from 'lucide-react';

interface VisitorCounterProps {
  fallbackCount?: number;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  fallbackCount = 1268,
}) => {
  const [displayCount, setDisplayCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const previousTargetRef = useRef<number | null>(null);
  const hasIncrementedRef = useRef<boolean>(false);

  // Hiệu ứng số nhảy tăng dần mượt mà (Count-up Animation)
  const animateCountUp = (startVal: number, target: number, duration: number = 1500) => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * easeProgress);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayCount(target);
        setIsLoading(false);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const statsDocRef = doc(db, 'site_stats', 'visitor_count');
    const path = 'site_stats/visitor_count';

    // 1. Tự động tăng +1 lượt truy cập vào Firestore
    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      setDoc(
        statsDocRef,
        {
          totalVisits: increment(1),
        },
        { merge: true }
      ).catch((err) => {
        console.warn('[Visitor Counter] Lỗi khi tăng lượt truy cập:', err);
      });
    }

    // 2. Lắng nghe real-time lượt truy cập từ Firestore
    const unsubscribe = onSnapshot(
      statsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const count = typeof data?.totalVisits === 'number' ? data.totalVisits : fallbackCount;
          const prev = previousTargetRef.current ?? 0;
          previousTargetRef.current = count;
          animateCountUp(prev, count);
        } else {
          // Document chưa có -> tạo ban đầu
          setDoc(statsDocRef, { totalVisits: 1 }, { merge: true }).catch(() => {});
          previousTargetRef.current = 1;
          animateCountUp(0, 1);
        }
      },
      (error) => {
        console.warn('[Visitor Counter] Lỗi lắng nghe Firestore, dùng số dự phòng:', error);
        try {
          handleFirestoreError(error, OperationType.GET, path);
        } catch (_) {
          // Fallback UI
        }
        if (displayCount === null) {
          animateCountUp(0, fallbackCount);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [fallbackCount]);

  return (
    <div className="flex justify-center items-center my-3 select-none">
      <div
        id="longUyenVisitorBadge"
        title="Lượt khách viếng thăm Long Uyển"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0EEED]/90 backdrop-blur-md border border-[#F5C8D0] rounded-full shadow-[0_4px_16px_rgba(58,66,88,0.07)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-[#E88BA0] hover:shadow-[0_8px_24px_rgba(58,66,88,0.1),0_0_14px_rgba(245,200,208,0.45)] cursor-default"
      >
        {/* Sparkle Icon with pulsating glow animation */}
        <span className="relative flex items-center justify-center w-5 h-5 text-[#E88BA0]">
          <span className="absolute w-full h-full rounded-full bg-[#F5C8D0] animate-ping opacity-75" />
          <Sparkles className="relative w-4 h-4 fill-[#E88BA0]/40 drop-shadow-[0_0_8px_rgba(232,139,160,0.8)] animate-pulse" />
        </span>

        {/* Text Content */}
        <div className="inline-flex items-baseline gap-1.5 text-xs sm:text-sm text-[#3A4258] font-sans font-medium">
          <span className="font-comfortaa font-bold text-sm sm:text-base text-[#E88BA0] tracking-wide min-w-[24px] text-center inline-block">
            {displayCount !== null ? displayCount.toLocaleString('vi-VN') : (isLoading ? '...' : fallbackCount.toLocaleString('vi-VN'))}
          </span>
          <span className="text-[#3A4258] font-semibold text-[11px] sm:text-xs">
            Lữ Khách Đã Ghé Long Uyển
          </span>
        </div>
      </div>
    </div>
  );
};
