/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, BookOpen, Heart, Coffee } from 'lucide-react';
import { Character } from '../types';

interface StoryModalProps {
  character: Character | null;
  onClose: () => void;
  onLike: (char: Character) => void;
  isLiked: boolean;
}

export default function StoryModal({ character, onClose, onLike, isLiked }: StoryModalProps) {
  if (!character) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#5D4E3C]/30 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          id={`story-modal-${character.id}`}
          className="relative w-full max-w-lg glass-modal text-[#5D4E3C] rounded-[30px] overflow-hidden z-10"
        >
          {/* Accent Top Bar */}
          <div className="h-2 bg-gradient-to-r from-[#FFE873] via-[#FFD3B6] to-[#C8E6C9]" />

          {/* Close Button */}
          <button
            id={`close-modal-btn-${character.id}`}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FFE873]/30 hover:bg-[#FFE873]/60 text-[#5D4E3C] transition-all cursor-pointer hover:rotate-90 duration-300"
            aria-label="Đóng bối cảnh"
          >
            <X size={18} />
          </button>

          {/* Body Content */}
          <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {/* Header section */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={character.avatar}
                alt={character.name}
                className="w-16 h-16 rounded-[20px] object-cover shadow-md border-2 border-[#FFE873]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A8B63] bg-[#C8E6C9]/30 px-2.5 py-1 rounded-full mb-1">
                  <Sparkles size={10} />
                  {character.genre}
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#5D4E3C] leading-none">
                  {character.name}
                </h3>
                <p className="text-xs text-[#E8A382] mt-1 font-medium">{character.title}</p>
              </div>
            </div>

            {/* Backstory Prose */}
            <div className="bg-[#FFF9E5] p-5 rounded-[20px] border border-[#F5EAD2] shadow-inner mb-6 relative">
              <div className="absolute top-3 right-3 text-[#FFE873]/60">
                <BookOpen size={24} className="opacity-30" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D4E3C]/60 mb-2 flex items-center gap-1.5 font-sans">
                <Coffee size={12} className="text-[#FFE873]" />
                Hồi ức & Bối cảnh
              </h4>
              <p className="text-sm text-[#5D4E3C]/90 leading-relaxed font-sans whitespace-pre-line text-justify italic">
                "{character.storyText}"
              </p>
            </div>

            {/* Quick Stats & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F5EAD2]">
              <div className="flex gap-2">
                <span className="text-xs font-semibold text-[#7A8B63]">
                  #{character.worldTag}
                </span>
                <span className="text-xs font-semibold text-[#E8A382]">
                  #{character.aftertasteTag}
                </span>
                <span className="text-xs font-semibold text-[#BCA136]">
                  #{character.statusTag}
                </span>
              </div>

              {/* Like action inside modal */}
              <button
                id={`modal-like-btn-${character.id}`}
                onClick={() => onLike(character)}
                className="flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-full bg-[#FFF9E5] hover:bg-[#FFE873]/30 text-[#5D4E3C] border border-[#F5EAD2] transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Heart
                  size={14}
                  className={`transition-all duration-300 ${
                    isLiked ? 'fill-[#EF4444] text-[#EF4444] scale-110' : 'text-[#E8A382]'
                  }`}
                />
                <span>{character.likes} Tim</span>
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-[#FAE9C5]/20 p-4 border-t border-[#F5EAD2] flex justify-end">
            <a
              id={`modal-action-btn-${character.id}`}
              href={character.roleplayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-sm font-bold text-[#5D4E3C] bg-[#FFF176] hover:bg-[#FFF59D] py-3 px-6 rounded-[15px] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Thưởng Vị Ngay
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
