/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Flame, Eye } from 'lucide-react';
import { Character } from '../types';
import { TAM_MENH_CARDS, TamMenhCard } from '../tamMenhCards';
import { getDrawState, recordDraw, TamMenhDrawState } from '../tamMenhService';
import DragonCloseButton from './DragonCloseButton';

interface TamMenhGameProps {
  characters: Character[];
  onShowBackstory?: (character: Character) => void;
  isModal?: boolean;
  onClose?: () => void;
}

/**
 * Thuật toán xáo trộn ngẫu nhiên chuẩn Fisher-Yates (Knuth Shuffle)
 * Đảm bảo mọi hoán vị đều có xác suất xuất hiện đồng đều O(n)
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Xáo trộn bộ bài bằng Fisher-Yates và đảm bảo vị trí chỉ định không bị trùng với chủ đề vừa rút liên tiếp trước đó
 */
function getShuffledDeckWithoutImmediateRepeat(
  cards: TamMenhCard[],
  slotIndex?: number | null,
  excludeCardId?: string | null
): TamMenhCard[] {
  const deck = fisherYatesShuffle(cards);
  if (slotIndex !== undefined && slotIndex !== null && excludeCardId) {
    if (deck[slotIndex]?.id === excludeCardId) {
      // Tìm vị trí thẻ khác trong deck để hoán đổi, tránh lặp lại chủ đề liên tiếp tại slot đó
      const altIndex = deck.findIndex((c, idx) => idx !== slotIndex && c.id !== excludeCardId);
      if (altIndex !== -1) {
        const temp = deck[slotIndex];
        deck[slotIndex] = deck[altIndex];
        deck[altIndex] = temp;
      }
    }
  }
  return deck;
}

