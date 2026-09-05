import React from 'react';

/**
 * 1. Dãy đồi phong cách Anime (Anime Rolling Hills)
 * - Đa tầng: Đồi xa mờ ảo, đồi giữa tươi tắn đón vệt nắng vàng, đồi gần thảm cỏ mướt
 * - Điểm xuyết hoa dại và chùm cỏ nhấp nhô phong cách Ghibli / Makoto Shinkai
 */
export const AnimeHills: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`anime-hills-container ${className}`} aria-hidden="true">
      <svg
        className="anime-hills-svg"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Đồi xa 1: Xanh ngọc mờ ảo hòa vào chân trời */}
          <linearGradient id="farHillGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#AEE2D0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#87CBB4" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#67B49B" stopOpacity="0.95" />
          </linearGradient>

          {/* Đồi giữa 2: Xanh lục non tươi tắn, có vệt sáng nắng ấm */}
          <linearGradient id="midHillGrad" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#8FD9B6" />
            <stop offset="40%" stopColor="#6EC79E" />
            <stop offset="100%" stopColor="#4FA87F" />
          </linearGradient>

          {/* Đồi gần 3: Xanh mướt rêu phong đậm đà */}
          <linearGradient id="nearHillGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#5EBA8C" />
            <stop offset="55%" stopColor="#439A6F" />
            <stop offset="100%" stopColor="#2E7954" />
          </linearGradient>

          {/* Ánh sáng vàng dịu rọi trên sườn đồi */}
          <radialGradient id="hillSunlight" cx="65%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FFF9D2" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#E0F5C8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#439A6F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- Đồi xa (Far Hill Layer) --- */}
        <path
          d="M -100 420 L -100 200 C 120 130 340 170 520 140 C 720 110 940 180 1140 150 C 1320 120 1480 170 1560 190 L 1560 420 Z"
          fill="url(#farHillGrad)"
        />

        {/* --- Đồi giữa (Mid Hill Layer) --- */}
        <path
          d="M -50 420 L -50 240 C 180 170 380 250 600 210 C 850 160 1060 260 1320 190 C 1420 170 1500 200 1520 220 L 1520 420 Z"
          fill="url(#midHillGrad)"
        />

        {/* Vệt nắng ấm rọi trên đồi giữa */}
        <path
          d="M 500 420 L 500 210 C 700 170 900 190 1100 220 C 1250 240 1350 220 1400 230 L 1400 420 Z"
          fill="url(#hillSunlight)"
        />

        {/* --- Đồi gần (Near Hill Layer & Sườn đồi) --- */}
        <path
          d="M -20 420 L -20 290 C 160 265 320 315 520 275 C 780 225 980 305 1220 265 C 1360 245 1460 275 1480 295 L 1480 420 Z"
          fill="url(#nearHillGrad)"
        />

        {/* Đốm hoa dại và khóm cỏ rải rác trên sườn đồi xa */}
        <g className="distant-meadow-details" opacity="0.9">
          <circle cx="280" cy="235" r="3" fill="#FFE875" />
          <circle cx="288" cy="232" r="2.2" fill="#FFFFFF" />
          <circle cx="295" cy="236" r="2.5" fill="#FFE875" />
          <circle cx="420" cy="245" r="3" fill="#FFFFFF" />
          <circle cx="428" cy="243" r="2.2" fill="#FFB7C5" />
          <circle cx="780" cy="195" r="2.8" fill="#FFFFFF" />
          <circle cx="788" cy="192" r="2.4" fill="#FFE875" />
          <circle cx="795" cy="196" r="2.5" fill="#FFFFFF" />
          <circle cx="950" cy="250" r="3.2" fill="#FFE875" />
          <circle cx="960" cy="246" r="2.5" fill="#FFC2D4" />
          <circle cx="1080" cy="235" r="2.8" fill="#FFFFFF" />
          <circle cx="1089" cy="232" r="2.2" fill="#FFE875" />
          <circle cx="1260" cy="225" r="3" fill="#FFFFFF" />
          <circle cx="1268" cy="222" r="2.4" fill="#FFE082" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Khóm hoa cỏ tiền cảnh hai bên phong cách Anime (Anime Foreground Wildflowers & Grass)
 * - Từng ngọn cỏ xanh dài sắc nét đung đưa mềm mại theo gió (CSS keyframes)
 * - Các loài hoa dại rực rỡ chi tiết: Cúc họa mi trắng, bồ công anh vàng, hoa chuông xanh lam, hoa cánh bướm hồng tím
 * - Cỏ lau trắng bồng bềnh đón nắng
 */
