/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Copy, MessageSquareHeart, Sparkles, Gift } from 'lucide-react';
import { Character } from '../types';
import { isBirthdayToday, getDaysUntilBirthday } from '../lib/dateUtils';
import LikeButton from './LikeButton';

interface CharacterCardProps {
  character: Character;
  isLiked?: boolean;
  onThuongVi: (char: Character) => void;
  onBackground: (char: Character) => void;
  onCopyLink: (char: Character) => void;
  onLikeToggle?: (char: Character) => void;
  onFeedback: (char: Character) => void;
  onBirthdayClick?: (char: Character) => void;
  onHashtagClick?: (hashtag: string) => void;
  onToast?: (msg: string, type: 'heart-on' | 'heart-off') => void;
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
  onToast,
}: CharacterCardProps) {
  // Pastel Color Maps for Hashtags
  const hashtagColors = ['#5A6B85', '#B85068', '#4A5468', '#8B3A50'];
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

  // Prioritized list of badges: Long Đản > Sắp Ra Mắt > Hot > Tân Long > Sắp Chín
  const badgesList: React.ReactNode[] = [];

  if (hasBirthdayToday) {
    badgesList.push(
      <button 
        key="birthday"
        onClick={(e) => { e.stopPropagation(); onBirthdayClick?.(character); }}
        className="bg-gradient-to-r from-[#F5C8D0] to-[#E88BA0] text-[#3A4258] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 animate-bounce cursor-pointer hover:scale-110 transition-transform shrink-0"
      >
        <Gift size={12} />
        <span>Long Đản</span>
      </button>
    );
  }

  if (character.isComingSoon) {
    badgesList.push(
      <div 
        key="coming_soon" 
        className="badge-breath-animate bg-gradient-to-r from-[#9AAAC5] to-[#F5C8D0] text-[#3A4258] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
      >
        <span>🌱</span> Sắp Ra Mắt
      </div>
    );
  }

  if (isHot) {
    badgesList.push(
      <div 
        key="hot" 
        className="badge-breath-animate bg-gradient-to-r from-[#D66A85] to-[#E88BA0] text-[#F8F6F5] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
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
        className="badge-breath-animate bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] text-[#F8F6F5] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
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
        className="badge-breath-animate bg-gradient-to-r from-[#7A8AA5] to-[#B8C4D8] text-[#F8F6F5] py-1 px-2.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 shrink-0"
      >
        TÂN LONG ✨
      </div>
    );
  }

  if (isUpcomingBirthday) {
    badgesList.push(
      <div 
        key="upcoming" 
        className="bg-[#F8F6F5]/90 backdrop-blur-sm text-[#3A4258] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 border border-[#D8DEE8] shrink-0"
      >
        <span className="text-[#6B7590]">Sắp chín ({daysUntil} ngày)</span>
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
      className={`glass-card glass-card-hover rounded-[24px] overflow-hidden p-5 flex flex-col justify-between ${hasBirthdayToday ? 'ring-2 ring-[#7A8AA5] shadow-[0_0_15px_rgba(122,138,165,0.4)]' : ''} ${isHot ? 'hot-card-border' : ''} ${character.isComingSoon ? 'coming-soon-card-border' : ''}`}
    >
      <div>
        {/* Character Avatar Container with badge */}
        <div className="relative overflow-hidden rounded-[32px] border-2 border-[#D8DEE8] shadow-md mb-4 aspect-square group bg-[#F8F6F5]">
          {character.avatar ? (
            <motion.img
              src={character.avatar}
              alt={character.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#E8EAEF] via-[#F5C8D0]/30 to-[#D8DEE8] text-[#7A8AA5] p-4 text-center select-none">
              <span className="text-3xl mb-1 filter drop-shadow-sm animate-pulse">🐉</span>
              <Sparkles size={22} className="text-[#E88BA0] animate-bounce mb-1" />
              <span className="font-comfortaa font-bold text-xs text-[#3A4258]">Chưa có ảnh</span>
              <span className="text-[10px] text-[#6B7590] mt-0.5 font-sans">Sẽ sớm cập nhật ảnh rồng</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%] z-10">
            {visibleBadges}
          </div>
          
          {/* Fast Heart & Like display */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
            <LikeButton
              charId={character.id}
              initialLikes={character.likes}
              variant="card-badge"
              size="sm"
              onToast={onToast}
            />
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-2">
          <h3 className="font-serif text-xl font-extrabold text-[#3A4258] leading-tight flex items-center gap-1.5">
            {character.name}
          </h3>

          <p className="text-xs text-[#6B7590] font-medium mt-1 min-h-[32px] line-clamp-2">
            {character.title}
          </p>
        </div>

        {/* Tag Line (Genre + Mood) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {character.worldCategory?.map((genre, idx) => (
            <span
              key={`genre-${idx}`}
              className="inline-flex items-center text-[10px] font-bold text-[#3A4258] bg-[#D8DEE8] px-2.5 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
          {character.moodCategory?.map((mood, idx) => (
            <span
              key={`mood-${idx}`}
              className="inline-flex items-center text-[10px] font-bold text-[#8B3A50] bg-[#F8E0E4] px-2.5 py-1 rounded-full"
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
                className="w-full text-center font-bold text-xs text-[#3A4258]/40 bg-[#D8DEE8]/30 py-3 px-3 rounded-[15px] cursor-not-allowed border border-dashed border-[#3A4258]/20 transition-all"
              >
                Triệu Long
              </button>
              {/* Custom Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2.5 hidden group-hover:block w-52 bg-[#3A4258] text-[#F8F6F5] text-[10px] font-bold py-2 px-3 rounded-xl shadow-xl text-center z-50 pointer-events-none transition-all border border-[#D8DEE8]/20">
                Vị rồng này đang ẩn mình, sớm ra mắt nhé 🐉
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#3A4258]" />
              </div>
            </div>
          ) : (
            <button
              id={`btn-thuong-vi-${character.id}`}
              onClick={() => onThuongVi(character)}
              className="flex-1 text-center font-bold text-xs text-[#F8F6F5] bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] hover:from-[#5A6B85] hover:to-[#D66A85] py-3 px-3 rounded-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Triệu Long
            </button>
          )}

          {/* Nút "Background" (Nền trơn mượt) */}
          <button
            id={`btn-background-${character.id}`}
            onClick={() => onBackground(character)}
            className="flex-1 text-center font-bold text-xs text-[#3A4258] bg-gradient-to-r from-[#D8DEE8] to-[#B8C4D8] hover:from-[#B8C4D8] hover:to-[#D8DEE8] py-3 px-3 rounded-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            title="Bối cảnh Long Ký"
          >
            <span className="inline">Long Ký</span>
          </button>

          {/* Nút Icon Link */}
          {character.isComingSoon ? (
            <button
              disabled
              className="p-3 bg-[#D8DEE8]/30 text-[#3A4258]/30 rounded-[15px] cursor-not-allowed"
              title="Vị rồng sắp ra mắt chưa có liên kết truyền tin nhé! 🛸"
            >
              <Copy size={14} />
            </button>
          ) : (
            <button
              id={`btn-copy-${character.id}`}
              onClick={() => onCopyLink(character)}
              className="p-3 bg-gradient-to-r from-[#F8F6F5] to-[#D8DEE8] hover:from-[#D8DEE8] hover:to-[#F8F6F5] text-[#3A4258] rounded-[15px] transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
              title="Nhận Ngọc"
            >
              <Copy size={14} />
            </button>
          )}
        </div>

        {/* Hàng nút hành động - HÀNG 2 */}
        <div className="flex items-center gap-2 mb-4">
          {/* Nút Feedback */}
          <button
            id={`btn-feedback-${character.id}`}
            onClick={() => onFeedback(character)}
            className="flex-1 p-3 text-xs font-bold text-[#F8F6F5] bg-gradient-to-r from-[#B8C4D8] to-[#7A8AA5] hover:from-[#7A8AA5] hover:to-[#B8C4D8] rounded-[15px] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-sm"
          >
            <MessageSquareHeart size={14} />
            <span>Feedback</span>
          </button>

          {/* Nút Icon Tim (Cất Ngọc / Thả Tim) */}
          <LikeButton
            charId={character.id}
            initialLikes={character.likes}
            variant="action-btn"
            size="md"
            showCount={false}
            onToast={onToast}
          />
        </div>

        {/* Hàng Hashtag */}
        <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 pt-3 border-t border-[#D8DEE8]/80 text-[11px] font-bold">
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
