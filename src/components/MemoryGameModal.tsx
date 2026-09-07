import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Award, Sparkles, Timer, Target, Trophy, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import DragonCloseButton from './DragonCloseButton';
import { getTop5, saveToLeaderboard, LeaderboardEntry } from '../memoryService';

interface MemoryCard {
  uniqueId: string;
  charId: string;
  name: string;
  avatar: string;
}

interface MemoryGameModalProps {
  characters: Character[];
  isOpen: boolean;
  onClose: () => void;
}

type GameScreen = 'play' | 'won' | 'leaderboard';

export const MemoryGameModal: React.FC<MemoryGameModalProps> = ({
  characters,
  isOpen,
  onClose,
}) => {
  const [screen, setScreen] = useState<GameScreen>('play');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCharIds, setMatchedCharIds] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Leaderboard states
  const [topScores, setTopScores] = useState<LeaderboardEntry[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState<boolean>(false);
  const [isTop5, setIsTop5] = useState<boolean>(false);

  // Khung hỏi tên cũ (áp dụng UI có sẵn trong app)
  const [showNamePrompt, setShowNamePrompt] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');
  const [isSavingScore, setIsSavingScore] = useState<boolean>(false);

  // Tải danh sách Top 5 từ Firebase
  const loadLeaderboard = useCallback(async () => {
    setIsLoadingScores(true);
    try {
      const data = await getTop5();
      setTopScores(data);
    } catch (err) {
      console.error('Không thể tải BXH:', err);
    } finally {
      setIsLoadingScores(false);
    }
  }, []);

  // Khởi tạo ván chơi mới
  const initGame = useCallback(() => {
    const validChars = characters.filter((c) => !c.isComingSoon);

    if (validChars.length === 0) {
      setCards([]);
      return;
    }

    // Chọn 8 nhân vật
    const shuffledPool = [...validChars].sort(() => Math.random() - 0.5);
    const selected = shuffledPool.slice(0, Math.min(8, shuffledPool.length));

    // Nhân đôi tạo thành các cặp thẻ (8 cặp = 16 thẻ)
    const deck: MemoryCard[] = [];
    selected.forEach((char) => {
      deck.push({
        uniqueId: `${char.id}-a`,
        charId: char.id,
        name: char.name,
        avatar: char.avatar || '',
      });
      deck.push({
        uniqueId: `${char.id}-b`,
        charId: char.id,
        name: char.name,
        avatar: char.avatar || '',
      });
    });

    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    setCards(shuffledDeck);
    setFlippedIndices([]);
    setMatchedCharIds([]);
    setMoves(0);
    setTimeSec(0);
    setIsRunning(false);
    setIsProcessing(false);
    setIsTop5(false);
    setScreen('play');
  }, [characters]);

  // Khởi tạo khi mở modal
  useEffect(() => {
    if (isOpen) {
      initGame();
      loadLeaderboard();
      const savedName = localStorage.getItem('longuyen_username') || '';
      setTempName(savedName);
    }
  }, [isOpen, initGame, loadLeaderboard]);

  // Bộ đếm thời gian
  useEffect(() => {
    let timer: any = null;
    if (isRunning && screen === 'play') {
      timer = setInterval(() => {
        setTimeSec((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, screen]);

  const totalPairs = cards.length / 2;

  /**
   * Placeholder hàm xử lý khi lọt top 5
   */
  const handleTop5Win = useCallback((finalTime: number, finalMoves: number) => {
    // TODO: Gọi UI Modal hỏi tên có sẵn của bạn ở đây. Sau khi có tên thì gọi saveToLeaderboard rồi fetch lại getTop5().
    const savedName = localStorage.getItem('longuyen_username') || '';
    setTempName(savedName);
    setShowNamePrompt(true);
  }, []);

  // Kiểm tra điều kiện thắng
  useEffect(() => {
    if (totalPairs > 0 && matchedCharIds.length === totalPairs && screen === 'play') {
      // 1. Dừng thời gian
      setIsRunning(false);

      // 2. So sánh timeSec của user với thẻ hạng 5 trong topScores
      const qualifiesTop5 =
        topScores.length < 5 ||
        timeSec < (topScores[topScores.length - 1]?.timeSec ?? Infinity);

      if (qualifiesTop5) {
        // 3. Nếu lọt Top 5: đổi trạng thái và gọi placeholder
        setIsTop5(true);
        setScreen('won');
        handleTop5Win(timeSec, moves);
      } else {
        // 4. Nếu không lọt Top 5: hiện màn thắng bình thường
        setIsTop5(false);
        setScreen('won');
      }
    }
  }, [matchedCharIds, totalPairs, screen, topScores, timeSec, moves, handleTop5Win]);

  // Xử lý lưu tên từ khung hỏi tên cũ
  const handleSaveNameAndScore = async () => {
    const trimmed = tempName.trim();
    if (!trimmed) return;

    localStorage.setItem('longuyen_username', trimmed);
    window.dispatchEvent(new Event('longuyen_username_changed'));
    setShowNamePrompt(false);

    setIsSavingScore(true);
    try {
      await saveToLeaderboard(trimmed, timeSec, moves);
      await loadLeaderboard();
      setScreen('leaderboard');
    } catch (err) {
      console.error('Không thể lưu BXH:', err);
    } finally {
      setIsSavingScore(false);
    }
  };

  // Xử lý khi click vào thẻ bài
  const handleCardClick = (index: number) => {
    if (screen !== 'play') return;
    if (isProcessing) return;
    if (flippedIndices.includes(index)) return;

    const clickedCard = cards[index];
    if (matchedCharIds.includes(clickedCard.charId)) return;

    // Bắt đầu đếm giờ từ cú lật thẻ đầu tiên
    if (!isRunning) {
      setIsRunning(true);
    }

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const firstCard = cards[firstIndex];

      setFlippedIndices([firstIndex, index]);
      setMoves((prev) => prev + 1);
      setIsProcessing(true);

      if (firstCard.charId === clickedCard.charId) {
        setTimeout(() => {
          setMatchedCharIds((prev) => [...prev, firstCard.charId]);
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 350);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 800);
      }
    }
  };

  // Định dạng mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#3A4258]/45 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-modal max-w-2xl w-full rounded-2xl p-4 sm:p-6 md:p-7 relative shadow-2xl my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng Long Uyển theo concept trang */}
        <DragonCloseButton onClick={onClose} tooltip="Khép lại trò chơi" />

        {/* HEADER MODAL */}
        <div className="text-center mb-4 sm:mb-5 pr-12 sm:pr-0">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-2xl">🎴</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3A4258]">
              Lật Thẻ Long Uyển
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A8AA5] font-sans">
            Tìm các cặp nhân vật giống nhau · Chinh phục Bảng Vàng
          </p>

          {/* Thanh trạng thái: Giờ, Lượt, Cặp (Chỉ dùng icon riêng, bỏ emoji trùng lặp) + Nút BXH */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/75 border border-[#D8DEE8] px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-xs font-comfortaa">
              <div className="flex items-center gap-1.5 text-[#3A4258]">
                <Timer size={15} className="text-[#7A8AA5]" />
                <span className="font-medium">{formatTime(timeSec)}</span>
              </div>
              <span className="text-[#D8DEE8]">·</span>
              <div className="flex items-center gap-1.5 text-[#3A4258]">
                <Target size={15} className="text-[#E88BA0]" />
                <span className="font-medium">Lượt: {moves}</span>
              </div>
              <span className="text-[#D8DEE8]">·</span>
              <div className="flex items-center gap-1.5 text-[#3A4258]">
                <Sparkles size={15} className="text-[#F2D184]" />
                <span className="font-medium">
                  Cặp: {matchedCharIds.length}/{totalPairs}
                </span>
              </div>
            </div>

            {/* Nút Bảng Xếp Hạng ở góc trên */}
            <button
              onClick={() => {
                if (screen === 'leaderboard') {
                  setScreen('play');
                } else {
                  loadLeaderboard();
                  setScreen('leaderboard');
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                screen === 'leaderboard'
                  ? 'bg-[#F2D184] text-[#3A4258] border-[#E8C26E] shadow-sm'
                  : 'bg-white/80 text-[#3A4258] border-[#D8DEE8] hover:border-[#F2D184] hover:text-[#B38E32]'
              }`}
              title="Xem Bảng Xếp Hạng Top 5"
            >
              <Trophy size={14} className="text-[#F2D184]" />
              <span>{screen === 'leaderboard' ? 'Bàn Chơi' : 'Bảng Xếp Hạng'}</span>
            </button>
          </div>
        </div>

        {/* 1. MÀN HÌNH BẢNG XẾP HẠNG (LEADERBOARD) */}
        {screen === 'leaderboard' ? (
          <div className="max-w-md mx-auto py-2 animate-fadeIn">
            <div className="text-center mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A4258] flex items-center justify-center gap-2">
                <Trophy className="text-[#F2D184] w-6 h-6" />
                <span>Bảng Vàng Top 5</span>
              </h3>
              <p className="font-sans text-xs text-[#7A8AA5] mt-1">
                Những lữ khách có đôi mắt tinh tường và tốc độ nhanh nhất
              </p>
            </div>

            {isLoadingScores ? (
              <div className="py-12 text-center text-[#7A8AA5] text-xs font-comfortaa">
                Đang tải dữ liệu Bảng Xếp Hạng...
              </div>
            ) : topScores.length === 0 ? (
              <div className="py-12 text-center glass-card rounded-2xl p-6 border border-[#D8DEE8]">
                <p className="text-sm font-serif text-[#7A8AA5]">
                  Chưa có ai chinh phục, hãy là người đầu tiên!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {topScores.map((entry, idx) => {
                  const rank = idx + 1;
                  const isTop1 = rank === 1;
                  const isTop2 = rank === 2;
                  const isTop3 = rank === 3;

                  return (
                    <div
                      key={entry.id || idx}
                      className={`glass-card rounded-xl p-3 sm:p-3.5 flex items-center justify-between border transition-all ${
                        isTop1
                          ? 'border-[#F2D184] bg-gradient-to-r from-[#FFF9E5] to-white shadow-xs'
                          : isTop2
                          ? 'border-[#E88BA0]/60 bg-gradient-to-r from-[#FFF0F3] to-white shadow-xs'
                          : isTop3
                          ? 'border-[#D8DEE8] bg-white/90 shadow-xs'
                          : 'border-[#D8DEE8]/60 bg-white/60 opacity-90'
                      }`}
                    >
                      {/* Rank & Player Name */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-base">
                          {isTop1 ? (
                            <span className="text-lg">🥇</span>
                          ) : isTop2 ? (
                            <span className="text-lg">🥈</span>
                          ) : isTop3 ? (
                            <span className="text-lg">🥉</span>
                          ) : (
                            <span className="font-comfortaa text-xs font-bold text-[#7A8AA5] bg-[#E8EEF6] w-6 h-6 rounded-full flex items-center justify-center">
                              {rank}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4
                            className={`font-serif text-sm sm:text-base font-bold truncate ${
                              isTop1
                                ? 'text-[#B38E32]'
                                : isTop2
                                ? 'text-[#D66A85]'
                                : 'text-[#3A4258]'
                            }`}
                          >
                            {entry.playerName}
                          </h4>
                        </div>
                      </div>

                      {/* Stat Score */}
                      <div className="flex items-center gap-3 shrink-0 font-comfortaa text-xs sm:text-sm">
                        <div className="flex items-center gap-1 text-[#3A4258] font-bold">
                          <Timer size={13} className="text-[#7A8AA5]" />
                          <span>{formatTime(entry.timeSec)}</span>
                        </div>
                        <span className="text-[#D8DEE8]">·</span>
                        <div className="flex items-center gap-1 text-[#7A8AA5]">
                          <Target size={13} className="text-[#E88BA0]" />
                          <span>{entry.moves} lượt</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Nút quay lại bàn chơi */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setScreen('play')}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E88BA0] text-[#E88BA0] hover:bg-[#E88BA0] hover:text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
              >
                <ArrowLeft size={14} />
                <span>Quay lại bàn chơi</span>
              </button>
            </div>
          </div>
        ) : cards.length === 0 ? (
          /* Fallback nếu không có nhân vật */
          <div className="py-12 text-center text-[#7A8AA5]">
            <p className="text-sm">Chưa có nhân vật để chơi.</p>
          </div>
        ) : (
          /* 2. BÀN CHƠI 4x4 (PLAY SCREEN) */
          <div className="relative">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto">
              {cards.map((card, idx) => {
                const isFlipped =
                  flippedIndices.includes(idx) ||
                  matchedCharIds.includes(card.charId);
                const isMatched = matchedCharIds.includes(card.charId);

                return (
                  <div
                    key={card.uniqueId}
                    onClick={() => handleCardClick(idx)}
                    className="memory-card-perspective aspect-[3/4] cursor-pointer"
                  >
                    <div
                      className={`memory-card-inner relative w-full h-full rounded-xl select-none ${
                        isFlipped ? 'memory-card-flipped' : ''
                      }`}
                    >
                      {/* Mặt sau (Họa tiết Long Uyển) */}
                      <div className="memory-card-face absolute inset-0 rounded-xl bg-gradient-to-br from-[#F5E6EA] to-[#E8EEF6] border-2 border-[#F2D184]/70 shadow-xs flex flex-col items-center justify-center p-2 group hover:border-[#F2D184] transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-xl opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all">
                          🐉
                        </div>
                        <div className="text-[9px] font-serif text-[#7A8AA5] mt-1 tracking-widest uppercase opacity-70">
                          Long Uyển
                        </div>
                      </div>

                      {/* Mặt trước (Avatar & Tên nhân vật) */}
                      <div
                        className={`memory-card-face memory-card-front absolute inset-0 rounded-xl bg-white p-1.5 sm:p-2 flex flex-col items-center justify-between border-2 transition-all ${
                          isMatched
                            ? 'border-[#E88BA0] shadow-[0_0_12px_rgba(232,139,160,0.45)] ring-2 ring-[#E88BA0]/40'
                            : 'border-[#F5C8D0] shadow-sm'
                        }`}
                      >
                        <div className="w-full flex-1 rounded-lg overflow-hidden bg-[#F8F6F5] border border-[#D8DEE8]/60 flex items-center justify-center">
                          {card.avatar ? (
                            <img
                              src={card.avatar}
                              alt={card.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="text-2xl">🐉</div>
                          )}
                        </div>
                        <div className="w-full text-center mt-1">
                          <p className="font-sans text-[10px] sm:text-xs font-bold text-[#3A4258] truncate px-0.5">
                            {card.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. MÀN HÌNH CHÚC MỪNG CHIẾN THẮNG (WON SCREEN) */}
            {screen === 'won' && (
              <div className="absolute inset-0 bg-[#F8F6F5]/94 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn z-20">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 text-3xl ${
                    isTop5
                      ? 'bg-[#F2D184]/25 border-2 border-[#F2D184]'
                      : 'bg-[#E88BA0]/15'
                  }`}
                >
                  {isTop5 ? (
                    <Trophy className="w-9 h-9 text-[#B38E32]" />
                  ) : (
                    <Award className="w-9 h-9 text-[#E88BA0]" />
                  )}
                </div>

                <h3
                  className={`font-serif text-2xl sm:text-3xl font-black mb-1 ${
                    isTop5 ? 'text-[#B38E32]' : 'text-[#3A4258]'
                  }`}
                >
                  {isTop5 ? '🎉 CHÚC MỪNG BẠN LỌT TOP 5!' : '🎉 Hoàn thành!'}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A6B85] font-sans max-w-xs mb-5 leading-relaxed">
                  {isTop5 ? (
                    <>
                      Kỷ lục tuyệt vời! Bạn hoàn thành trong{' '}
                      <strong className="text-[#3A4258] font-comfortaa">
                        {formatTime(timeSec)}
                      </strong>{' '}
                      với{' '}
                      <strong className="text-[#3A4258] font-comfortaa">{moves}</strong> lượt.
                    </>
                  ) : (
                    <>
                      Bạn tìm hết <strong className="text-[#E88BA0]">{totalPairs}</strong> cặp thẻ
                      trong{' '}
                      <strong className="text-[#3A4258] font-comfortaa">
                        {formatTime(timeSec)}
                      </strong>{' '}
                      -{' '}
                      <strong className="text-[#3A4258] font-comfortaa">{moves}</strong> lượt.
                    </>
                  )}
                </p>

                {isTop5 && (
                  <button
                    onClick={() => setShowNamePrompt(true)}
                    className="mb-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2D184] hover:bg-[#E8C26E] text-[#3A4258] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Lưu tên vào Bảng Vàng</span>
                  </button>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      loadLeaderboard();
                      setScreen('leaderboard');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#F2D184] bg-[#FFF9E5] text-[#3A4258] hover:bg-[#F2D184] font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
                  >
                    <Trophy size={15} className="text-[#B38E32]" />
                    <span>Xem BXH</span>
                  </button>
                  <button
                    onClick={initGame}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E88BA0] text-[#E88BA0] hover:bg-[#E88BA0] hover:text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
                  >
                    <RotateCcw size={15} />
                    <span>Chơi lại</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#7A8AA5] text-[#7A8AA5] hover:bg-[#7A8AA5] hover:text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
                  >
                    <span>Đóng</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nút hành động phía dưới (khi đang ở màn chơi) */}
        {screen === 'play' && cards.length > 0 && (
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
            <button
              onClick={initGame}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-[#E88BA0] text-[#E88BA0] hover:bg-[#E88BA0] hover:text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <RotateCcw size={14} />
              <span>Chơi lại</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-[#7A8AA5] text-[#7A8AA5] hover:bg-[#7A8AA5] hover:text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <span>Đóng</span>
            </button>
          </div>
        )}
      </div>

      {/* KHUNG HỎI TÊN CŨ (Áp dụng theo đúng UI modal hỏi tên có sẵn trong app) */}
      <AnimatePresence>
        {showNamePrompt && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowNamePrompt(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F6F5] p-6 md:p-8 rounded-[32px] border-2 border-[#D8DEE8] shadow-2xl max-w-sm w-full relative overflow-hidden"
            >
              <DragonCloseButton
                onClick={() => setShowNamePrompt(false)}
                className="absolute top-4 right-4 z-20"
                tooltip="Khép lại"
              />
              <div className="text-center mb-6">
                <Sparkles className="w-10 h-10 mx-auto mb-3 text-[#F2D184]" />
                <h2 className="font-serif text-xl font-bold text-[#3A4258] mb-2">
                  🎉 Vinh danh Bảng Vàng
                </h2>
                <p className="text-[#6B7590] text-xs font-comfortaa">
                  Bạn đã lọt Top 5 ({formatTime(timeSec)} - {moves} lượt). Nhập danh tính để lưu danh!
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Nhập tên vào đây..."
                  className="w-full bg-white border-2 border-[#D8DEE8] rounded-2xl px-4 py-3 text-sm text-[#3A4258] placeholder:text-[#9AAAC5] focus:outline-none focus:border-[#7A8AA5] font-comfortaa"
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveNameAndScore();
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSaveNameAndScore}
                  disabled={isSavingScore || !tempName.trim()}
                  className="w-full bg-gradient-to-r from-[#7A8AA5] to-[#F2D184] text-[#F8F6F5] font-bold py-3 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-comfortaa cursor-pointer disabled:opacity-50"
                >
                  {isSavingScore ? 'Đang lưu vào Bảng Vàng...' : 'Lưu Danh'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