export default function TamMenhGame({
  characters,
  onShowBackstory,
  isModal,
  onClose,
}: TamMenhGameProps) {
  // Bộ 5 lá bài đang nằm trên bàn (được xáo trộn chuẩn Fisher-Yates ngay khi khởi tạo)
  const [deck, setDeck] = useState<TamMenhCard[]>(() => fisherYatesShuffle(TAM_MENH_CARDS));

  // Vị trí lá bài được chọn trên bàn (0 đến 4)
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // Ghi nhớ id lá bài rút gần nhất để ngăn chặn việc lặp lại cùng một chủ đề liên tiếp
  const [lastDrawnCardId, setLastDrawnCardId] = useState<string | null>(null);

  // Nhân vật được gợi ý cho lá thẻ vừa lật
  const [suggestedChar, setSuggestedChar] = useState<Character | null>(null);

  // Trạng thái chuỗi streak & tổng lượt rút (Firebase Firestore + local)
  const [drawState, setDrawState] = useState<TamMenhDrawState>({
    userId: '',
    totalDraws: 0,
    streak: 0,
    lastDrawDate: null,
    lastStreakDate: null,
    lastCardId: null,
    lastCharId: null,
  });

  // Modal hiển thị danh sách tất cả các lá thẻ
  const [showAllModal, setShowAllModal] = useState(false);

  // Đang trong hiệu ứng lật thẻ
  const [isFlipping, setIsFlipping] = useState(false);

  // Tải trạng thái chuỗi streak khi mở trang
  useEffect(() => {
    let mounted = true;
    getDrawState().then((state) => {
      if (mounted) {
        setDrawState(state);
        if (state.lastCardId) {
          setLastDrawnCardId(state.lastCardId);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Hàm chọn nhân vật tương hợp với lá thẻ
  const pickCharacterForCard = useCallback(
    (card: TamMenhCard): Character | null => {
      if (!characters || characters.length === 0) return null;
      const available = characters.filter((c) => !c.isComingSoon);
      if (available.length === 0) return characters[0];

      // Lọc theo vị/thể loại (taste hoặc moodCategory giao matchTaste)
      const matched = available.filter((c) => {
        const tasteMatch =
          c.taste && card.matchTaste.some((t) => c.taste.toLowerCase().includes(t.toLowerCase()));
        const moodMatch =
          Array.isArray(c.moodCategory) &&
          c.moodCategory.some((m) =>
            card.matchTaste.some((t) => m.toLowerCase().includes(t.toLowerCase()))
          );
        return tasteMatch || moodMatch;
      });

      if (matched.length > 0) {
        const randomIndex = Math.floor(Math.random() * matched.length);
        return matched[randomIndex];
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      return available[randomIndex];
    },
    [characters]
  );

  // Xử lý khi người chơi bấm chọn rút 1 lá thẻ ở vị trí slotIndex
  const handleCardClick = async (slotIndex: number) => {
    if (isFlipping) return;
    if (selectedSlotIndex === slotIndex) return; // Đã lật lá này rồi

    // Áp dụng xáo trộn Fisher-Yates khi rút thẻ:
    // Đảm bảo lá bài tại vị trí được chọn không trùng với chủ đề tâm mệnh vừa rút liên tiếp trước đó
    let currentDeck = [...deck];
    if (lastDrawnCardId && currentDeck[slotIndex]?.id === lastDrawnCardId) {
      currentDeck = getShuffledDeckWithoutImmediateRepeat(TAM_MENH_CARDS, slotIndex, lastDrawnCardId);
      setDeck(currentDeck);
    }

    const card = currentDeck[slotIndex];
    if (!card) return;

    setIsFlipping(true);
    setSelectedSlotIndex(slotIndex);
    setLastDrawnCardId(card.id);

    // Tìm nhân vật tương hợp
    const char = pickCharacterForCard(card);
    setSuggestedChar(char);

    // Ghi nhận rút thẻ lên Firebase & cập nhật streak
    try {
      const updated = await recordDraw(card.id, char?.id);
      setDrawState(updated);
    } catch (err) {
      console.warn('Lỗi ghi nhận rút thẻ tâm mệnh:', err);
    } finally {
      setTimeout(() => {
        setIsFlipping(false);
      }, 700);
    }
  };

  // Reset để rút lại: úp bài xuống và xáo trộn lại vị trí các chủ đề bằng Fisher-Yates
  const handleResetDraw = () => {
    const prevSlot = selectedSlotIndex;
    const prevCardId = lastDrawnCardId;

    // Đóng lật bài
    setSelectedSlotIndex(null);
    setSuggestedChar(null);

    // Xáo trộn Fisher-Yates lại toàn bộ bộ bài, đảm bảo nếu người dùng bấm lại vào cùng ô đó thì không bị trùng chủ đề cũ
    setTimeout(() => {
      const newDeck = getShuffledDeckWithoutImmediateRepeat(TAM_MENH_CARDS, prevSlot, prevCardId);
      setDeck(newDeck);
    }, 250);
  };

  // Lá bài hiện đang được lật mở
  const currentCard = useMemo(() => {
    if (selectedSlotIndex === null) return null;
    return deck[selectedSlotIndex] || null;
  }, [selectedSlotIndex, deck]);

  return (
    <section
      id="tam-menh-long-uyen-game"
      className={`relative bg-[#F8F6F5] shadow-md border border-[#D8DEE8] rounded-[28px] p-4 sm:p-6 md:p-8 overflow-hidden ${
        isModal ? 'mb-0 shadow-2xl' : 'mb-8'
      }`}
    >
      {/* Nút đóng Long Uyển nếu mở trong dạng Modal */}
      {isModal && onClose && (
        <div className="absolute top-4 right-4 z-30">
          <DragonCloseButton onClick={onClose} tooltip="Khép lại Tâm Mệnh" />
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-6">
        {/* Badge trải nghiệm đặc biệt (Màu chuẩn của phiên bản cũ) */}
        <div className="inline-flex items-center gap-1.5 bg-[#D8DEE8]/60 px-3.5 py-1 rounded-full text-[11px] font-bold text-[#5A6B85] mb-2.5">
          <span>TRẢI NGHIỆM ĐẶC BIỆT</span>
        </div>

        {/* Tên game (Phóng to trên điện thoại, to hơn hẳn so với badge và dòng phụ) */}
        <h3 className="font-serif text-2xl xs:text-[1.7rem] sm:text-3xl md:text-4xl font-black text-[#3A4258] tracking-tight mb-2 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap drop-shadow-2xs">
          <span>🔮 Rút Thẻ</span>
          <span className="text-[#E88BA0]">Tâm Mệnh</span>
        </h3>

        {/* Dòng chữ tâm mệnh màu hồng: Chọn một lá bài, để Shin đọc / tâm mệnh của bạn hôm nay. */}
        <p className="text-xs sm:text-sm text-[#E88BA0] font-semibold tracking-wide mb-3.5 leading-relaxed">
          <span className="block sm:inline">Chọn một lá bài, để Shin đọc</span>{' '}
          <span className="block sm:inline">tâm mệnh của bạn hôm nay.</span>
        </p>

        {/* Streak & Total Draws Badge */}
        <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-white/90 border border-[#D8DEE8] px-3.5 py-1.5 rounded-2xl sm:rounded-full text-[11px] sm:text-xs font-semibold text-[#3A4258] shadow-2xs">
          <Flame size={15} className="text-[#E88BA0] animate-pulse shrink-0" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center text-left sm:text-center leading-tight">
            <span>
              Chuỗi <strong className="text-[#E88BA0] font-bold">{drawState.streak || 0}</strong> ngày
            </span>
            <span className="text-[#6B7590] sm:text-[#3A4258] sm:ml-1">ghé Long Uyển</span>
          </div>
          <span className="text-[#B8C4D8] self-center">•</span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center text-left sm:text-center leading-tight">
            <span>
              Tổng <strong className="text-[#3A4258] font-bold">{drawState.totalDraws || 0}</strong>
            </span>
            <span className="text-[#6B7590] sm:text-[#5A6B85] sm:ml-1">lần rút</span>
          </div>
        </div>
      </div>

      {/* 5 LÁ THẺ TÂM MỆNH (Tự thu nhỏ và xếp vừa vặn toàn bộ khung hình trên điện thoại) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Layout 5 cột chia đều, co giãn hoàn hảo không cần cuộn ngang trên màn hình điện thoại */}
        <div className="grid grid-cols-5 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 w-full justify-center">
          {deck.map((card, index) => {
            const isSelected = selectedSlotIndex === index;
            const isDimmed = selectedSlotIndex !== null && !isSelected;
            const floatClass = selectedSlotIndex === null ? `tam-menh-float-${index}` : '';

            return (
              <div
                key={`${card.id}-${index}`}
                className={`w-full h-[120px] xs:h-[145px] sm:h-[220px] md:h-[270px] tam-menh-perspective cursor-pointer transition-all duration-300 select-none ${floatClass} ${
                  isDimmed ? 'opacity-35 scale-95 pointer-events-none' : ''
                } ${isSelected ? 'scale-102 z-20' : 'hover:-translate-y-1.5'}`}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`w-full h-full relative tam-menh-card-inner rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md ${
                    isSelected ? 'tam-menh-flipped' : ''
                  }`}
                >
                  {/* =========================================================
                      MẶT SAU THẺ (KHI CHƯA LẬT)
                      Phong cách cổ phong tao nhã, tỉ lệ thu nhỏ vừa vặn mobile
                      ========================================================= */}
                  <div className="tam-menh-face tam-menh-back absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden border-1.5 sm:border-2 border-[#F2D184] bg-gradient-to-b from-[#FFFDFB] via-[#FAEDF0] to-[#F4EEF7] p-1.5 xs:p-2 sm:p-3 flex flex-col items-center justify-between">
                    {/* Viền trang trí trong */}
                    <div className="absolute inset-1 rounded-lg sm:rounded-xl border border-[#F2D184]/40 pointer-events-none" />

                    {/* Đầu thẻ */}
                    <div className="w-full flex justify-between items-center text-[#9AAAC5] text-[7px] sm:text-[10px] tracking-widest font-mono">
                      <span>✦</span>
                      <span className="hidden xs:inline">LONG UYỂN</span>
                      <span>✦</span>
                    </div>

                    {/* Biểu tượng phù chú trung tâm */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl rotate-45 border sm:border-1.5 border-[#F2D184] bg-white/80 flex items-center justify-center shadow-2xs">
                        <div className="w-5 h-5 xs:w-7 xs:h-7 sm:w-9 sm:h-9 rounded border border-[#E88BA0]/40 flex items-center justify-center -rotate-45">
                          <span className="text-xs xs:text-sm sm:text-base">🔮</span>
                        </div>
                      </div>
                    </div>

                    {/* Đáy thẻ: Chữ Tâm Mệnh màu hồng chuẩn */}
                    <div className="text-center w-full">
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold tracking-wider text-[#E88BA0] uppercase block truncate">
                        Tâm Mệnh
                      </span>
                    </div>
                  </div>

                  {/* =========================================================
                      MẶT TRƯỚC THẺ (KHI ĐÃ LẬT)
                      Hiển thị sắc thái tâm mệnh, tự co giãn chữ và chi tiết
                      ========================================================= */}
                  <div
                    className="tam-menh-face tam-menh-front absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden border-1.5 sm:border-2 border-[#F2D184] bg-white p-1.5 xs:p-2 sm:p-3 flex flex-col justify-between shadow-md"
                    style={{
                      background: `linear-gradient(170deg, #FFFFFF 0%, #FFF8FA 40%, ${card.color}15 100%)`,
                    }}
                  >
                    {/* Viền trong theo tông màu thẻ */}
                    <div
                      className="absolute inset-1 rounded-lg sm:rounded-xl border pointer-events-none"
                      style={{ borderColor: `${card.color}40` }}
                    />

                    {/* Phần trên: Biểu tượng & Tên tâm mệnh */}
                    <div className="relative z-10 text-center pt-0.5 sm:pt-1">
                      <div
                        className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-sm xs:text-base sm:text-2xl shadow-2xs mb-0.5 sm:mb-1"
                        style={{ backgroundColor: `${card.color}20` }}
                      >
                        {card.emoji}
                      </div>
                      <h4 className="font-serif text-[10px] xs:text-xs sm:text-sm md:text-base font-extrabold text-[#3A4258] truncate leading-tight">
                        {card.name}
                      </h4>
                      <div
                        className="h-0.5 w-5 sm:w-8 mx-auto my-0.5 sm:my-1 rounded-full"
                        style={{ backgroundColor: card.color }}
                      />
                    </div>

                    {/* Phần giữa: Trích dẫn (ẩn trên mobile quá nhỏ để giữ độ thông thoáng, hiện đầy đủ ở bảng chi tiết bên dưới) */}
                    <div className="relative z-10 px-0.5 text-center my-auto hidden sm:block">
                      <p className="font-serif italic text-[11px] md:text-xs text-[#3A4258] leading-relaxed line-clamp-3">
                        "{card.quote}"
                      </p>
                    </div>

                    {/* Phần dưới: Nhân vật tương hợp */}
                    <div className="relative z-10 pt-1 border-t border-[rgba(216,222,232,0.7)] flex items-center justify-center">
                      {suggestedChar ? (
                        <div className="flex items-center gap-1 sm:gap-2 w-full justify-center">
                          {suggestedChar.avatar ? (
                            <img
                              src={suggestedChar.avatar}
                              alt={suggestedChar.name}
                              className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 border border-white shadow-2xs"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/80 text-[10px] border border-white shadow-2xs shrink-0">
                              🐉
                            </div>
                          )}
                          <div className="hidden sm:block flex-1 min-w-0 text-left">
                            <p className="text-[11px] font-bold text-[#3A4258] truncate">
                              {suggestedChar.name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[8px] sm:text-[10px] text-[#7A8AA5] italic">✦</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* THÔNG TIN CHI TIẾT LÁ THẺ VỪA RÚT (HIỂN THỊ TRANG TRỌNG KHI ĐÃ CHỌN) */}
        <AnimatePresence>
          {currentCard && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-5 bg-white rounded-2xl border border-[#D8DEE8] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl p-2 sm:p-2.5 rounded-2xl bg-[#F8F6F5] border border-[#F2D184]/50 shadow-xs shrink-0">
                  {currentCard.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                    <h4 className="font-serif text-base sm:text-lg font-extrabold text-[#3A4258]">
                      Tâm Mệnh: <span className="text-[#E88BA0]">{currentCard.name}</span>
                    </h4>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs"
                      style={{ backgroundColor: currentCard.color }}
                    >
                      {currentCard.matchTaste.join(' · ')}
                    </span>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-[#5A6B85] mt-1 max-w-xl leading-relaxed">
                    "{currentCard.quote}"
                  </p>
                </div>
              </div>

              {/* Thẻ gợi ý nhân vật mở rộng & Nút ghé thăm */}
              {suggestedChar && (
                <div className="flex items-center gap-2.5 sm:gap-3 bg-[#F8F6F5] px-3.5 py-2 rounded-xl border border-[#D8DEE8] shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-2.5">
                    {suggestedChar.avatar ? (
                      <img
                        src={suggestedChar.avatar}
                        alt={suggestedChar.name}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#E8EAEF] text-base border-2 border-white shadow-xs shrink-0">
                        🐉
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#3A4258] truncate">{suggestedChar.name}</p>
                      <p className="text-[10px] text-[#7A8AA5] truncate">{suggestedChar.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-1">
                    {onShowBackstory && (
                      <button
                        onClick={() => onShowBackstory(suggestedChar)}
                        className="p-1.5 rounded-lg bg-white text-[#5A6B85] hover:text-[#3A4258] border border-[#D8DEE8] shadow-2xs transition-colors cursor-pointer"
                        title="Xem bối cảnh nhân vật"
                      >
                        <Eye size={13} />
                      </button>
                    )}
                    {suggestedChar.roleplayLink && (
                      <a
                        href={suggestedChar.roleplayLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#E88BA0] to-[#D66A85] text-white px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1 shadow-2xs shrink-0"
                      >
                        <span>Ghé thăm</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CÁC NÚT ĐIỀU KHIỂN: BỎ HOÀN TOÀN ICON THEO YÊU CẦU */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
          {/* Nút rút thẻ khác (Không chứa icon) */}
          <button
            onClick={handleResetDraw}
            className="px-5 py-2 rounded-full text-xs font-bold bg-[#3A4258] text-white hover:bg-[#2F3648] active:scale-97 transition-all shadow-sm cursor-pointer"
          >
            Rút thẻ khác
          </button>

          {/* Nút xem tất cả tâm mệnh (Không chứa icon) */}
          <button
            onClick={() => setShowAllModal(true)}
            className="px-5 py-2 rounded-full text-xs font-bold bg-white text-[#5A6B85] hover:text-[#3A4258] hover:bg-[#FAF8F5] border border-[#D8DEE8] active:scale-97 transition-all shadow-2xs cursor-pointer"
          >
            Xem tất cả tâm mệnh
          </button>
        </div>
      </div>

      {/* =========================================================
          MODAL XEM TẤT CẢ 5 LÁ TÂM MỆNH CỦA LONG UYỂN
          ========================================================= */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop làm mờ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllModal(false)}
              className="absolute inset-0 bg-[#3A4258]/45 backdrop-blur-xs"
            />

            {/* Nội dung Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-2xl bg-[#F8F6F5] rounded-3xl border border-[#D8DEE8] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Nút đóng */}
              <button
                onClick={() => setShowAllModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#7A8AA5] hover:text-[#3A4258] border border-[#D8DEE8] transition-all cursor-pointer shadow-xs"
              >
                <X size={16} />
              </button>

              {/* Tiêu đề Modal */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 bg-[#D8DEE8]/60 px-3 py-0.5 rounded-full text-[10px] font-bold text-[#5A6B85] mb-2">
                  <span>✦ BÁCH KHOA TÂM MỆNH ✦</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#3A4258]">
                  5 Lá Thẻ Tâm Mệnh Long Uyển
                </h3>
                <p className="text-xs text-[#E88BA0] font-semibold mt-1">
                  Mỗi lá thẻ mang một sắc thái tâm tình và lời gửi gắm riêng từ Long Uyển.
                </p>
              </div>

              {/* Danh sách 5 lá thẻ */}
              <div className="space-y-3">
                {TAM_MENH_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl p-4 border border-[#D8DEE8] hover:border-[#F2D184] transition-all flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-2xs"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs border border-white"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      {card.emoji}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h5 className="font-serif text-sm font-extrabold text-[#3A4258]">
                          {card.name}
                        </h5>
                        <div className="flex gap-1 flex-wrap">
                          {card.matchTaste.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-2xs"
                              style={{ backgroundColor: card.color }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="font-serif italic text-xs text-[#5A6B85] leading-relaxed">
                        "{card.quote}"
                      </p>
                      {card.description && (
                        <p className="text-[11px] text-[#7A8AA5] mt-1">
                          {card.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chân Modal: Nút đóng gọn gàng không icon */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAllModal(false)}
                  className="px-6 py-2 rounded-full text-xs font-bold bg-[#3A4258] text-white hover:bg-[#2F3648] transition-all cursor-pointer shadow-sm"
                >
                  Đã hiểu, quay lại rút thẻ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
