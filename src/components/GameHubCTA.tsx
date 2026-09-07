import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Character } from '../types';
import { GameListModal } from './GameListModal';
import { MemoryGameModal } from './MemoryGameModal';
import TamMenhGame from './TamMenhGame';

interface GameHubCTAProps {
  characters: Character[];
  onShowBackstory?: (character: Character) => void;
}

export const GameHubCTA: React.FC<GameHubCTAProps> = ({ characters, onShowBackstory }) => {
  const [showListModal, setShowListModal] = useState<boolean>(false);
  const [showMemoryModal, setShowMemoryModal] = useState<boolean>(false);
  const [showTamMenhModal, setShowTamMenhModal] = useState<boolean>(false);

  return (
    <>
      {/* Banner ngang CTA */}
      <div
        onClick={() => setShowListModal(true)}
        className="w-full frosted-glass-kem rounded-2xl p-4 sm:p-5 md:p-6 border border-[#D8DEE8] hover:border-[#F5C8D0] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(245,200,208,0.4)] transition-all duration-300 cursor-pointer group select-none relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Nội dung bên trái */}
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/70 border border-[#D8DEE8] flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
              🎮
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#3A4258] group-hover:text-[#D66A85] transition-colors truncate">
                Trải nghiệm thêm trò chơi
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#7A8AA5] mt-0.5 truncate">
                Khám phá các mini-game khác của Long Uyển
              </p>
            </div>
          </div>

          {/* Mũi tên bên phải có animation trượt nhẹ */}
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/60 border border-[#D8DEE8] group-hover:border-[#F5C8D0] group-hover:bg-[#E88BA0] text-[#7A8AA5] group-hover:text-white transition-all duration-300 shadow-xs">
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Popup 1: Danh sách Game */}
      <GameListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        onSelectMemoryGame={() => setShowMemoryModal(true)}
        onSelectTamMenhGame={() => setShowTamMenhModal(true)}
      />

      {/* Popup 2: Game Memory (Lật Thẻ Long Uyển) */}
      <MemoryGameModal
        characters={characters}
        isOpen={showMemoryModal}
        onClose={() => setShowMemoryModal(false)}
      />

      {/* Popup 3: Game Rút Thẻ Tâm Mệnh (Tarot) */}
      {showTamMenhModal && (
        <div
          className="fixed inset-0 bg-[#3A4258]/45 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn overflow-y-auto"
          onClick={() => setShowTamMenhModal(false)}
        >
          <div
            className="max-w-4xl w-full my-auto transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <TamMenhGame
              characters={characters}
              onShowBackstory={onShowBackstory}
              isModal
              onClose={() => setShowTamMenhModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
