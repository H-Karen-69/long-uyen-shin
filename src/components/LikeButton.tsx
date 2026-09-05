/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { useCharacterLikes } from '../hooks/useCharacterLikes';

export interface LikeButtonProps {
  charId: string;
  initialLikes?: number;
  variant?: 'pill' | 'card-badge' | 'action-btn' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onLikeChange?: (totalLikes: number, isLiked: boolean) => void;
  onToast?: (msg: string, type: 'heart-on' | 'heart-off') => void;
  showCount?: boolean;
}

export default function LikeButton({
  charId,
  initialLikes = 0,
  variant = 'pill',
  size = 'md',
  className = '',
  onLikeChange,
  onToast,
  showCount = true,
}: LikeButtonProps) {
  const { totalLikes, isLiked, isPending, toggleLike } = useCharacterLikes(charId, initialLikes);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPending) return;

    // Trigger toast notification (chữ nhảy lên)
    if (!isLiked) {
      onToast?.('Ngọc này đã thuộc về bạn!', 'heart-on');
      const newParticles = [
        { id: Date.now() + 1, x: (Math.random() - 0.5) * 24, y: -20 - Math.random() * 15 },
        { id: Date.now() + 2, x: (Math.random() - 0.5) * 32, y: -28 - Math.random() * 20 },
        { id: Date.now() + 3, x: (Math.random() - 0.5) * 20, y: -24 - Math.random() * 15 },
      ];
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 800);
    } else {
      onToast?.('Đã bỏ ngọc khỏi tay!', 'heart-off');
    }

    await toggleLike();
    onLikeChange?.(!isLiked ? totalLikes + 1 : Math.max(0, totalLikes - 1), !isLiked);
  };

  // Kích thước icon và font chữ
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  const countFontSize = size === 'sm' ? 'text-[11px]' : size === 'lg' ? 'text-sm' : 'text-xs';

  // Biến thể hiển thị
  let variantStyles = '';
  if (variant === 'card-badge') {
    // Huy hiệu gắn trên góc trên Avatar Card
    variantStyles = `
      py-1.5 px-3 rounded-full backdrop-blur-md shadow-sm border transition-all duration-300
      bg-[#F8F6F5]/95 border-[#D8DEE8] text-[#7A8AA5] hover:border-[#FDF3D2]
    `;
  } else if (variant === 'action-btn') {
    // Nút chức năng trong hàng Action ở thân Card
    variantStyles = `
      p-3 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[15px] shadow-sm active:scale-95
      bg-gradient-to-r from-[#F8F6F5] to-[#D8DEE8] hover:from-[#D8DEE8] hover:to-[#F8F6F5] text-[#3A4258]
    `;
  } else if (variant === 'compact') {
    // Dạng rút gọn không nền
    variantStyles = `
      p-1.5 rounded-full transition-all duration-200
      ${isLiked ? 'text-[#EF4444]' : 'text-[#7A8AA5] hover:text-[#EF4444]'}
    `;
  } else {
    // Dạng pill mặc định
    variantStyles = `
      px-3 py-1.5 rounded-full border shadow-sm transition-all duration-300 flex items-center gap-1.5 min-h-[36px]
      bg-[#F8F6F5] border-[#D8DEE8] text-[#6B7590] hover:bg-[#F8E0E4]/40 hover:border-[#FDF3D2]
    `;
  }

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        type="button"
        data-char-id={charId}
        aria-label={isLiked ? 'Bỏ thích nhân vật' : 'Thả tim nhân vật'}
        title={isLiked ? 'Đã thả tim (Bấm để bỏ thích)' : 'Thả tim nhân vật'}
        onClick={handleClick}
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className={`like-btn relative flex items-center justify-center gap-1.5 font-sans font-semibold cursor-pointer select-none ${variantStyles} ${className}`}
      >
        {/* Heart Icon with bouncy animation & vivid red fill */}
        <motion.span
          key={isLiked ? 'liked' : 'unliked'}
          initial={{ scale: 0.8 }}
          animate={{ scale: isLiked ? [1, 1.35, 1] : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="heart-icon inline-flex items-center justify-center"
        >
          <Heart
            size={iconSize}
            className={`transition-all duration-300 ${
              isLiked
                ? 'fill-[#EF4444] text-[#EF4444] scale-110 drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]'
                : variant === 'action-btn'
                ? 'text-[#8B3A50] fill-transparent'
                : 'fill-transparent text-[#7A8AA5]'
            }`}
          />
        </motion.span>

        {/* Total Likes count */}
        {showCount && (
          <span
            className={`like-count font-comfortaa font-bold ${countFontSize} transition-colors duration-200 ${
              isLiked ? 'text-[#EF4444]' : totalLikes > 0 ? 'text-[#5A6B85]' : 'text-[#7A8AA5]'
            }`}
          >
            {totalLikes}
          </span>
        )}
      </motion.button>

      {/* Floating Sparkle Heart Particles on Like */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: p.x, y: p.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EF4444] z-30"
          >
            <Heart size={10} className="fill-[#EF4444]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