export const AnimeWildflowers: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`anime-wildflowers-wrapper ${className}`} aria-hidden="true">
      {/* ===================================================================
          KHÓM HOA CỎ BÊN TRÁI (LEFT BUSH)
          =================================================================== */}
      <div className="anime-flower-bush bush-left-anime">
        <svg
          viewBox="0 0 340 260"
          className="flower-bush-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grassBladeGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2D6A4F" />
              <stop offset="60%" stopColor="#40916C" />
              <stop offset="100%" stopColor="#95D5B2" />
            </linearGradient>
            <linearGradient id="grassBladeGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1B4332" />
              <stop offset="50%" stopColor="#2D6A4F" />
              <stop offset="100%" stopColor="#74C69D" />
            </linearGradient>
            <linearGradient id="stemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2D6A4F" />
              <stop offset="100%" stopColor="#52B788" />
            </linearGradient>
            <linearGradient id="daisyPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E2EAF4" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <radialGradient id="flowerCenterYellow" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="60%" stopColor="#FBC02D" />
              <stop offset="100%" stopColor="#F57F17" />
            </radialGradient>
          </defs>

          {/* Lớp bóng cỏ nền sẫm */}
          <path
            d="M 0 260 C 40 230 100 225 180 235 C 240 245 290 235 340 260 Z"
            fill="#1B4332"
            opacity="0.85"
          />

          {/* TỪNG NGỌN CỎ DÀI SẮC NÉT (Anime Grass Blades) */}
          <g className="grass-blades-group grass-sway-left">
            {/* Cỏ sau lưng */}
            <path d="M 20 260 Q 30 180 55 125 Q 38 180 30 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 50 260 Q 65 170 95 110 Q 75 170 65 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 85 260 Q 105 190 140 135 Q 115 190 100 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 125 260 Q 155 180 195 130 Q 165 185 145 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 175 260 Q 205 190 245 145 Q 215 195 195 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 225 260 Q 250 200 280 160 Q 260 205 245 260 Z" fill="url(#grassBladeGrad1)" />

            {/* Cỏ tầng giữa vươn mềm mại */}
            <path d="M 5 260 Q 22 195 45 150 Q 28 195 18 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 40 260 Q 60 185 82 140 Q 65 190 55 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 75 260 Q 100 175 125 120 Q 105 180 90 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 110 260 Q 135 185 165 135 Q 145 190 130 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 155 260 Q 180 195 210 150 Q 190 200 170 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 195 260 Q 225 190 260 140 Q 235 195 215 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 255 260 Q 275 205 300 165 Q 285 210 270 260 Z" fill="url(#grassBladeGrad1)" />

            {/* Cỏ tiền cảnh nhọn và đung đưa nhẹ */}
            <path d="M 30 260 Q 45 210 62 170 Q 48 210 40 260 Z" fill="#74C69D" />
            <path d="M 95 260 Q 115 205 138 160 Q 120 205 108 260 Z" fill="#95D5B2" />
            <path d="M 140 260 Q 160 215 185 175 Q 165 215 155 260 Z" fill="#74C69D" />
            <path d="M 185 260 Q 210 210 230 170 Q 215 215 200 260 Z" fill="#95D5B2" />
          </g>

          {/* CÁC BÔNG HOA DẠI ANIME NỞ RỘ */}
          <g className="wildflowers-group">
            {/* HOA CÚC HỌA MI TRẮNG 1 (Lớn, vươn cao rực rỡ) */}
            <g className="flower-item flower-sway-1" transform="translate(85, 120)">
              <path d="M 0 140 Q -12 70 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M -4 60 Q -20 54 -15 45 Q -6 52 -3 58 Z" fill="#52B788" />
              <path d="M 0 38 Q 15 32 13 24 Q 5 30 0 36 Z" fill="#74C69D" />
              <g transform="translate(0, 0)">
                <ellipse cx="0" cy="-15" rx="4.5" ry="9.5" fill="url(#daisyPetalGrad)" />
                <ellipse cx="11" cy="-11" rx="4.5" ry="9.5" transform="rotate(45, 11, -11)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="15" cy="0" rx="9.5" ry="4.5" fill="url(#daisyPetalGrad)" />
                <ellipse cx="11" cy="11" rx="4.5" ry="9.5" transform="rotate(-45, 11, 11)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="0" cy="15" rx="4.5" ry="9.5" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-11" cy="11" rx="4.5" ry="9.5" transform="rotate(45, -11, 11)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-15" cy="0" rx="9.5" ry="4.5" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-11" cy="-11" rx="4.5" ry="9.5" transform="rotate(-45, -11, -11)" fill="url(#daisyPetalGrad)" />
                <circle cx="0" cy="0" r="6.5" fill="url(#flowerCenterYellow)" />
                <circle cx="-1.5" cy="-1.5" r="2" fill="#FFFDE7" opacity="0.85" />
              </g>
            </g>

            {/* HOA BỒ CÔNG ANH VÀNG 1 */}
            <g className="flower-item flower-sway-2" transform="translate(150, 135)">
              <path d="M 0 125 Q 16 60 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M 6 55 Q 20 48 16 40 Q 8 46 4 52 Z" fill="#52B788" />
              <g transform="translate(0, 0)">
                <circle cx="0" cy="-9" r="5.5" fill="#FFCA28" />
                <circle cx="8" cy="-4.5" r="5.5" fill="#FFD54F" />
                <circle cx="8" cy="4.5" r="5.5" fill="#FFCA28" />
                <circle cx="0" cy="9" r="5.5" fill="#FFC107" />
                <circle cx="-8" cy="4.5" r="5.5" fill="#FFD54F" />
                <circle cx="-8" cy="-4.5" r="5.5" fill="#FFCA28" />
                <circle cx="0" cy="0" r="5" fill="#FFA000" />
                <circle cx="-1" cy="-1" r="1.8" fill="#FFF9C4" />
              </g>
            </g>

            {/* HOA CHUÔNG XANH BIẾC 1 */}
            <g className="flower-item flower-sway-3" transform="translate(210, 140)">
              <path d="M 0 120 Q -14 55 5 0" fill="none" stroke="url(#stemGrad)" strokeWidth="2.4" strokeLinecap="round" />
              <g transform="translate(-4, 28)">
                <path d="M 0 0 Q -9 11 -5 18 Q 0 16 5 18 Q 9 11 0 0 Z" fill="#64B5F6" />
                <ellipse cx="0" cy="17" rx="4" ry="1.8" fill="#BBDEFB" />
              </g>
              <g transform="translate(7, 12)">
                <path d="M 0 0 Q -8 10 -4 15 Q 0 14 4 15 Q 8 10 0 0 Z" fill="#42A5F5" />
                <ellipse cx="0" cy="14" rx="3.5" ry="1.5" fill="#E3F2FD" />
              </g>
              <g transform="translate(5, 0)">
                <path d="M 0 0 Q -6 8 -3 12 Q 0 11 3 12 Q 6 8 0 0 Z" fill="#90CAF9" />
              </g>
            </g>

            {/* HOA CÚC DẠI TRẮNG 2 (Mép trái) */}
            <g className="flower-item flower-sway-1" transform="translate(40, 155)">
              <path d="M 0 105 Q -9 52 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="2.2" strokeLinecap="round" />
              <g transform="translate(0, 0) scale(0.8)">
                <ellipse cx="0" cy="-13" rx="4" ry="8" fill="url(#daisyPetalGrad)" />
                <ellipse cx="9" cy="-9" rx="4" ry="8" transform="rotate(45, 9, -9)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="13" cy="0" rx="8" ry="4" fill="url(#daisyPetalGrad)" />
                <ellipse cx="9" cy="9" rx="4" ry="8" transform="rotate(-45, 9, 9)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="0" cy="13" rx="4" ry="8" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-9" cy="9" rx="4" ry="8" transform="rotate(45, -9, 9)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-13" cy="0" rx="8" ry="4" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-9" cy="-9" rx="4" ry="8" transform="rotate(-45, -9, -9)" fill="url(#daisyPetalGrad)" />
                <circle cx="0" cy="0" r="5.5" fill="url(#flowerCenterYellow)" />
              </g>
            </g>

            {/* CỎ LAU TRẮNG ĐUNG ĐƯA */}
            <g className="flower-item flower-sway-2" transform="translate(260, 130)">
              <path d="M 0 130 Q 16 65 6 0" fill="none" stroke="#74C69D" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="7" cy="12" rx="4.5" ry="13" fill="#E8F5E9" opacity="0.9" transform="rotate(15, 7, 12)" />
              <ellipse cx="9" cy="25" rx="4" ry="11" fill="#C8E6C9" opacity="0.85" transform="rotate(10, 9, 25)" />
              <ellipse cx="5" cy="2" rx="3.5" ry="9" fill="#FFFFFF" opacity="0.95" transform="rotate(20, 5, 2)" />
            </g>
          </g>
        </svg>
      </div>

      {/* ===================================================================
          KHÓM HOA CỎ BÊN PHẢI (RIGHT BUSH)
          =================================================================== */}
      <div className="anime-flower-bush bush-right-anime">
        <svg
          viewBox="0 0 340 260"
          className="flower-bush-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cosmosPinkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="50%" stopColor="#F06292" />
              <stop offset="100%" stopColor="#F8BBD0" />
            </linearGradient>
            <linearGradient id="cosmosLightPink" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EC407A" />
              <stop offset="100%" stopColor="#FCE4EC" />
            </linearGradient>
          </defs>

          {/* Lớp bóng cỏ nền sẫm bên phải */}
          <path
            d="M 0 260 C 65 235 130 240 195 230 C 260 225 300 240 340 260 Z"
            fill="#1B4332"
            opacity="0.85"
          />

          {/* TỪNG NGỌN CỎ DÀI SẮC NÉT BÊN PHẢI */}
          <g className="grass-blades-group grass-sway-right">
            <path d="M 315 260 Q 298 180 270 125 Q 292 175 305 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 290 260 Q 268 170 235 110 Q 256 170 272 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 252 260 Q 230 185 195 130 Q 220 185 236 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 210 260 Q 182 180 145 135 Q 172 185 192 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 162 260 Q 135 190 98 145 Q 124 195 145 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 110 260 Q 82 200 50 160 Q 72 205 92 260 Z" fill="url(#grassBladeGrad1)" />

            {/* Cỏ tầng giữa */}
            <path d="M 325 260 Q 308 195 288 150 Q 305 195 315 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 272 260 Q 252 185 220 140 Q 242 190 256 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 230 260 Q 205 175 172 125 Q 192 180 214 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 188 260 Q 162 185 130 140 Q 150 190 172 260 Z" fill="url(#grassBladeGrad2)" />
            <path d="M 135 260 Q 108 195 76 155 Q 98 200 118 260 Z" fill="url(#grassBladeGrad1)" />
            <path d="M 76 260 Q 55 205 28 170 Q 48 210 65 260 Z" fill="url(#grassBladeGrad2)" />

            {/* Cỏ tiền cảnh vươn xanh non */}
            <path d="M 285 260 Q 262 210 248 175 Q 262 210 274 260 Z" fill="#74C69D" />
            <path d="M 220 260 Q 200 205 178 165 Q 194 205 210 260 Z" fill="#95D5B2" />
            <path d="M 168 260 Q 146 215 120 180 Q 140 215 156 260 Z" fill="#74C69D" />
            <path d="M 102 260 Q 82 210 60 175 Q 76 215 92 260 Z" fill="#95D5B2" />
          </g>

          {/* HOA DẠI ANIME BÊN PHẢI */}
          <g className="wildflowers-group">
            {/* HOA CÁNH BƯỚM HỒNG TÍM 1 (Cosmos Flower) */}
            <g className="flower-item flower-sway-1" transform="translate(245, 115)">
              <path d="M 0 145 Q 14 75 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 5 65 Q 22 56 20 45 Q 9 52 4 60 Z" fill="#52B788" />
              <path d="M -2 44 Q -16 35 -13 26 Q -4 33 -1 40 Z" fill="#74C69D" />
              <g transform="translate(0, 0)">
                <ellipse cx="0" cy="-15" rx="5.5" ry="10" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="11" cy="-11" rx="5.5" ry="10" transform="rotate(45, 11, -11)" fill="url(#cosmosLightPink)" />
                <ellipse cx="15" cy="0" rx="10" ry="5.5" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="11" cy="11" rx="5.5" ry="10" transform="rotate(-45, 11, 11)" fill="url(#cosmosLightPink)" />
                <ellipse cx="0" cy="15" rx="5.5" ry="10" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="-11" cy="11" rx="5.5" ry="10" transform="rotate(45, -11, 11)" fill="url(#cosmosLightPink)" />
                <ellipse cx="-15" cy="0" rx="10" ry="5.5" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="-11" cy="-11" rx="5.5" ry="10" transform="rotate(-45, -11, -11)" fill="url(#cosmosLightPink)" />
                <circle cx="0" cy="0" r="6.5" fill="#FFC107" />
                <circle cx="0" cy="0" r="4.5" fill="#FF8F00" />
                <circle cx="-1" cy="-1" r="1.6" fill="#FFF8E1" />
              </g>
            </g>

            {/* HOA CÚC DẠI TRẮNG (Daisy Flower) */}
            <g className="flower-item flower-sway-2" transform="translate(172, 130)">
              <path d="M 0 130 Q -16 65 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="2.8" strokeLinecap="round" />
              <g transform="translate(0, 0)">
                <ellipse cx="0" cy="-14" rx="4.5" ry="9" fill="url(#daisyPetalGrad)" />
                <ellipse cx="10" cy="-10" rx="4.5" ry="9" transform="rotate(45, 10, -10)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="14" cy="0" rx="9" ry="4.5" fill="url(#daisyPetalGrad)" />
                <ellipse cx="10" cy="10" rx="4.5" ry="9" transform="rotate(-45, 10, 10)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="0" cy="14" rx="4.5" ry="9" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-10" cy="10" rx="4.5" ry="9" transform="rotate(45, -10, 10)" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-14" cy="0" rx="9" ry="4.5" fill="url(#daisyPetalGrad)" />
                <ellipse cx="-10" cy="-10" rx="4.5" ry="9" transform="rotate(-45, -10, -10)" fill="url(#daisyPetalGrad)" />
                <circle cx="0" cy="0" r="6" fill="url(#flowerCenterYellow)" />
                <circle cx="-1.2" cy="-1.2" r="1.8" fill="#FFFDE7" />
              </g>
            </g>

            {/* HOA BỒ CÔNG ANH VÀNG RỰC */}
            <g className="flower-item flower-sway-3" transform="translate(105, 145)">
              <path d="M 0 115 Q 12 55 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="2.4" strokeLinecap="round" />
              <g transform="translate(0, 0)">
                <circle cx="0" cy="-8" r="5" fill="#FFCA28" />
                <circle cx="7" cy="-4" r="5" fill="#FFD54F" />
                <circle cx="7" cy="4" r="5" fill="#FFCA28" />
                <circle cx="0" cy="8" r="5" fill="#FFC107" />
                <circle cx="-7" cy="4" r="5" fill="#FFD54F" />
                <circle cx="-7" cy="-4" r="5" fill="#FFCA28" />
                <circle cx="0" cy="0" r="4.5" fill="#FFA000" />
                <circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFF9C4" />
              </g>
            </g>

            {/* BỤI HOA CÚC TÍM HỒNG NHỎ */}
            <g className="flower-item flower-sway-2" transform="translate(295, 155)">
              <path d="M 0 105 Q 9 50 0 0" fill="none" stroke="url(#stemGrad)" strokeWidth="2" strokeLinecap="round" />
              <g transform="translate(0, 0) scale(0.75)">
                <ellipse cx="0" cy="-13" rx="5" ry="8.5" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="9" cy="-9" rx="5" ry="8.5" transform="rotate(45, 9, -9)" fill="url(#cosmosLightPink)" />
                <ellipse cx="13" cy="0" rx="8.5" ry="5" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="9" cy="9" rx="5" ry="8.5" transform="rotate(-45, 9, 9)" fill="url(#cosmosLightPink)" />
                <ellipse cx="0" cy="13" rx="5" ry="8.5" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="-9" cy="9" rx="5" ry="8.5" transform="rotate(45, -9, 9)" fill="url(#cosmosLightPink)" />
                <ellipse cx="-13" cy="0" rx="8.5" ry="5" fill="url(#cosmosPinkGrad)" />
                <ellipse cx="-9" cy="-9" rx="5" ry="8.5" transform="rotate(-45, -9, -9)" fill="url(#cosmosLightPink)" />
                <circle cx="0" cy="0" r="5" fill="#FFC107" />
              </g>
            </g>

            {/* BÔNG CỎ LAU PHÍA SAU BÊN PHẢI */}
            <g className="flower-item flower-sway-1" transform="translate(55, 140)">
              <path d="M 0 120 Q -14 60 -6 0" fill="none" stroke="#74C69D" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="-7" cy="9" rx="4.2" ry="12" fill="#E8F5E9" opacity="0.9" transform="rotate(-15, -7, 9)" />
              <ellipse cx="-8" cy="22" rx="3.5" ry="10" fill="#C8E6C9" opacity="0.85" transform="rotate(-10, -8, 22)" />
              <ellipse cx="-4" cy="2" rx="3" ry="8" fill="#FFFFFF" opacity="0.95" transform="rotate(-20, -4, 2)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
