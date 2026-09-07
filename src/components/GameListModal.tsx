import React from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import DragonCloseButton from './DragonCloseButton';

interface GameListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemoryGame: () => void;
  onSelectTamMenhGame: () => void;
}

export const GameListModal: React.FC<GameListModalProps> = ({
  isOpen,
  onClose,
  onSelectMemoryGame,
  onSelectTamMenhGame,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#3A4258]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-modal max-w-lg w-full rounded-2xl p-6 md:p-8 relative shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng Long Uyển */}
        <DragonCloseButton onClick={onClose} tooltip="Khép lại danh sách" />

        {/* Header */}
        <div className="mb-6 pr-14">
          <h3 className="font-serif text-2xl font-bold text-[#3A4258] flex items-center gap-2">
            <span>🎮</span>
            <span>Chọn Trò Chơi</span>
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#7A8AA5] mt-1">
            Long Uyển đã chuẩn bị sẵn vài cuộc chơi cho lữ khách...
          </p>
        </div>

        {/* Danh sách trò chơi */}
        <div className="space-y-3">
          {/* Trò chơi 1: Lật Thẻ Long Uyển (Active) */}
          <div
            onClick={() => {
              onClose();
              onSelectMemoryGame();
            }}
            className="glass-card rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:border-[#E88BA0] hover:shadow-[0_4px_16px_rgba(232,139,160,0.25)] cursor-pointer group border border-[#D8DEE8]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5E6EA] to-[#E8EEF6] border border-[#F5C8D0] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                🎴
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-[#3A4258] group-hover:text-[#E88BA0] transition-colors">
                    Lật Thẻ Long Uyển
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E88BA0] text-white badge-breath-animate">
                    MỚI
                  </span>
                </div>
                <p className="font-sans text-xs text-[#7A8AA5] mt-0.5">
                  Tìm cặp thẻ nhân vật trùng nhau
                </p>
              </div>
            </div>
            <ChevronRight
              size={18}
              className="text-[#7A8AA5] group-hover:text-[#E88BA0] group-hover:translate-x-1 transition-all"
            />
          </div>

          {/* Trò chơi 2: Rút Thẻ Tâm Mệnh (Active) */}
          <div
            onClick={() => {
              onClose();
              onSelectTamMenhGame();
            }}
            className="glass-card rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:border-[#E88BA0] hover:shadow-[0_4px_16px_rgba(232,139,160,0.25)] cursor-pointer group border border-[#D8DEE8]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF4D6] to-[#FAEDF0] border border-[#F2D184] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                🔮
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-[#3A4258] group-hover:text-[#E88BA0] transition-colors">
                    Rút Thẻ Tâm Mệnh
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#7A8AA5] mt-0.5">
                  Khám phá tâm mệnh & duyên phận hôm nay
                </p>
              </div>
            </div>
            <ChevronRight
              size={18}
              className="text-[#7A8AA5] group-hover:text-[#E88BA0] group-hover:translate-x-1 transition-all"
            />
          </div>

          {/* Trò chơi 3: Thư Long Uyển (Locked) */}
          <div className="glass-card rounded-xl p-4 flex items-center justify-between border border-[#D8DEE8]/60 opacity-50 cursor-not-allowed select-none">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#E8EAEF] border border-[#D8DEE8] flex items-center justify-center text-xl text-[#7A8AA5]">
                <Lock size={20} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#3A4258]">
                  Thư Long Uyển
                </h4>
                <p className="font-sans text-xs text-[#7A8AA5] mt-0.5">
                  Sắp ra mắt...
                </p>
              </div>
            </div>
            <Lock size={16} className="text-[#9AAAC5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
