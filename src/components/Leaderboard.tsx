/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Crown, Heart, Medal, Trophy } from 'lucide-react';
import { Character } from '../types';

interface LeaderboardProps {
  characters: Character[];
  onShowBackstory: (char: Character) => void;
}

export default function Leaderboard({ characters, onShowBackstory }: LeaderboardProps) {
  // Sort characters by likes in descending order
  const sortedChars = [...characters]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3); // Show top 3 husbands

  return (
    <div id="leaderboard-section" className="glass-card rounded-[24px] p-6">
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#F5EAD2]">
        <div className="p-2 bg-[#F7D070]/15 rounded-xl text-[#F7D070]">
          <Trophy size={20} className="animate-bounce" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-extrabold text-[#5D4E3C] leading-tight">
            Top Chanh Nhà Shin 👑
          </h3>
          <p className="text-[11px] text-[#5D4E3C]/60 font-medium">
            Xếp hạng được bình chọn nhiều nhất
          </p>
        </div>
      </div>

      {/* Ranks list */}
      <div className="space-y-3">
        {sortedChars.map((char, index) => {
          const isTop1 = index === 0;
          const isTop2 = index === 1;
          const isTop3 = index === 2;

          return (
            <motion.div
              key={char.id}
              layout
              id={`leaderboard-item-${char.id}`}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              onClick={() => onShowBackstory(char)}
              className="flex items-center justify-between p-3 bg-[#FAE9C5]/50 hover:bg-[#FAE9C5] rounded-[18px] border border-[#F5EAD2]/50 transition-colors duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* Placement Badge */}
                <div className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0">
                  {isTop1 ? (
                    <span className="text-[#F7D070] animate-pulse">
                      <Crown size={18} className="fill-current" />
                    </span>
                  ) : isTop2 ? (
                    <span className="text-[#E8A382]">
                      <Medal size={16} />
                    </span>
                  ) : isTop3 ? (
                    <span className="text-[#9D9E73]">
                      <Medal size={16} />
                    </span>
                  ) : (
                    <span className="text-[#5D4E3C]/40 font-mono">#{index + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                <img
                  src={char.avatar}
                  alt={char.name}
                  className="w-10 h-10 rounded-[12px] object-cover object-top border border-[#F5EAD2] shadow-sm"
                  referrerPolicy="no-referrer"
                />

                {/* Name */}
                <div>
                  <h4 className="font-bold text-xs text-[#5D4E3C] group-hover:text-[#9D9E73] transition-colors leading-tight">
                    {char.name}
                  </h4>
                  <p className="text-[10px] text-[#5D4E3C]/60 truncate max-w-[120px]">
                    {char.worldTag} • {char.aftertasteTag}
                  </p>
                </div>
              </div>

              {/* Likes counter indicator */}
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#E8A382] bg-white/60 px-2.5 py-1 rounded-full shadow-inner">
                <Heart size={10} className="fill-current text-[#E8A382]" />
                <span>{char.likes}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
