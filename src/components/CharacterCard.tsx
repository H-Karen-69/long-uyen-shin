/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, BookOpen, Copy, MessageSquareHeart, Sparkles, Gift } from 'lucide-react';
import { Character } from '../types';
import { isBirthdayToday, getDaysUntilBirthday } from '../lib/dateUtils';

interface CharacterCardProps {
  character: Character;
  isLiked: boolean;
  onThuongVi: (char: Character) => void;
  onBackground: (char: Character) => void;
  onCopyLink: (char: Character) => void;
  onLikeToggle: (char: Character) => void;
  onFeedback: (char: Character) => void;
  onBirthdayClick?: (char: Character) => void;
}

export default function CharacterCard({
  character,
  isLiked,
  onThuongVi,
  onBackground,
  onCopyLink,
  onLikeToggle,
  onFeedback,
  onBirthdayClick,
}: CharacterCardProps) {
  // Pastel Color Maps for Hashtags
  const worldColor = '#9D9E73';      // Xanh olive pastel dịu ngọt
  const aftertasteColor = '#E8A382';  // Đào sữa
  const statusColor = '#F7D070';      // Vàng tươi từ palette

  const hasBirthdayToday = character.birthday && isBirthdayToday(character.birthday);
  const daysUntil = character.birthday ? getDaysUntilBirthday(character.birthday) : -1;
  const isUpcomingBirthday = !hasBirthdayToday && daysUntil >= 0 && daysUntil <= 7;
  const isHot = character.isHot;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      id={`character-card-${character.id}`}
      className={`glass-card glass-card-hover rounded-[24px] overflow-hidden p-5 flex flex-col justify-between ${hasBirthdayToday ? 'ring-2 ring-[#FFE873] shadow-[0_0_15px_rgba(255,232,115,0.4)]' : ''} ${isHot ? 'hot-card-border' : ''}`}
    >
      <div>
        {/* Character Avatar Container with badge */}
        <div className="relative overflow-hidden rounded-[18px] mb-4 aspect-[4/3] group bg-[#FFFDF2]">
          <motion.img
            src={character.avatar}
            alt={character.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%] z-10">
            {hasBirthdayToday && (
              <button 
                onClick={(e) => { e.stopPropagation(); onBirthdayClick?.(character); }}
                className="bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 animate-bounce cursor-pointer hover:scale-110 transition-transform"
              >
                <Gift size={12} />
                <span>Mùa Chín</span>
              </button>
            )}
            
            {isHot && (
              <div className="hot-badge-animate bg-gradient-to-r from-[#FFE873] via-[#FFD3B6] to-[#FFB380] text-[#5D4E3C] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1">
                HOT 🔥
              </div>
            )}

            {character.statusType === 'Mới' && (
              <div className="bg-gradient-to-r from-[#C7D9BA] to-[#A3C9A8] text-[#5D4E3C] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1">
                MẺ MỚI ✨
              </div>
            )}
            
            {isUpcomingBirthday && (
              <div className="bg-white/90 backdrop-blur-sm text-[#5D4E3C] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 border border-[#FFE873]">
                <span className="text-[#E8A382]">Sắp chín ({daysUntil} ngày)</span>
              </div>
            )}
          </div>

          {/* Genre Tag at bottom-left */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#5D4E3C] bg-[#FFFDF2]/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm z-10">
            <Sparkles size={10} className="text-[#F7D070] animate-pulse" />
            {character.genre}
          </span>
          
          {/* Fast Heart display */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
            <div className="flex items-center gap-1 bg-[#FFFDF2]/95 backdrop-blur-sm py-1 px-2.5 rounded-full text-[10px] font-bold text-[#E8A382] shadow-sm">
              <Heart size={10} className="fill-current text-[#E8A382]" />
              {character.likes}
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-4">
          <h3 className="font-serif text-xl font-extrabold text-[#5D4E3C] leading-tight flex items-center gap-1.5">
            {character.name}
          </h3>
          <p className="text-xs text-[#5D4E3C]/70 font-medium mt-1 min-h-[32px] line-clamp-2">
            {character.title}
          </p>
        </div>
      </div>

      {/* Actions & Tags */}
      <div>
        {/* Hàng nút hành động (Flexbox) - HÀNG 1 */}
        <div className="flex items-center gap-2 mb-2">
          {/* Nút "Thưởng Vị" (To nhất, Nền vàng tươi không ombre) */}
          <button
            id={`btn-thuong-vi-${character.id}`}
            onClick={() => onThuongVi(character)}
            className="flex-1 text-center font-bold text-xs text-[#5D4E3C] bg-[#FFF176] hover:bg-[#FFF59D] py-3 px-3 rounded-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Thưởng Vị
          </button>

          {/* Nút "Background" (Nền trơn mượt, Không ombre) */}
          <button
            id={`btn-background-${character.id}`}
            onClick={() => onBackground(character)}
            className="flex-1 text-center font-bold text-xs text-[#5D4E3C] bg-[#FAE9C5] hover:bg-[#F7D070]/30 py-3 px-3 rounded-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            title="Bối cảnh cốt truyện"
          >
            <span className="inline">Cốt truyện</span>
          </button>

          {/* Nút Icon Link (lấy link) */}
          <button
            id={`btn-copy-${character.id}`}
            onClick={() => onCopyLink(character)}
            className="p-3 bg-[#FAE9C5] hover:bg-[#F7D070]/30 text-[#5D4E3C] rounded-[15px] transition-all duration-300 cursor-pointer active:scale-95"
            title="Sao chép liên kết"
          >
            <Copy size={14} />
          </button>
        </div>

        {/* Hàng nút hành động (Flexbox) - HÀNG 2 */}
        <div className="flex items-center gap-2 mb-4">
          {/* Nút Feedback */}
          <button
            id={`btn-feedback-${character.id}`}
            onClick={() => onFeedback(character)}
            className="flex-1 p-3 text-xs font-bold text-[#5D4E3C] bg-[#FAE9C5]/60 hover:bg-gradient-to-r hover:from-[#FFE873]/50 hover:to-[#FFD3B6]/50 rounded-[15px] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            <MessageSquareHeart size={14} />
            <span>Feedback</span>
          </button>

          {/* Nút Icon Tim */}
          <button
            id={`btn-heart-${character.id}`}
            onClick={() => onLikeToggle(character)}
            className="p-3 bg-[#FAE9C5]/60 hover:bg-gradient-to-r hover:from-[#FFE873]/50 hover:to-[#FFD3B6]/50 text-[#E8A382] rounded-[15px] transition-all duration-300 cursor-pointer active:scale-95"
            title={isLiked ? "Bỏ thích" : "Thả tim yêu thích"}
          >
            <Heart
              size={14}
              className={`transition-all duration-300 ${
                isLiked ? 'fill-[#EF4444] text-[#EF4444] scale-110' : 'text-[#E8A382]'
              }`}
            />
          </button>
        </div>

        {/* Hàng Hashtag (Dưới cùng card): KHÔNG NỀN, KHÔNG VIỀN, CHỈ CÓ CHỮ MÀU */}
        <div className="flex flex-wrap gap-x-2.5 gap-y-1 pt-3 border-t border-[#F5EAD2]/80 text-[11px] font-bold">
          <span style={{ color: worldColor }} className="hover:opacity-80 transition-opacity">
            #{character.genre}
          </span>
          <span style={{ color: aftertasteColor }} className="hover:opacity-80 transition-opacity">
            #{character.taste}
          </span>
          <span style={{ color: statusColor }} className="hover:opacity-80 transition-opacity">
            #{character.statusType}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
