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
  onHashtagClick?: (hashtag: string) => void;
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
  onHashtagClick,
}: CharacterCardProps) {
  // Pastel Color Maps for Hashtags
  const hashtagColors = ['#BCA136', '#E8A382', '#7A8B63', '#5D4E3C'];
  const getHashtagColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % hashtagColors.length;
    return hashtagColors[index];
  };

  const hasBirthdayToday = character.birthday && isBirthdayToday(character.birthday);
  const daysUntil = character.birthday ? getDaysUntilBirthday(character.birthday) : -1;
  const isUpcomingBirthday = !hasBirthdayToday && daysUntil >= 0 && daysUntil <= 7;
  const isHot = character.isHot;

  // Prioritized list of badges: Mùa Chín > Sắp Ra Mắt > Hot > Mẻ Mới > Sắp Chín
  const badgesList: React.ReactNode[] = [];

  if (hasBirthdayToday) {
    badgesList.push(
      <button 
        key="birthday"
        onClick={(e) => { e.stopPropagation(); onBirthdayClick?.(character); }}
        className="bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 animate-bounce cursor-pointer hover:scale-110 transition-transform shrink-0"
      >
        <Gift size={12} />
        <span>Mùa Chín</span>
      </button>
    );
  }

  if (character.isComingSoon) {
    badgesList.push(
      <div 
        key="coming_soon" 
        className="badge-breath-animate bg-gradient-to-r from-[#D4C5E8] to-[#B8D8D8] text-[#3D2258] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
      >
        <span>🌱</span> Sắp Ra Mắt
      </div>
    );
  }

  if (isHot) {
    badgesList.push(
      <div 
        key="hot" 
        className="badge-breath-animate bg-gradient-to-r from-[#FFE873] via-[#FFD3B6] to-[#FFB380] text-[#5D4E3C] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
      >
        HOT 🔥
      </div>
    );
  }

  const isKyCuu = character.statusType === 'Kỳ Cựu' || character.statusTag === 'Kỳ Cựu';
  if (isKyCuu) {
    badgesList.push(
      <div 
        key="ky_cuu" 
        className="badge-breath-animate bg-gradient-to-r from-[#FAE9C5] to-[#FFD3B6] text-[#5D4E3C] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
      >
        KỲ CỰU 👑
      </div>
    );
  }

  const isNew = character.isNew || character.statusType === 'Mới' || character.statusTag === 'Mẻ Mới';
  if (isNew) {
    badgesList.push(
      <div 
        key="new" 
        className="badge-breath-animate bg-gradient-to-r from-[#C8E6C9] to-[#FFF9C4] text-[#2E4F24] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
      >
        MẺ MỚI ✨
      </div>
    );
  }

  if (isUpcomingBirthday) {
    badgesList.push(
      <div 
        key="upcoming" 
        className="bg-white/90 backdrop-blur-sm text-[#5D4E3C] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 border border-[#FFE873] shrink-0"
      >
        <span className="text-[#E8A382]">Sắp chín ({daysUntil} ngày)</span>
      </div>
    );
  }

  // Maximum of 2 badges visible at a time
  const visibleBadges = badgesList.slice(0, 2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      id={`character-card-${character.id}`}
      className={`glass-card glass-card-hover rounded-[24px] overflow-hidden p-5 flex flex-col justify-between ${hasBirthdayToday ? 'ring-2 ring-[#FFE873] shadow-[0_0_15px_rgba(255,232,115,0.4)]' : ''} ${isHot ? 'hot-card-border' : ''} ${character.isComingSoon ? 'coming-soon-card-border' : ''}`}
    >
      <div>
        {/* Character Avatar Container with badge */}
        <div className="relative overflow-hidden rounded-[32px] border-2 border-[#FFE873] shadow-md mb-4 aspect-square group bg-[#FFFDF2]">
          <motion.img
            src={character.avatar}
            alt={character.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%] z-10">
            {visibleBadges}
          </div>
          
          {/* Fast Heart display */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
            <div className="flex items-center gap-1 bg-[#FFFDF2]/95 backdrop-blur-sm py-1 px-2.5 rounded-full text-[10px] font-bold text-[#E8A382] shadow-sm">
              <Heart size={10} className="fill-current text-[#E8A382]" />
              {character.likes}
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-2">
          <h3 className="font-serif text-xl font-extrabold text-[#5D4E3C] leading-tight flex items-center gap-1.5">
            {character.name}
          </h3>
          {character.isComingSoon && (
            <p className="text-[11px] text-[#A08B73]/90 font-bold italic flex items-center gap-1 mt-1 font-comfortaa">
              Đang ươm mầm, sớm ra mắt 🌱 {character.releaseDate ? `(${character.releaseDate})` : ''}
            </p>
          )}
          <p className="text-xs text-[#5D4E3C]/70 font-medium mt-1 min-h-[32px] line-clamp-2">
            {character.title}
          </p>
        </div>

        {/* Tag Line (Genre + Mood) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {character.worldCategory?.map((genre, idx) => (
            <span
              key={`genre-${idx}`}
              className="inline-flex items-center text-[10px] font-bold text-[#4A5A35] bg-[#C8E6C9] px-2.5 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
          {character.moodCategory?.map((mood, idx) => (
            <span
              key={`mood-${idx}`}
              className="inline-flex items-center text-[10px] font-bold text-[#B25329] bg-[#FFD3B6] px-2.5 py-1 rounded-full"
            >
              {mood}
            </span>
          ))}
        </div>
      </div>

      {/* Actions & Tags */}
      <div>
        {/* Hàng nút hành động (Flexbox) - HÀNG 1 */}
        <div className="flex items-center gap-2 mb-2">
          {/* Nút "Thưởng Vị" / Disabled Tooltip for Sắp Ra Mắt */}
          {character.isComingSoon ? (
            <div className="relative flex-1 group">
              <button
                disabled
                className="w-full text-center font-bold text-xs text-[#5D4E3C]/40 bg-[#FFE873]/20 py-3 px-3 rounded-[15px] cursor-not-allowed border border-dashed border-[#5D4E3C]/20 transition-all"
              >
                Thưởng Vị
              </button>
              {/* Custom Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2.5 hidden group-hover:block w-52 bg-[#5D4E3C] text-[#FFFDF2] text-[10px] font-bold py-2 px-3 rounded-xl shadow-xl text-center z-50 pointer-events-none transition-all border border-[#FAE9C5]/20">
                Nhân vật này đang được ươm mầm, sớm ra mắt nhé 🍋
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#5D4E3C]" />
              </div>
            </div>
          ) : (
            <button
              id={`btn-thuong-vi-${character.id}`}
              onClick={() => onThuongVi(character)}
              className="flex-1 text-center font-bold text-xs text-[#5D4E3C] bg-[#FFF176] hover:bg-[#FFF59D] py-3 px-3 rounded-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Thưởng Vị
            </button>
          )}

          {/* Nút "Background" (Nền trơn mượt, Không ombre) */}
          <button
            id={`btn-background-${character.id}`}
            onClick={() => onBackground(character)}
            className="flex-1 text-center font-bold text-xs text-[#5D4E3C] bg-[#FAE9C5] hover:bg-[#F7D070]/30 py-3 px-3 rounded-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            title="Bối cảnh cốt truyện"
          >
            <span className="inline">Cốt truyện</span>
          </button>

          {/* Nút Icon Link (lấy link / disabled for Sắp Ra Mắt) */}
          {character.isComingSoon ? (
            <button
              disabled
              className="p-3 bg-[#FAE9C5]/30 text-[#5D4E3C]/30 rounded-[15px] cursor-not-allowed"
              title="Nhân vật sắp ra mắt chưa có link truyền tin nhé! 🛸"
            >
              <Copy size={14} />
            </button>
          ) : (
            <button
              id={`btn-copy-${character.id}`}
              onClick={() => onCopyLink(character)}
              className="p-3 bg-[#FAE9C5] hover:bg-[#F7D070]/30 text-[#5D4E3C] rounded-[15px] transition-all duration-300 cursor-pointer active:scale-95"
              title="Sao chép liên kết"
            >
              <Copy size={14} />
            </button>
          )}
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
        <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 pt-3 border-t border-[#F5EAD2]/80 text-[11px] font-bold">
          {character.hashtags?.map((tag, idx) => {
            const displayTag = tag.startsWith('#') ? tag : `#${tag}`;
            return (
              <button
                key={`tag-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onHashtagClick?.(displayTag);
                }}
                style={{ color: getHashtagColor(displayTag) }}
                className="hover:underline hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-left"
              >
                {displayTag}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
