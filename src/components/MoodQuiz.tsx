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

// 5 Mood expressions for Cute Lemon SVG
interface QuizLemonProps {
  mood: 'vui' | 'buon' | 'codon' | 'binh-thuong' | 'buc';
  size?: number;
  className?: string;
}

export function QuizLemon({ mood, size = 60, className = '' }: QuizLemonProps) {
  // Common parts: Leaf and outline shape
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      {/* Cuống quả chanh */}
      <path
        d="M 50 15 L 50 24"
        stroke="#5D4E3C"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Chiếc lá chanh non kẹo pastel */}
      <path
        d="M 50 15 C 62 8, 68 18, 51 24 C 45 20, 44 14, 50 15 Z"
        fill="#C8E6C9"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Thân quả chanh mập mạp, bo tròn màu vàng chanh non tươi */}
      <path
        d="M 32 36 C 18 46, 20 74, 46 82 C 55 85, 66 84, 76 74 C 88 62, 85 44, 74 34 C 64 24, 42 26, 32 36 Z"
        fill="#FFE873"
        stroke="#5D4E3C"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Chi tiết bóng sáng nhỏ trên quả chanh */}
      <path
        d="M 33 46 A 8 8 0 0 1 42 38"
        stroke="#FFF"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Eyes and mouth based on mood */}
      {mood === 'vui' && (
        <>
          {/* Laughing eyes */}
          <path d="M 38 56 Q 42 51 46 56" stroke="#5D4E3C" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 56 56 Q 60 51 64 56" stroke="#5D4E3C" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Happy smile */}
          <path d="M 45 61 C 47 67, 55 67, 57 61" fill="#D32F2F" stroke="#5D4E3C" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}

      {mood === 'buon' && (
        <>
          {/* Tearful eyes */}
          <circle cx="42" cy="55" r="3.5" fill="#5D4E3C" />
          <circle cx="60" cy="55" r="3.5" fill="#5D4E3C" />
          {/* Tear drops */}
          <path d="M 42 59 C 41 64, 43 64, 42 59" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 60 59 C 59 64, 61 64, 60 59" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sad mouth */}
          <path d="M 47 64 Q 51 60 55 64" stroke="#5D4E3C" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {mood === 'codon' && (
        <>
          {/* Lonely, wide eyes */}
          <circle cx="40" cy="55" r="3" fill="#5D4E3C" />
          <circle cx="62" cy="55" r="3" fill="#5D4E3C" />
          {/* Small dot mouth */}
          <circle cx="51" cy="61" r="2" fill="#5D4E3C" />
        </>
      )}

      {mood === 'binh-thuong' && (
        <>
          {/* Flat expression */}
          <path d="M 38 55 L 46 55" stroke="#5D4E3C" strokeWidth="4" strokeLinecap="round" />
          <path d="M 56 55 L 64 55" stroke="#5D4E3C" strokeWidth="4" strokeLinecap="round" />
          {/* Flat mouth */}
          <path d="M 46 62 L 56 62" stroke="#5D4E3C" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}

      {mood === 'buc' && (
        <>
          {/* Angry eyes and brows */}
          <path d="M 35 48 L 44 52" stroke="#5D4E3C" strokeWidth="3" strokeLinecap="round" />
          <path d="M 67 48 L 58 52" stroke="#5D4E3C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="42" cy="55" r="3.5" fill="#5D4E3C" />
          <circle cx="60" cy="55" r="3.5" fill="#5D4E3C" />
          {/* Angry pouting mouth */}
          <path d="M 47 64 Q 51 59 55 64" stroke="#5D4E3C" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Hai má hồng đào pastel */}
      <circle cx="33" cy="60" r="4.5" fill="#FFD3B6" opacity="0.9" />
      <circle cx="69" cy="60" r="4.5" fill="#FFD3B6" opacity="0.9" />
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
    const saved = localStorage.getItem('shin_yesterday_message');
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
      messageText = "Hôm nay bạn tươi như một lát chanh mới hái. Cứ giữ nắng trong lòng nhé.";
    } else if (mood === 'buon') {
      messageText = "Buồn cũng không sao, chanh chua rồi cũng thành nước ngọt thôi. Shin ở đây với bạn.";
    } else if (mood === 'codon') {
      messageText = "Vườn chanh không bao giờ vắng người. Vào chọn một câu chuyện, có Shin bầu bạn.";
    } else if (mood === 'buc') {
      messageText = "Bực thì bóp một quả chanh cho hả giận. Xong rồi mình đi tìm chuyện dịu lại nha.";
    } else if (mood === 'binh-thuong' && flavor) {
      const flavorMessages = {
        chua: "Chua một chút mới đáng chinh phục. Đi thôi, Shin dẫn đường.",
        ngot: "Hôm nay chỉ toàn vị ngọt. Cứ thả mình vào nhé.",
        non: "Có những quả chanh cần được ôm. Đi tìm nó nào.",
        dang: "Đắng thật đấy, nhưng đôi khi mình cần chút đắng để nhớ lâu.",
        la: "Vườn chanh của Shin còn nhiều góc lạ lắm, thử nhé."
      };
      messageText = flavorMessages[flavor];
    }

    // Save to localStorage
    localStorage.setItem('shin_yesterday_message', messageText);
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
    <div id="mood-quiz-section" className="relative bg-[#FFFBEA] border-2 border-[#FFE873]/50 rounded-[28px] p-6 md:p-8 shadow-sm overflow-hidden mb-8">
      {/* Decorative floating lemon slices in background */}
      <div className="absolute top-2 right-4 text-2xl opacity-20 animate-spin" style={{ animationDuration: '12s' }}>🍋</div>
      <div className="absolute bottom-3 left-4 text-xl opacity-15 animate-bounce">🍋</div>
      <div className="absolute top-1/2 left-2 text-lg opacity-10">🍃</div>

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
            <div className="inline-flex items-center gap-1.5 bg-[#FFF2B2] px-3 py-1 rounded-full text-[11px] font-bold text-[#E8A382] mb-3">
              <Sparkles size={11} className="text-[#FFB300]" />
              TRẢI NGHIỆM ĐẶC BIỆT
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#5D4E3C] mb-1.5">
              Hôm nay bạn đang cảm thấy thế nào?
            </h3>
            <p className="text-xs text-[#E8A382] font-semibold tracking-wide mb-6">
              Chọn một quả chanh hợp tâm trạng, Shin sẽ chọn chuyện cho bạn.
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
                  className="bg-[#FFFDF2] border-2 border-[#FFE873]/30 hover:border-[#FFF176] rounded-[22px] p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <QuizLemon mood={m.type as any} size={58} className="mb-2 group-hover:rotate-6 transition-transform" />
                  <span className="font-serif text-xs font-black text-[#5D4E3C]">
                    {m.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Yesterday feedback message */}
            {yesterdayMessage && (
              <div className="mt-6 border-t border-[#F5EAD2]/60 pt-4 w-full text-center">
                <span className="text-[10px] text-[#5D4E3C]/40 uppercase tracking-widest font-bold">
                  Lời nhắn gần đây của bạn từ Shin
                </span>
                <p className="text-xs font-serif font-semibold italic text-[#E8A382] mt-1 max-w-md mx-auto">
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
            <h3 className="font-serif text-xl md:text-2xl font-extrabold text-[#5D4E3C] mb-1.5">
              Vậy hôm nay bạn muốn gì?
            </h3>
            <p className="text-xs text-[#E8A382] font-semibold tracking-wide mb-6">
              Chọn một hương vị, Shin dẫn bạn đi.
            </p>

            {/* 5 Flavor cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 w-full max-w-3xl">
              {[
                { type: 'chua', label: 'Chinh Phục Chanh Chua', desc: 'Lạnh lùng, kiêu ngạo', icon: '⚡️' },
                { type: 'ngot', label: 'Đắm Chìm Chanh Ngọt', desc: 'Sủng ngọt, cưng chiều', icon: '🍯' },
                { type: 'non', label: 'Bảo Vệ Chanh Non', desc: 'Yếu đuối, cần chở che', icon: '🌱' },
                { type: 'dang', label: 'Vướng Vào Chanh Đắng', desc: 'Ngược tâm, sâu sắc', icon: '☕' },
                { type: 'la', label: 'Khám Phá Vị Lạ', desc: 'Mới mẻ, phá cách', icon: '🧪' },
              ].map((f) => (
                <motion.button
                  key={f.type}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectFlavor(f.type as any)}
                  className="bg-[#FFFDF2] border border-[#F5EAD2] hover:border-[#FFF176] hover:bg-[#FFFDE8] rounded-[20px] p-4 flex flex-col items-center text-center shadow-sm cursor-pointer transition-all duration-300"
                >
                  <span className="text-3xl mb-1.5">{f.icon}</span>
                  <span className="font-serif text-xs font-extrabold text-[#5D4E3C] leading-snug">
                    {f.label}
                  </span>
                  <p className="text-[10px] text-[#5D4E3C]/60 mt-1">
                    {f.desc}
                  </p>
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-6 text-xs font-bold text-[#E8A382] hover:text-[#5D4E3C] transition-colors bg-[#FFF2B2]/50 hover:bg-[#FFF2B2] px-3.5 py-1.5 rounded-full"
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

              {/* Lemon Halves */}
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
                    <QuizLemon mood={selectedMood === 'binh-thuong' ? 'binh-thuong' : (selectedMood || 'vui')} size={120} />
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
                    <QuizLemon mood={selectedMood === 'binh-thuong' ? 'binh-thuong' : (selectedMood || 'vui')} size={120} />
                  </div>
                </motion.div>
              </div>

              {/* Sparkles radiating */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute text-4xl text-[#FFB300]"
              >
                ✨
              </motion.div>
            </div>
            
            <p className="text-xs font-bold text-[#E8A382] animate-pulse">
              Đang bổ quả chanh ngọt để xem lời nhắn từ Shin...
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
            {/* Fortune scroll / paper scroll container with wavy, lemon cream styling */}
            <motion.div
              initial={{ rotate: -2, y: 10 }}
              animate={{ rotate: 0, y: 0 }}
              className="relative w-full max-w-xl bg-gradient-to-r from-[#FFFDF2] via-[#FFFDE8] to-[#FFFDF2] border-2 border-dashed border-[#E8A382]/60 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center mb-6 overflow-hidden"
            >
              {/* Little lemon leaf decorations in corners */}
              <div className="absolute top-2 left-2 text-sm opacity-65">🍃</div>
              <div className="absolute bottom-2 right-2 text-sm opacity-65">🍃</div>
              <div className="absolute top-2 right-3 text-[10px] text-[#E8A382]/40 font-bold font-mono">SHIN'S ADVICE</div>
              
              <div className="text-3xl mb-1.5 select-none">📜</div>
              
              <span className="text-[10px] font-bold text-[#E8A382]/70 uppercase tracking-widest font-sans">
                Lời nhắn ngọt ngào của Shin
              </span>
              
              <h4 className="font-serif text-sm md:text-base font-extrabold text-[#5D4E3C] mt-2 mb-1.5 leading-relaxed italic max-w-lg">
                "{yesterdayMessage}"
              </h4>
              
              <div className="w-16 h-0.5 bg-[#E8A382]/30 my-2 rounded-full" />
              <p className="text-[10px] text-[#5D4E3C]/60 font-medium">
                Vị ngọt đọng lại nơi đầu lưỡi, xua tan mọi mỏi mệt trong tim.
              </p>
            </motion.div>

            {/* Recommendations Sub-Section */}
            <div className="w-full mt-2">
              <div className="flex items-center justify-between mb-4 pb-1.5 border-b border-[#F5EAD2]">
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-[#FFB300]" />
                  <span className="font-serif text-xs font-black text-[#5D4E3C] tracking-wide uppercase">
                    Shin đề cử cho bạn hôm nay
                  </span>
                </div>
                
                <button
                  onClick={handleReset}
                  className="text-[11px] font-bold text-[#E8A382] hover:text-[#5D4E3C] transition-colors bg-[#FFF2B2]/50 hover:bg-[#FFF2B2] px-3.5 py-1 rounded-full cursor-pointer flex items-center gap-1"
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
                      className="bg-[#FFFDF2] border border-[#F5EAD2] hover:border-[#FFF176] rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-2.5">
                        <img
                          src={char.avatar}
                          alt={char.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover object-top border border-[#FAE9C5] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-xs font-bold text-[#5D4E3C] truncate">
                            {char.name}
                          </h5>
                          <p className="text-[10px] text-[#5D4E3C]/60 line-clamp-1 mt-0.5">
                            {char.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2 mb-3">
                        <span className="text-[9px] bg-[#FAE9C5] text-[#5D4E3C]/80 px-1.5 py-0.5 rounded font-bold">
                          {char.worldTag}
                        </span>
                        <span className="text-[9px] bg-[#FFD3B6] text-[#5D4E3C]/80 px-1.5 py-0.5 rounded font-bold">
                          {char.aftertasteTag}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onShowBackstory(char)}
                          className="flex-1 text-center font-bold text-[10px] text-[#5D4E3C]/70 hover:text-[#5D4E3C] bg-[#FAE9C5]/40 hover:bg-[#FAE9C5] py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Cốt Truyện
                        </button>
                        <button
                          onClick={() => onThuongVi(char)}
                          className="flex-1 text-center font-bold text-[10px] text-[#5D4E3C] bg-[#FFF176] hover:bg-[#FFF59D] py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Thưởng Vị
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#FFFDF2]/60 rounded-2xl p-5 border border-dashed border-[#F5EAD2] text-center">
                  <p className="text-xs text-[#5D4E3C]/60 italic font-medium">
                    Xin lỗi babi vì hiện tại vườn chưa có hương vị này nha இ௰இ Hãy thử chọn hương vị khác nhé, hứa là sau sẽ có nèe.
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
