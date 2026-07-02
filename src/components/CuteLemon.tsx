/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CuteLemonProps {
  className?: string;
  size?: number;
}

export default function CuteLemon({ className = '', size = 100 }: CuteLemonProps) {
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

      {/* Chiếc lá chanh non kẹo pastel #C8E6C9 */}
      <path
        d="M 50 15 C 62 8, 68 18, 51 24 C 45 20, 44 14, 50 15 Z"
        fill="#C8E6C9"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Thân quả chanh mập mạp, bo tròn màu vàng chanh non tươi #FFE873 */}
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

      {/* Đôi mắt đen tròn xoe mộc mạc #5D4E3C */}
      <circle cx="44" cy="55" r="3.5" fill="#5D4E3C" />
      <circle cx="62" cy="55" r="3.5" fill="#5D4E3C" />

      {/* Miệng cười chúm chím siêu cute vẽ tay */}
      <path
        d="M 50 59 C 51.5 61, 54.5 61, 56 59"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hai má hồng mọng má sữa màu hồng đào pastel #FFD3B6 */}
      <circle cx="36" cy="59" r="4.5" fill="#FFD3B6" opacity="0.9" />
      <circle cx="70" cy="59" r="4.5" fill="#FFD3B6" opacity="0.9" />
    </svg>
  );
}
