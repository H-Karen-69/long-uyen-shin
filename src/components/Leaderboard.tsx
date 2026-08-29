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
    <div id="leaderboard-section" className="bg-[#F8F6F5] border border-[#D8DEE8] rounded-[24px] p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#D8DEE8]">
        <div className="p-2 bg-[#7A8AA5]/15 rounded-xl text-[#7A8AA5]">
          <Trophy size={20} className="animate-bounce text-[#E88BA0]" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-extrabold text-[#3A4258] leading-tight">
            Cửu Long Đài Nhà Shin 👑
          </h3>
          <p className="text-[11px] text-[#6B7590] font-medium">
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
              className="flex items-center justify-between p-3 bg-white hover:bg-[#F0EEED] rounded-[18px] border border-[#D8DEE8] shadow-sm transition-colors duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* Placement Badge */}
                <div className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0">
                  {isTop1 ? (
                    <span className="text-[#E88BA0] animate-pulse">
                      <Crown size={18} className="fill-current" />
                    </span>
                  ) : isTop2 ? (
                    <span className="text-[#7A8AA5]">
                      <Medal size={16} />
                    </span>
                  ) : isTop3 ? (
                    <span className="text-[#B8C4D8]">
                      <Medal size={16} />
                    </span>
                  ) : (
                    <span className="text-[#6B7590] font-mono">#{index + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                {char.avatar ? (
                  <img
                    src={char.avatar}
                    alt={char.name}
                    className="w-10 h-10 rounded-[12px] object-cover object-top border border-[#D8DEE8] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-[12px] flex items-center justify-center bg-gradient-to-br from-[#E8EAEF] to-[#F5C8D0] border border-[#D8DEE8] shadow-sm text-base">
                    🐉
                  </div>
                )}

                {/* Name */}
                <div>
                  <h4 className="font-bold text-xs text-[#3A4258] group-hover:text-[#7A8AA5] transition-colors leading-tight">
                    {char.name}
                  </h4>
                  <p className="text-[10px] text-[#6B7590] truncate max-w-[120px]">
                    {char.worldTag} • {char.aftertasteTag}
                  </p>
                </div>
              </div>

              {/* Likes counter indicator */}
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#E88BA0] bg-[#F8F6F5] border border-[#D8DEE8] px-2.5 py-1 rounded-full shadow-inner">
                <Heart size={10} className="fill-current text-[#E88BA0]" />
                <span>{char.likes}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
