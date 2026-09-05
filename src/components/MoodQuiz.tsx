/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Trophy, Heart } from 'lucide-react';
import { Character } from '../types';

interface MoodQuizProps {
  characters: Character[];
  onThuongVi: (character: Character) => void;
  onShowBackstory: (character: Character) => void;
}

// 5 Mood expressions for Cute Eastern Dragon SVG
interface QuizDragonProps {
  mood: 'vui' | 'buon' | 'codon' | 'binh-thuong' | 'buc';
  size?: number;
  className?: string;
}

export function QuizDragon({ mood, size = 60, className = '' }: QuizDragonProps) {
  let colorTop = '#FDF3D2';
  let colorBottom = '#F8E0E4';
  let auraColor = 'rgba(245, 200, 208, 0.45)';

  switch (mood) {
    case 'vui':
      colorTop = '#FDF3D2';
      colorBottom = '#F8E0E4';
      auraColor = 'rgba(245, 200, 208, 0.5)';
      break;
    case 'buon':
      colorTop = '#7A8AA5';
      colorBottom = '#9AAAC5';
      auraColor = 'rgba(122, 138, 165, 0.45)';
      break;
    case 'codon':
      colorTop = '#9AAAC5';
      colorBottom = '#B8C4D8';
      auraColor = 'rgba(154, 170, 197, 0.45)';
      break;
    case 'binh-thuong':
      colorTop = '#B8C4D8';
      colorBottom = '#D8DEE8';
      auraColor = 'rgba(184, 196, 216, 0.5)';
      break;
    case 'buc':
      colorTop = '#F2DB88';
      colorBottom = '#F0A8B8';
      auraColor = 'rgba(232, 139, 160, 0.5)';
      break;
  }

  const gradientId = `jade-grad-${mood}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none overflow-visible filter drop-shadow-sm`}
    >
      <defs>
        <radialGradient id={gradientId} cx="0.5" cy="0.3" r="0.7" fx="0.5" fy="0.3">
          <stop offset="0%" stopColor={colorTop} />
          <stop offset="100%" stopColor={colorBottom} />
        </radialGradient>
      </defs>

      {/* Aura */}
      <circle cx="50" cy="50" r="45" fill={auraColor} filter="blur(4px)" />
      
      {/* Ngọc (Sphere) with distinct border */}
      <circle cx="50" cy="50" r="38" fill={`url(#${gradientId})`} stroke="#3A4258" strokeWidth="1.5" strokeOpacity="0.25" />
      
      {/* Highlight */}
      <ellipse cx="36" cy="32" rx="12" ry="6" transform="rotate(-30 36 32)" fill="white" opacity="0.65" />

      {/* Mặt biểu cảm - Màu Xanh Xám Đậm #3A4258 */}
      <g stroke="#3A4258" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {mood === 'vui' && (
          <>
            <circle cx="38" cy="48" r="3" fill="#3A4258" stroke="none" />
            <circle cx="62" cy="48" r="3" fill="#3A4258" stroke="none" />
            <path d="M 42 56 Q 50 64 58 56" />
          </>
        )}
        {mood === 'buon' && (
          <>
            <circle cx="38" cy="52" r="3" fill="#3A4258" stroke="none" />
            <circle cx="62" cy="52" r="3" fill="#3A4258" stroke="none" />
            <path d="M 42 58 Q 50 52 58 58" />
          </>
        )}
        {mood === 'codon' && (
          <>
            <circle cx="38" cy="50" r="2.5" fill="#3A4258" stroke="none" />
            <circle cx="62" cy="50" r="2.5" fill="#3A4258" stroke="none" />
            <path d="M 46 58 H 54" />
          </>
        )}
        {mood === 'binh-thuong' && (
          <>
            <circle cx="38" cy="50" r="3" fill="#3A4258" stroke="none" />
            <circle cx="62" cy="50" r="3" fill="#3A4258" stroke="none" />
            <path d="M 44 58 Q 50 60 56 58" />
          </>
        )}
        {mood === 'buc' && (
          <>
            <path d="M 32 44 L 40 48" />
            <path d="M 68 44 L 60 48" />
            <circle cx="38" cy="52" r="3" fill="#3A4258" stroke="none" />
            <circle cx="62" cy="52" r="3" fill="#3A4258" stroke="none" />
            <path d="M 44 60 Q 50 56 56 60" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function MoodQuiz({ characters, onThuongVi, onShowBackstory }: MoodQuizProps) {
  const [step, setStep] = useState<'mood-select' | 'sub-select' | 'splitting' | 'result'>('mood-select');
  const [selectedMood, setSelectedMood] = useState<'vui' | 'buon' | 'codon' | 'binh-thuong' | 'buc' | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<'chua' | 'ngot' | 'non' | 'dang' | 'la' | null>(null);
  const [yesterdayMessage, setYesterdayMessage] = useState<string | null>(null);

  // Check localStorage for the last saved message on mount
  useEffect(() => {
    const saved = localStorage.getItem('longuyen_yesterday_message');
    if (saved) {
      setYesterdayMessage(saved);
    }
  }, []);

  const handleSelectMood = (mood: 'vui' | 'buon' | 'codon' | 'binh-thuong' | 'buc') => {
    setSelectedMood(mood);
    if (mood === 'binh-thuong') {
      setStep('sub-select');
    } else {
      triggerSplitting(mood, null);
    }
  };

  const handleSelectFlavor = (flavor: 'chua' | 'ngot' | 'non' | 'dang' | 'la') => {
    setSelectedFlavor(flavor);
    triggerSplitting('binh-thuong', flavor);
  };

  const triggerSplitting = (
    mood: 'vui' | 'buon' | 'codon' | 'binh-thuong' | 'buc',
    flavor: 'chua' | 'ngot' | 'non' | 'dang' | 'la' | null
  ) => {
    setStep('splitting');
    
    // Determine the message based on choice
    let messageText = '';
    if (mood === 'vui') {
      messageText = "Hôm nay tâm mệnh rực rỡ như một mảnh linh ngọc mới chiếu sáng. Cứ giữ nắng trong lòng nhé.";
    } else if (mood === 'buon') {
      messageText = "Buồn cũng không sao, ngọc rồng dẫu sương gió cũng giữ trọn hào quang. Shin ở đây với bạn.";
    } else if (mood === 'codon') {
      messageText = "Long Uyển không bao giờ vắng người. Vào chọn một câu chuyện, có Shin bầu bạn.";
    } else if (mood === 'buc') {
      messageText = "Bực dọc thì nứt một viên ngọc cho hả giận. Xong rồi mình đi tìm chuyện dịu lại nha.";
    } else if (mood === 'binh-thuong' && flavor) {
      const flavorMessages = {
        chua: "Băng thanh một chút mới đáng chinh phục. Đi thôi, Shin dẫn đường.",
        ngot: "Hôm nay chỉ toàn vị ngọt. Cứ thả mình vào nhé.",
        non: "Có những viên ngọc non cần được bảo vệ. Đi tìm nó nào.",
        dang: "Sương phủ thật đấy, nhưng đôi khi mình cần chút sương lạnh để nhớ lâu.",
        la: "Long Uyển của Shin còn nhiều góc lạ lắm, thử nhé."
      };
      messageText = flavorMessages[flavor];
    }

    // Save to localStorage
    localStorage.setItem('longuyen_yesterday_message', messageText);
    setYesterdayMessage(messageText);

    // After 2.2 seconds (cutting & splitting animations), show the result
    setTimeout(() => {
      setStep('result');
    }, 2200);
  };

  const handleReset = () => {
    setStep('mood-select');
    setSelectedMood(null);
    setSelectedFlavor(null);
  };

  // Filter recommended characters
  const getRecommended = (): Character[] => {
    if (!selectedMood) return [];

    if (selectedMood === 'binh-thuong') {
      if (selectedFlavor === 'chua') {
        return characters.filter(c => c.name === "Nhiếp Cảnh Hành");
      }
      if (selectedFlavor === 'ngot') {
        return characters.filter(c => c.name === "Yến Bắc Thần");
      }
      if (selectedFlavor === 'dang') {
        return characters.filter(c => c.name === "Trình Dĩ Phàm");
      }
      return [];
    }

    if (selectedMood === 'vui') {
      return characters.filter(c => c.name === "Trình Dĩ Phàm");
    }
    if (selectedMood === 'codon' || selectedMood === 'buon') {
      return characters.filter(c => c.name === "Yến Bắc Thần");
    }
    if (selectedMood === 'buc') {
      return characters.filter(c => c.name === "Yến Bắc Thần");
    }

    return [];
  };

  const recommendedList = getRecommended();

  return (
    <div id="mood-quiz-section" className="relative bg-[#F8F6F5] shadow-md border border-[#D8DEE8] rounded-[28px] p-6 md:p-8 overflow-hidden mb-8">
      {/* Decorative floating dragons / sparkles in background */}
      <div className="absolute top-2 right-4 text-2xl opacity-20 animate-spin" style={{ animationDuration: '12s' }}>🐉</div>
      <div className="absolute bottom-3 left-4 text-xl opacity-15 animate-bounce">🔮</div>
      <div className="absolute top-1/2 left-2 text-lg opacity-10">✨</div>

      <AnimatePresence mode="wait">
        {step === 'mood-select' && (
          <motion.div
            key="mood-select"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-1.5 bg-[#D8DEE8]/60 px-3 py-1 rounded-full text-[11px] font-bold text-[#5A6B85] mb-3">
              <Sparkles size={11} className="text-[#5A6B85]" />
              TRẢI NGHIỆM ĐẶC BIỆT
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#3A4258] mb-1.5">
              Hôm nay tâm mệnh bạn ra sao?
            </h3>
            <p className="text-xs text-[#E88BA0] font-semibold tracking-wide mb-6">
              Chọn một viên ngọc hợp mệnh, Shin sẽ chọn chuyện cho bạn.
            </p>

            {/* 5 Mood Button Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 w-full max-w-2xl mt-2">
              {[
                { type: 'vui', label: 'Vui Vẻ' },
                { type: 'codon', label: 'Cô Đơn' },
                { type: 'binh-thuong', label: 'Bình Thường' },
                { type: 'buon', label: 'Buồn Xỉu' },
                { type: 'buc', label: 'Bực Dọc' },
              ].map((m) => (
                <motion.button
                  key={m.type}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSelectMood(m.type as any)}
                  className="bg-[#F8F6F5] border-2 border-[#B8C4D8]/40 hover:border-[#7A8AA5] rounded-[22px] p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <QuizDragon mood={m.type as any} size={58} className="mb-2 group-hover:rotate-6 transition-transform" />
                  <span className="font-serif text-xs font-black text-[#3A4258]">
                    {m.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Yesterday feedback message */}
            {yesterdayMessage && (
              <div className="mt-6 border-t border-[#D8DEE8]/60 pt-4 w-full text-center">
                <span className="text-[10px] text-[#6B7590] uppercase tracking-widest font-bold">
                  Lời nhắn gần đây của bạn từ Shin
                </span>
                <p className="text-xs font-serif font-semibold italic text-[#E88BA0] mt-1 max-w-md mx-auto">
                  "{yesterdayMessage}"
                </p>
              </div>
            )}
          </motion.div>
        )}

        {step === 'sub-select' && (
          <motion.div
            key="sub-select"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#3A4258] mb-1.5">
              Vậy hôm nay bạn muốn gì?
            </h3>
            <p className="text-xs text-[#E88BA0] font-semibold tracking-wide mb-6">
              Chọn một hương vị, Shin dẫn bạn đi.
            </p>

            {/* 5 Flavor cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 w-full max-w-3xl">
              {[
                { type: 'chua', label: 'Chinh Phục Ngọc Băng', desc: 'Lạnh lùng, kiêu ngạo', icon: '❄️' },
                { type: 'ngot', label: 'Đắm Chìm Ngọc Mật', desc: 'Sủng ngọt, cưng chiều', icon: '🍯' },
                { type: 'non', label: 'Bảo Vệ Ngọc Non', desc: 'Yếu đuối, cần chở che', icon: '🌱' },
                { type: 'dang', label: 'Vướng Vào Ngọc Sương', desc: 'Ngược tâm, sâu sắc', icon: '❄️' },
                { type: 'la', label: 'Khám Phá Ngọc Lạ', desc: 'Mới mẻ, phá cách', icon: '🔮' },
              ].map((f) => (
                <motion.button
                  key={f.type}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectFlavor(f.type as any)}
                  className="bg-[#F8F6F5] border border-[#D8DEE8] hover:border-[#7A8AA5] rounded-[20px] p-4 flex flex-col items-center text-center shadow-sm cursor-pointer transition-all duration-300"
                >
                  <span className="text-3xl mb-1.5">{f.icon}</span>
                  <span className="font-serif text-xs font-extrabold text-[#3A4258] leading-snug">
                    {f.label}
                  </span>
                  <p className="text-[10px] text-[#6B7590] mt-1">
                    {f.desc}
                  </p>
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-6 text-xs font-bold text-[#3A4258] transition-colors bg-[#D8DEE8] hover:bg-[#B8C4D8] px-3.5 py-1.5 rounded-full cursor-pointer"
            >
              Quay lại chọn tâm trạng
            </button>
          </motion.div>
        )}

        {step === 'splitting' && (
          <motion.div
            key="splitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[220px] text-center"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              
              {/* Cutting Flash Line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: ['0%', '120%', '120%', '0%'], 
                  opacity: [0, 1, 1, 0],
                  rotate: -25
                }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute h-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] z-20"
              />

              {/* Hand Drawn Knife/Slash Blade */}
              <motion.div
                initial={{ x: -120, y: -50, opacity: 0 }}
                animate={{ 
                  x: [ -120, 120 ], 
                  y: [ -50, 50 ], 
                  opacity: [ 0, 1, 1, 0 ] 
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute text-4xl z-30 pointer-events-none"
              >
                🔪
              </motion.div>

              {/* Dragon Halves */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Left Half */}
                <motion.div
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ 
                    x: [0, 0, -35], 
                    rotate: [0, 0, -12],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 2.1, ease: 'easeInOut' }}
                  className="w-[60px] h-[120px] overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 w-[120px] h-[120px] flex items-center justify-center">
                    <QuizDragon mood={selectedMood === 'binh-thuong' ? 'binh-thuong' : (selectedMood || 'vui')} size={120} />
                  </div>
                </motion.div>

                {/* Right Half */}
                <motion.div
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ 
                    x: [0, 0, 35], 
                    rotate: [0, 0, 12],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 2.1, ease: 'easeInOut' }}
                  className="w-[60px] h-[120px] overflow-hidden relative"
                >
                  <div className="absolute right-0 top-0 w-[120px] h-[120px] flex items-center justify-center">
                    <QuizDragon mood={selectedMood === 'binh-thuong' ? 'binh-thuong' : (selectedMood || 'vui')} size={120} />
                  </div>
                </motion.div>
              </div>

              {/* Sparkles radiating */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute text-4xl text-[#E88BA0]"
              >
                ✨
              </motion.div>
            </div>
            
            <p className="text-xs font-bold text-[#E88BA0] animate-pulse">
              Ngọc rồng đang nứt ra để hiển thị lời tiên tri từ Shin...
            </p>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="flex flex-col items-center"
          >
            {/* Fortune scroll / paper scroll container with Slate/Pink styling */}
            <motion.div
              initial={{ rotate: -2, y: 10 }}
              animate={{ rotate: 0, y: 0 }}
              className="relative w-full max-w-xl bg-[#F8F6F5] border-2 border-dashed border-[#B8C4D8] rounded-3xl p-6 shadow-sm flex flex-col items-center text-center mb-6 overflow-hidden"
            >
              <div className="absolute top-2 left-2 text-sm opacity-65">🌸</div>
              <div className="absolute bottom-2 right-2 text-sm opacity-65">🌸</div>
              <div className="absolute top-2 right-3 text-[10px] text-[#7A8AA5] font-bold font-mono">SHIN'S ADVICE</div>
              
              <div className="text-3xl mb-1.5 select-none">📜</div>
              
              <span className="text-[10px] font-bold text-[#E88BA0] uppercase tracking-widest font-sans">
                Lời nhắn ngọt ngào của Shin
              </span>
              
              <h4 className="font-serif text-sm md:text-base font-extrabold text-[#3A4258] mt-2 mb-1.5 leading-relaxed italic max-w-lg">
                "{yesterdayMessage}"
              </h4>
              
              <div className="w-16 h-0.5 bg-[#B8C4D8] my-2 rounded-full" />
              <p className="text-[10px] text-[#6B7590] font-medium">
                Vị ngọt đọng lại nơi đầu lưỡi, xua tan mọi mỏi mệt trong tim.
              </p>
            </motion.div>

            {/* Recommendations Sub-Section */}
            <div className="w-full mt-2">
              <div className="flex items-center justify-between mb-4 pb-1.5 border-b border-[#D8DEE8]">
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-[#E88BA0]" />
                  <span className="font-serif text-xs font-black text-[#3A4258] tracking-wide uppercase">
                    Shin đề cử cho bạn hôm nay
                  </span>
                </div>
                
                <button
                  onClick={handleReset}
                  className="text-[11px] font-bold text-[#3A4258] hover:text-[#5A6B85] transition-colors bg-[#D8DEE8] hover:bg-[#B8C4D8] px-3.5 py-1 rounded-full cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw size={10} />
                  Chọn lại tâm trạng
                </button>
              </div>

              {/* 3 Compact recommended character cards */}
              {recommendedList.length > 0 ? (
                <div className={`grid grid-cols-1 ${
                  recommendedList.length === 1 
                     ? 'max-w-xs mx-auto' 
                     : recommendedList.length === 2 
                     ? 'sm:grid-cols-2 max-w-xl mx-auto' 
                     : 'sm:grid-cols-3'
                } gap-4`}>
                  {recommendedList.map((char) => (
                    <div
                      key={char.id}
                      className="bg-[#F8F6F5] border border-[#D8DEE8] hover:border-[#7A8AA5] rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-2.5">
                        <img
                          src={char.avatar}
                          alt={char.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover object-top border border-[#D8DEE8] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-xs font-bold text-[#3A4258] truncate">
                            {char.name}
                          </h5>
                          <p className="text-[10px] text-[#6B7590] line-clamp-1 mt-0.5">
                            {char.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2 mb-3">
                        <span className="text-[9px] bg-[#D8DEE8] text-[#3A4258] px-1.5 py-0.5 rounded font-bold">
                          {char.worldTag}
                        </span>
                        <span className="text-[9px] bg-[#F8E0E4] text-[#8B3A50] px-1.5 py-0.5 rounded font-bold">
                          {char.aftertasteTag}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onShowBackstory(char)}
                          className="flex-1 text-center font-bold text-[10px] text-[#3A4258] bg-[#D8DEE8] hover:bg-[#B8C4D8] py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Long Ký
                        </button>
                        <button
                          onClick={() => onThuongVi(char)}
                          className="flex-1 text-center font-bold text-[10px] text-[#F8F6F5] bg-gradient-to-r from-[#7A8AA5] to-[#F2DB88] hover:from-[#5A6B85] hover:to-[#E5C973] py-1.5 rounded-lg transition-all duration-300 cursor-pointer shadow-sm"
                        >
                          Triệu Long
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#F8F6F5] rounded-2xl p-5 border border-dashed border-[#D8DEE8] text-center">
                  <p className="text-xs text-[#6B7590] italic font-medium">
                    Xin lỗi babi vì hiện tại Long Uyển chưa có thuộc tính này nha இ௰อิ Hãy thử chọn long vị khác nhé, hứa là sau sẽ có nèe.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
