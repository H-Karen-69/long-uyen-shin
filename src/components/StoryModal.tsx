/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, Heart, Coffee } from 'lucide-react';
import { Character } from '../types';
import DragonCloseButton from './DragonCloseButton';

interface StoryModalProps {
  character: Character | null;
  onClose: () => void;
  onLike: (char: Character) => void;
  isLiked: boolean;
}

export default function StoryModal({ character, onClose, onLike, isLiked }: StoryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
          className="absolute inset-0 bg-[#3A4258]/50 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          id={`story-modal-${character.id}`}
          className="relative w-full max-w-lg glass-modal text-[#3A4258] rounded-[30px] overflow-hidden z-10"
        >
          {/* Accent Top Bar */}
          <div className="h-2 bg-gradient-to-r from-[#7A8AA5] via-[#F5C8D0] to-[#E88BA0]" />

          {/* Close Button */}
          <DragonCloseButton
            onClick={onClose}
            className="absolute top-4 right-4 z-20"
            tooltip="Khép lại bối cảnh"
          />

          {/* Body Content */}
          <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {/* Header section */}
            <div className="flex items-center gap-4 mb-6">
              {character.avatar ? (
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-16 h-16 rounded-[20px] object-cover object-top shadow-md border-2 border-[#7A8AA5]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-[20px] flex items-center justify-center bg-gradient-to-br from-[#E8EAEF] to-[#F5C8D0] shadow-md border-2 border-[#7A8AA5] text-2xl">
                  🐉
                </div>
              )}
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5A6B85] bg-[#D8DEE8]/50 px-2.5 py-1 rounded-full mb-1">
                  <Sparkles size={10} />
                  {character.genre}
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#3A4258] leading-none">
                  {character.name}
                </h3>
                <p className="text-xs text-[#E88BA0] mt-1 font-medium">{character.title}</p>
              </div>
            </div>

            {/* Backstory Prose */}
            <div className="bg-[#F8F6F5] p-5 rounded-[20px] border border-[#D8DEE8] shadow-inner mb-6 relative">
              <div className="absolute top-3 right-3 text-[#7A8AA5]/60">
                <BookOpen size={24} className="opacity-30" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7590] mb-2 flex items-center gap-1.5 font-sans">
                <Coffee size={12} className="text-[#7A8AA5]" />
                Hồi ức & Bối cảnh
              </h4>
              <p className="text-sm text-[#3A4258]/90 leading-relaxed font-sans whitespace-pre-line text-justify italic">
                "{character.storyText}"
              </p>
            </div>

            {/* Quick Stats & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#D8DEE8]">
              <div className="flex gap-2">
                <span className="text-xs font-semibold text-[#5A6B85]">
                  #{character.worldTag}
                </span>
                <span className="text-xs font-semibold text-[#E88BA0]">
                  #{character.aftertasteTag}
                </span>
                <span className="text-xs font-semibold text-[#6B7590]">
                  #{character.statusTag}
                </span>
              </div>

              {/* Like action inside modal */}
              <button
                id={`modal-like-btn-${character.id}`}
                onClick={() => onLike(character)}
                className="flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-full bg-[#F8F6F5] hover:bg-[#D8DEE8]/50 text-[#3A4258] border border-[#D8DEE8] transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Heart
                  size={14}
                  className={`transition-all duration-300 ${
                    isLiked ? 'fill-[#D66A85] text-[#D66A85] scale-110' : 'text-[#E88BA0]'
                  }`}
                />
                <span>{character.likes} Tim</span>
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-[#F0EEED]/80 p-4 border-t border-[#D8DEE8] flex justify-end">
            <a
              id={`modal-action-btn-${character.id}`}
              href={character.roleplayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-sm font-bold text-[#F8F6F5] bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] hover:from-[#5A6B85] hover:to-[#D66A85] py-3 px-6 rounded-[15px] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Triệu Long Ngay
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
