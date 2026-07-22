/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CuteDragonProps {
  className?: string;
  size?: number;
}

export default function CuteDragon({ className = '', size = 100 }: CuteDragonProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      {/* Cặp sừng rồng nhỏ xinh màu vàng hoàng kim ấm #F7D070 */}
      <path
        d="M 38 25 C 38 18, 32 15, 28 16 C 32 21, 35 24, 38 25 Z"
        fill="#F7D070"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 62 25 C 62 18, 68 15, 72 16 C 68 21, 65 24, 62 25 Z"
        fill="#F7D070"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Đôi tai rồng xinh xắn hai bên màu ngọc bích nhạt */}
      <path
        d="M 28 38 C 20 38, 18 48, 25 48 C 28 44, 28 40, 28 38 Z"
        fill="#98D7C2"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 72 38 C 80 38, 82 48, 75 48 C 72 44, 72 40, 72 38 Z"
        fill="#98D7C2"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Đầu rồng mập mạp tròn trịa màu ngọc bích lung linh #A2E3C4 */}
      <path
        d="M 25 50 C 22 75, 45 88, 50 88 C 55 88, 78 75, 75 50 C 72 28, 28 28, 25 50 Z"
        fill="#A2E3C4"
        stroke="#5D4E3C"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Chi tiết sừng chính nhỏ giữa trán */}
      <path
        d="M 50 22 L 50 30"
        stroke="#5D4E3C"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Chòm tóc rồng mềm mại màu bồng bềnh */}
      <path
        d="M 45 28 C 45 22, 55 22, 55 28 C 53 30, 47 30, 45 28 Z"
        fill="#FFFDF2"
        stroke="#5D4E3C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Đôi mắt to tròn long lanh, tràn đầy linh khí */}
      <circle cx="40" cy="54" r="4" fill="#5D4E3C" />
      <circle cx="60" cy="54" r="4" fill="#5D4E3C" />
      
      {/* Đốm sáng trong mắt rồng con */}
      <circle cx="38.5" cy="52.5" r="1.5" fill="#FFF" />
      <circle cx="58.5" cy="52.5" r="1.5" fill="#FFF" />

      {/* Đôi râu rồng nhỏ uyển chuyển hai bên má rồng phương Đông */}
      <path
        d="M 32 60 C 20 62, 18 70, 16 72"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 68 60 C 80 62, 82 70, 84 72"
        stroke="#5D4E3C"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Chiếc mũi rồng và nụ cười cute vẽ nét thủ công */}
      <path
        d="M 47 62 C 48.5 63.5, 51.5 63.5, 53 62"
        stroke="#5D4E3C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 46 68 C 48 70, 52 70, 54 68"
        stroke="#5D4E3C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Má hồng rực rỡ màu đào ấm ngọt ngào #FFD3B6 */}
      <circle cx="32" cy="59" r="5" fill="#FFD3B6" opacity="0.85" />
      <circle cx="68" cy="59" r="5" fill="#FFD3B6" opacity="0.85" />
    </svg>
  );
}
