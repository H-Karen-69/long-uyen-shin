import React from 'react';

/**
 * Biển Mây Tiên Cảnh Anime (Anime Celestial Sea of Clouds)
 * - Đa tầng mây bồng bềnh cuộn trôi phong cách Ghibli / Makoto Shinkai:
 *   1. Dãy mây xa đón ánh nắng ban mai ửng hồng và sắc lam thiên thanh
 *   2. Biển mây tầng giữa với các khối mây tích (cumulus) cuồn cuộn, viền sáng vàng kim
 *   3. Tầng mây bồng bềnh tiền cảnh ôm ấp chân trời, tạo cảm giác lơ lửng trên chín tầng mây
 *   4. Các cụm mây tiên lướt nhẹ mềm mại đón gió
 */
export const AnimeCloudSea: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`anime-cloud-sea-container ${className}`} aria-hidden="true">
      <svg
        className="anime-cloud-sea-svg"
        viewBox="0 0 1440 460"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Tầng mây xa 1: Hồng đào phớt - vàng dịu - lam nhạt thiên thanh */}
          <linearGradient id="farCloudGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FFF1F6" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E5F0FC" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#CFE3F8" stopOpacity="0.98" />
          </linearGradient>

          {/* Tầng mây giữa 2: Trắng ngọc tinh khôi với bóng mây lam êm dịu */}
          <linearGradient id="midCloudGrad" x1="40%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FAF4F8" />
            <stop offset="70%" stopColor="#E2EDF9" />
            <stop offset="100%" stopColor="#CBE0F5" />
          </linearGradient>

          {/* Tầng mây trước 3: Trắng xốp bồng bềnh, khối mây cuồn cuộn dày dặn */}
          <linearGradient id="nearCloudGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFF7FB" />
            <stop offset="65%" stopColor="#EBF3FD" />
            <stop offset="100%" stopColor="#D9E8F8" />
          </linearGradient>

          {/* Viền sáng vàng kim / ánh dương phản chiếu trên đỉnh mây (Silver & Gold Sunlit Rim) */}
          <linearGradient id="cloudSunlitRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FFF8E7" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFEBF2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>

          {/* Ánh dương ấm áp rọi nhẹ trên biển mây */}
          <radialGradient id="cloudSunGlow" cx="65%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#FFEBF0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E2EDF9" stopOpacity="0" />
          </radialGradient>

          {/* Bóng đổ mây mềm mại */}
          <filter id="cloudSoftShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#8CA8C9" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* ===================================================================
            TẦNG 1: DÃY MÂY XA (FAR CLOUD HORIZON)
            Các cụm mây tích tầng cao nhấp nhô nhẹ nhàng ở chân trời
            =================================================================== */}
        <g className="cloud-layer-far" opacity="0.95">
          <path
            d="M -100 460 
               L -100 240 
               C -60 210, -20 205, 30 220 
               C 80 190, 150 185, 210 210 
               C 280 170, 370 165, 450 200 
               C 520 160, 620 155, 700 185 
               C 780 145, 890 150, 970 180 
               C 1050 150, 1140 155, 1220 185 
               C 1290 165, 1370 175, 1440 210 
               C 1490 195, 1540 205, 1580 230 
               L 1580 460 Z"
            fill="url(#farCloudGrad)"
          />
          {/* Viền sáng mờ trên đỉnh mây xa */}
          <path
            d="M -100 240 
               C -60 210, -20 205, 30 220 
               C 80 190, 150 185, 210 210 
               C 280 170, 370 165, 450 200 
               C 520 160, 620 155, 700 185 
               C 780 145, 890 150, 970 180 
               C 1050 150, 1140 155, 1220 185 
               C 1290 165, 1370 175, 1440 210 
               C 1490 195, 1540 205, 1580 230"
            stroke="url(#cloudSunlitRim)"
            strokeWidth="3"
            strokeOpacity="0.75"
            fill="none"
          />
        </g>

        {/* ===================================================================
            TẦNG 2: BIỂN MÂY TẦNG GIỮA (MID CLOUD SEA & ROLLING BILLOWS)
            Khối mây dày dặn, đường cong bồng bềnh cuộn trôi phong cách anime
            =================================================================== */}
        <g className="cloud-layer-mid" filter="url(#cloudSoftShadow)">
          <path
            d="M -80 460 
               L -80 280 
               C -30 250, 30 230, 90 260 
               C 150 220, 240 210, 320 245 
               C 390 215, 480 200, 560 235 
               C 630 195, 730 190, 810 225 
               C 890 185, 1000 180, 1090 215 
               C 1170 190, 1260 200, 1330 235 
               C 1400 215, 1480 230, 1540 265 
               L 1540 460 Z"
            fill="url(#midCloudGrad)"
          />

          {/* Vùng đón ánh nắng vàng ấm trên tầng mây giữa */}
          <path
            d="M 400 460 
               L 400 240 
               C 500 200, 620 190, 720 220 
               C 810 180, 930 185, 1030 215 
               C 1120 190, 1220 205, 1300 235 
               L 1300 460 Z"
            fill="url(#cloudSunGlow)"
          />

          {/* Viền phát quang lấp lánh trên đỉnh các múi mây */}
          <path
            d="M -80 280 
               C -30 250, 30 230, 90 260 
               C 150 220, 240 210, 320 245 
               C 390 215, 480 200, 560 235 
               C 630 195, 730 190, 810 225 
               C 890 185, 1000 180, 1090 215 
               C 1170 190, 1260 200, 1330 235 
               C 1400 215, 1480 230, 1540 265"
            stroke="url(#cloudSunlitRim)"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Các nếp cuộn mây mềm mại bên trong (Internal Cumulus Arcs) */}
          <path
            d="M 120 265 C 180 245, 250 255, 290 285
               M 410 245 C 470 230, 530 240, 570 270
               M 670 230 C 740 215, 800 225, 840 255
               M 940 220 C 1010 205, 1070 215, 1110 248
               M 1210 238 C 1270 225, 1320 235, 1360 265"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ===================================================================
            TẦNG 3: BIỂN MÂY BỒNG BỀNH TIỀN CẢNH (NEAR CLOUD BILLOWS)
            Mây cuộn lớn, bềnh bồng, trắng xốp tinh khôi đỡ lấy cổng trời
            =================================================================== */}
        <g className="cloud-layer-near" filter="url(#cloudSoftShadow)">
          <path
            d="M -50 460 
               L -50 340 
               C 10 300, 80 290, 150 320 
               C 220 270, 320 260, 410 295 
               C 490 260, 590 255, 680 290 
               C 760 250, 870 250, 960 285 
               C 1050 255, 1150 265, 1240 300 
               C 1310 280, 1390 290, 1450 325 
               C 1490 310, 1530 325, 1560 345 
               L 1560 460 Z"
            fill="url(#nearCloudGrad)"
          />

          {/* Viền sáng nổi bật nhất ở tầng mây trước */}
          <path
            d="M -50 340 
               C 10 300, 80 290, 150 320 
               C 220 270, 320 260, 410 295 
               C 490 260, 590 255, 680 290 
               C 760 250, 870 250, 960 285 
               C 1050 255, 1150 265, 1240 300 
               C 1310 280, 1390 290, 1450 325 
               C 1490 310, 1530 325, 1560 345"
            stroke="#FFFFFF"
            strokeWidth="4"
            fill="none"
          />

          {/* Chi tiết các múi mây phồng xốp đan xen (Fluffy Puffs) */}
          <g opacity="0.85">
            <ellipse cx="280" cy="335" rx="75" ry="32" fill="#FFFFFF" />
            <ellipse cx="540" cy="325" rx="85" ry="35" fill="#FFFFFF" />
            <ellipse cx="820" cy="315" rx="90" ry="38" fill="#FFFFFF" />
            <ellipse cx="1100" cy="330" rx="80" ry="34" fill="#FFFFFF" />
            <ellipse cx="1360" cy="350" rx="70" ry="30" fill="#FFFFFF" />

            {/* Bóng đổ êm ái phía dưới múi mây */}
            <path
              d="M 215 345 Q 280 375 345 345"
              stroke="#D3E4F6"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M 465 338 Q 540 368 615 338"
              stroke="#D3E4F6"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M 740 330 Q 820 360 900 330"
              stroke="#D3E4F6"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M 1030 342 Q 1100 372 1170 342"
              stroke="#D3E4F6"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
          </g>
        </g>

        {/* ===================================================================
            TẦNG 4: CÁC CỤM MÂY TIÊN BAY LƯỚT KHẼ (DRIFTING CLOUD PUFFS)
            Điểm xuyết những cuộn mây nhỏ lướt bay êm ả ngay trên biển mây
            =================================================================== */}
        <g className="drifting-cloud-puffs" opacity="0.88">
          {/* Cụm mây nhỏ lướt bên trái */}
          <g className="puff-item puff-left">
            <ellipse cx="180" cy="190" rx="42" ry="18" fill="#FFFFFF" />
            <ellipse cx="165" cy="184" rx="26" ry="15" fill="#FFF2F7" />
            <ellipse cx="198" cy="186" rx="24" ry="14" fill="#FFFFFF" />
          </g>

          {/* Cụm mây nhỏ lướt khu vực trung tâm đón nắng */}
          <g className="puff-item puff-center">
            <ellipse cx="680" cy="150" rx="55" ry="20" fill="#FFFFFF" />
            <ellipse cx="660" cy="144" rx="32" ry="16" fill="#FFF9E6" opacity="0.9" />
            <ellipse cx="705" cy="146" rx="30" ry="15" fill="#FFFFFF" />
          </g>

          {/* Cụm mây nhỏ lướt bên phải */}
          <g className="puff-item puff-right">
            <ellipse cx="1180" cy="170" rx="48" ry="19" fill="#FFFFFF" />
            <ellipse cx="1160" cy="164" rx="28" ry="15" fill="#FFF0F5" />
            <ellipse cx="1202" cy="166" rx="26" ry="14" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
};
export default AnimeCloudSea;
