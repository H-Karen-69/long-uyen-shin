import React from 'react';

interface AnimeSakuraTreeProps {
  className?: string;
}

/**
 * Cổ thụ hoa anh đào phong cách Anime (Anime Ancient Sakura Tree)
 * - Gốc rễ cổ thụ bạnh to, các rễ chính bám chặt sườn đồi, rễ nhỏ/rễ tơ cắm sâu xuống đất cỏ
 * - Thân cây uốn lượn cổ kính với thớ vân vỏ cây, rãnh gỗ và rêu phong tự nhiên
 * - Tán hoa phân tầng bồng bềnh phong cách Makoto Shinkai / Ghibli với hoa 5 cánh nở rộ
 * - Hoạt cảnh cành nhánh và tán hoa đung đưa nhịp nhàng theo làn gió
 */
export const AnimeSakuraTree: React.FC<AnimeSakuraTreeProps> = ({ className = '' }) => {
  return (
    <div className={`anime-sakura-tree-wrapper ${className}`} aria-label="Cây hoa anh đào cổ thụ phong cách Anime">
      <svg
        className="anime-sakura-svg"
        viewBox="0 0 680 780"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shading thân gỗ cổ thụ */}
          <linearGradient id="sakuraTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#251512" />
            <stop offset="28%" stopColor="#3E241E" />
            <stop offset="65%" stopColor="#5A372E" />
            <stop offset="88%" stopColor="#73473B" />
            <stop offset="100%" stopColor="#8C5849" />
          </linearGradient>

          {/* Ánh sáng vỏ cây sườn phải */}
          <linearGradient id="barkHighlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5A372E" stopOpacity="0" />
            <stop offset="70%" stopColor="#8C5849" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B37562" stopOpacity="0.9" />
          </linearGradient>

          {/* Tán hoa anh đào - Cụm sâu (Bóng râm) */}
          <radialGradient id="canopyShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D96E8A" />
            <stop offset="65%" stopColor="#BF506E" />
            <stop offset="100%" stopColor="#9C354F" />
          </radialGradient>

          {/* Tán hoa anh đào - Cụm chính (Hồng thắm Anime) */}
          <radialGradient id="canopyMidtone" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFE0EB" />
            <stop offset="35%" stopColor="#FFB3C6" />
            <stop offset="75%" stopColor="#FA8EAA" />
            <stop offset="100%" stopColor="#E06B88" />
          </radialGradient>

          {/* Tán hoa anh đào - Cụm đón nắng (Highlight bông trắng hồng) */}
          <radialGradient id="canopyHighlight" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFEBF2" />
            <stop offset="80%" stopColor="#FFC2D4" />
            <stop offset="100%" stopColor="#FA9BB4" />
          </radialGradient>

          {/* Cánh hoa anh đào đơn lẻ */}
          <linearGradient id="sakuraPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF5F8" />
            <stop offset="55%" stopColor="#FFBCCD" />
            <stop offset="100%" stopColor="#F47D9C" />
          </linearGradient>

          {/* Thảm cỏ xanh dưới gốc */}
          <linearGradient id="mossyGroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7EBA94" />
            <stop offset="40%" stopColor="#559972" />
            <stop offset="85%" stopColor="#3C7755" />
            <stop offset="100%" stopColor="#2A593D" />
          </linearGradient>

          {/* Đóa hoa anh đào 5 cánh chuẩn anime */}
          <g id="sakuraFlowerDef">
            <path
              d="M0 0 C-4 -9 -9 -13 -7 -18 C-5 -21 0 -20 0 -17 C0 -20 5 -21 7 -18 C9 -13 4 -9 0 0Z"
              fill="url(#sakuraPetalGrad)"
            />
            <path
              d="M0 0 C-9 -4 -13 -9 -18 -7 C-21 -5 -20 0 -17 0 C-20 0 -21 5 -18 7 C-13 9 -9 4 0 0Z"
              fill="url(#sakuraPetalGrad)"
            />
            <path
              d="M0 0 C-9 4 -13 9 -18 7 C-21 5 -20 0 -17 0 C-20 0 -21 -5 -18 -7 C-13 -9 -9 -4 0 0Z"
              fill="url(#sakuraPetalGrad)"
              transform="rotate(144)"
            />
            <path
              d="M0 0 C-9 4 -13 9 -18 7 C-21 5 -20 0 -17 0 C-20 0 -21 -5 -18 -7 C-13 -9 -9 -4 0 0Z"
              fill="url(#sakuraPetalGrad)"
              transform="rotate(216)"
            />
            <path
              d="M0 0 C-9 4 -13 9 -18 7 C-21 5 -20 0 -17 0 C-20 0 -21 -5 -18 -7 C-13 -9 -9 -4 0 0Z"
              fill="url(#sakuraPetalGrad)"
              transform="rotate(288)"
            />
            {/* Nhụy hoa anh đào đỏ thắm và tia vàng */}
            <circle cx="0" cy="0" r="2.8" fill="#D6336C" />
            <circle cx="0" cy="0" r="1.4" fill="#FFE066" />
            <line x1="0" y1="0" x2="-2" y2="-4" stroke="#C2255C" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="3" y2="-3" stroke="#C2255C" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="4" y2="2" stroke="#C2255C" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-1" y2="4" stroke="#C2255C" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-3" y2="1" stroke="#C2255C" strokeWidth="0.7" />
          </g>

          {/* Đóa hoa nghiêng / bán nở */}
          <g id="sakuraHalfBloomDef">
            <ellipse cx="0" cy="0" rx="9" ry="6" fill="#FFAEC0" transform="rotate(-15)" />
            <ellipse cx="-2" cy="-2" rx="7" ry="5" fill="#FFE3EC" transform="rotate(-15)" />
            <circle cx="-1" cy="-1" r="2" fill="#E64980" />
          </g>
        </defs>

        {/* ===================================================================
            PHẦN 1: GỐC, ĐẤT ĐỒI RÊU PHONG VÀ HỆ THỐNG RỄ CỔ THỤ CẮM XUỐNG ĐẤT
            (Cố định vững chãi ở chân, không bị xoay nhấc theo thân)
            =================================================================== */}
        <g className="sakura-roots-ground">
          {/* Gò đồi đất cỏ ôm chân gốc */}
          <path
            d="M -30 780 L -30 705 Q 60 675 160 685 Q 260 695 380 725 Q 460 745 520 780 Z"
            fill="url(#mossyGroundGrad)"
          />
          {/* Vệt bóng râm dưới chân gốc rễ */}
          <ellipse cx="195" cy="735" rx="160" ry="25" fill="#1C3825" opacity="0.6" />

          {/* Các mảng rêu phong bám trên mặt đất */}
          <path
            d="M 50 710 Q 70 702 95 712 Q 80 722 50 710 Z
               M 230 715 Q 255 708 275 718 Q 260 728 230 715 Z
               M 320 735 Q 350 728 375 738 Q 350 750 320 735 Z"
            fill="#3B694B"
            opacity="0.8"
          />

          {/* ================= CÁC RỄ CHÍNH TO KHỎE BÁNH BẠNH ================= */}
          {/* Rễ chính bên trái vươn xa */}
          <path
            d="M 145 630 
               C 125 660, 95 685, 55 715 
               C 35 730, 10 742, -15 750 
               L -10 762 
               C 20 754, 50 740, 75 722 
               C 110 698, 140 675, 165 640 
               Z"
            fill="url(#sakuraTrunkGrad)"
          />
          {/* Rễ phụ bên trái cắm sâu */}
          <path
            d="M 120 665 
               C 100 695, 75 725, 45 745 
               L 52 752 
               C 85 730, 110 700, 132 672 
               Z"
            fill="url(#sakuraTrunkGrad)"
          />

          {/* Rễ chính giữa cắm thẳng vào lòng đất */}
          <path
            d="M 175 635 
               C 178 668, 172 702, 160 735 
               C 155 748, 150 758, 145 765 
               L 158 768 
               C 168 758, 175 745, 182 730 
               C 192 700, 195 668, 195 635 
               Z"
            fill="url(#sakuraTrunkGrad)"
          />

          {/* Rễ chính bên phải bò ngang rồi quặp xuống sườn đồi */}
          <path
            d="M 215 630 
               C 240 660, 275 685, 315 710 
               C 345 728, 380 742, 420 752 
               L 415 765 
               C 370 752, 335 736, 302 718 
               C 262 694, 230 668, 202 638 
               Z"
            fill="url(#sakuraTrunkGrad)"
          />

          {/* Rễ phụ bên phải */}
          <path
            d="M 235 650 
               C 260 678, 285 712, 298 745 
               L 308 742 
               C 295 710, 270 675, 248 645 
               Z"
            fill="url(#sakuraTrunkGrad)"
          />

          {/* ================= CÁC RỄ NHỎ CẮM XUỐNG ĐẤT (CỰC KỲ CHI TIẾT) ================= */}
          {/* Rễ nhỏ 1: tách từ rễ lớn bên trái cắm thẳng xuống đất */}
          <path
            d="M 68 705 Q 52 725 35 748 Q 28 758 20 766"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 45 732 Q 38 748 30 762"
            fill="none"
            stroke="#3B201A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Rễ nhỏ 2: rễ con cắm từ gốc trái */}
          <path
            d="M 98 692 Q 90 718 80 744 Q 75 756 68 768"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 85 726 Q 92 742 95 758"
            fill="none"
            stroke="#3B201A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Rễ nhỏ 3: rễ tơ ở gốc giữa */}
          <path
            d="M 138 708 Q 130 730 122 752 Q 118 762 112 770"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 126 738 Q 134 750 138 764"
            fill="none"
            stroke="#3B201A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Rễ nhỏ 4: rễ con cắm xiên giữa sang phải */}
          <path
            d="M 188 695 Q 200 722 212 748 Q 218 760 224 772"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 205 730 Q 198 748 194 765"
            fill="none"
            stroke="#3B201A"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Rễ nhỏ 5: rễ con cắm từ rễ phải */}
          <path
            d="M 270 690 Q 282 718 290 745 Q 295 758 300 770"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 284 728 Q 275 745 268 762"
            fill="none"
            stroke="#3B201A"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Rễ nhỏ 6: rễ tơ ngoằn ngoèo cắm bên sườn đồi phải */}
          <path
            d="M 335 715 Q 355 735 372 755 Q 380 764 388 772"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 358 740 Q 350 754 345 768"
            fill="none"
            stroke="#3B201A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Rễ nhỏ 7: rễ mút xa cùng */}
          <path
            d="M 385 735 Q 408 748 428 762"
            fill="none"
            stroke="#4A2A22"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Các mảng rêu phong ôm quanh gốc và trên các gờ rễ */}
          <path
            d="M 130 655 Q 145 645 160 658 Q 148 668 130 655 Z
               M 180 660 Q 200 650 215 662 Q 200 672 180 660 Z
               M 235 670 Q 255 660 270 672 Q 255 682 235 670 Z"
            fill="#5E8C4E"
            opacity="0.85"
          />

          {/* Các khóm cỏ xanh & hoa dại mọc quanh rễ */}
          <path
            d="M 25 740 L 22 725 L 28 738 L 32 722 L 35 742 
               M 85 735 L 82 718 L 88 732 L 94 720 L 96 738
               M 220 740 L 216 722 L 224 736 L 228 720 L 232 742
               M 310 740 L 308 724 L 314 736 L 318 722 L 322 742"
            stroke="#4F8F5E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Cánh hoa anh đào rơi nằm trên thảm cỏ và rễ cây */}
          <circle cx="70" cy="735" r="3.5" fill="#FFCCD7" />
          <circle cx="115" cy="748" r="3" fill="#FFAEC0" />
          <circle cx="195" cy="742" r="4" fill="#FFCCD7" />
          <circle cx="260" cy="730" r="3.2" fill="#FFAEC0" />
          <circle cx="340" cy="750" r="3.8" fill="#FFCCD7" />
        </g>

        {/* ===================================================================
            PHẦN 2: THÂN TRÊN, CÀNH NHÁNH & TÁN HOA ĐÀO (ĐUNG ĐƯA THEO GIÓ)
            Có animation swaying uốn lượn tự nhiên từ gốc lên ngọn
            =================================================================== */}
        <g className="sakura-swaying-canopy">
          {/* ================= THÂN CÂY CỔ THỤ CHÍNH ================= */}
          {/* Khối thân cây chính uốn hình chữ S oai vệ */}
          <path
            className="sakura-main-trunk"
            d="M 152 640 
               C 138 570, 125 505, 140 440 
               C 152 385, 180 345, 215 310 
               C 200 270, 205 220, 225 170 
               L 248 175 
               C 232 225, 228 268, 245 305 
               C 275 320, 310 338, 350 355 
               C 385 370, 420 380, 455 385 
               L 452 405 
               C 410 400, 370 388, 335 372 
               C 285 350, 245 365, 220 420 
               C 198 480, 210 560, 218 640 
               Z"
            fill="url(#sakuraTrunkGrad)"
            stroke="#20100C"
            strokeWidth="1.5"
          />

          {/* Vệt ánh sáng viền phải thân cây */}
          <path
            d="M 218 640 
               C 210 560, 198 480, 220 420 
               C 245 365, 285 350, 335 372 
               C 370 388, 410 400, 452 405 
               L 450 408 
               C 408 402, 368 390, 332 375 
               C 282 353, 242 368, 216 422 
               C 195 482, 206 562, 215 640 
               Z"
            fill="url(#barkHighlightGrad)"
          />

          {/* ================= CÁC RÃNH VÂN GỖ VỎ CÂY (BARK GROOVES) ================= */}
          <g className="bark-groove-lines" opacity="0.75">
            <path
              d="M 165 625 C 150 565, 142 510, 155 450 C 165 410, 185 375, 210 345"
              fill="none"
              stroke="#1F110E"
              strokeWidth="2.2"
            />
            <path
              d="M 180 630 C 172 570, 165 520, 178 465 C 188 425, 212 390, 235 365"
              fill="none"
              stroke="#1F110E"
              strokeWidth="1.8"
            />
            <path
              d="M 198 635 C 190 580, 185 530, 198 475 C 210 435, 240 398, 280 382"
              fill="none"
              stroke="#1F110E"
              strokeWidth="2"
            />
            {/* Mắt cây cổ thụ (Tree hollow/knot) */}
            <ellipse cx="178" cy="495" rx="9" ry="16" fill="#180C0A" />
            <path
              d="M 166 480 C 160 495, 162 512, 170 522 M 190 480 C 196 495, 194 512, 186 522"
              fill="none"
              stroke="#6B4135"
              strokeWidth="1.5"
            />
          </g>

          {/* ================= CÀNH LỚN & NHÁNH PHỤ (BRANCHES & TWIGS) ================= */}
          {/* Nhánh 1: Cành vươn sang trái rủ xuống */}
          <g className="branch-left-group">
            <path
              d="M 145 450 
                 C 115 445, 80 455, 45 480 
                 C 25 495, 8 518, -12 535 
                 L -15 525 
                 C 5 508, 20 485, 42 470 
                 C 75 445, 110 435, 140 438 
                 Z"
              fill="url(#sakuraTrunkGrad)"
            />
            {/* Cành con nhánh trái */}
            <path
              d="M 75 460 Q 55 435 30 425 M 48 475 Q 35 498 15 510 M 18 495 Q -5 490 -25 500"
              fill="none"
              stroke="#3E241E"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>

          {/* Nhánh 2: Cành vươn cao ngọn vòm */}
          <g className="branch-crown-group">
            <path
              d="M 225 250 
                 C 220 200, 230 150, 255 105 
                 C 265 88, 280 70, 298 52 
                 L 305 58 
                 C 288 75, 275 92, 265 110 
                 C 242 152, 235 200, 238 248 
                 Z"
              fill="url(#sakuraTrunkGrad)"
            />
            {/* Cành con vươn đỉnh */}
            <path
              d="M 245 160 Q 215 135 185 125 
                 M 260 115 Q 285 95 315 85 
                 M 235 180 Q 260 155 285 145
                 M 200 130 Q 175 110 160 85"
              fill="none"
              stroke="#3E241E"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Nhánh 3: Cành lớn vươn dài sang phải */}
          <g className="branch-right-group">
            <path
              d="M 335 365 
                 C 375 350, 420 330, 470 305 
                 C 515 282, 560 252, 605 215 
                 L 612 225 
                 C 565 262, 520 292, 475 315 
                 C 425 340, 380 360, 340 375 
                 Z"
              fill="url(#sakuraTrunkGrad)"
            />
            {/* Nhánh chạc phải rủ xuống */}
            <path
              d="M 430 325 
                 C 460 340, 490 365, 520 400 
                 C 540 425, 560 455, 575 490 
                 L 565 495 
                 C 550 460, 530 432, 512 408 
                 C 482 375, 452 352, 425 338 
                 Z"
              fill="url(#sakuraTrunkGrad)"
            />
            {/* Cành con nhánh phải */}
            <path
              d="M 460 310 Q 480 275 515 255 
                 M 520 278 Q 550 245 585 230 
                 M 480 355 Q 515 350 550 365
                 M 525 415 Q 560 420 590 440"
              fill="none"
              stroke="#3E241E"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* ===================================================================
              TÁN HOA ANH ĐÀO BỒNG BỀNH ANIME (LAYERED SAKURA CLUSTERS)
              Nhiều tầng: Bóng râm -> Thân hoa hồng tươi -> Bắt sáng mặt trời
              =================================================================== */}
          <g className="sakura-foliage-clusters">
            {/* ===== LỚP 1: BÓNG RÂM DƯỚI TÁN (SHADOW DEPTH) ===== */}
            <g className="foliage-shadow-layer" opacity="0.95">
              {/* Tán trái dưới */}
              <path
                d="M -35 520 C -45 470, 10 430, 55 450 C 95 470, 105 530, 65 560 C 25 590, -25 570, -35 520 Z"
                fill="url(#canopyShadow)"
              />
              {/* Tán giữa trung tâm */}
              <path
                d="M 120 380 C 100 320, 180 280, 240 300 C 300 320, 310 380, 260 420 C 210 450, 140 430, 120 380 Z"
                fill="url(#canopyShadow)"
              />
              {/* Tán vòm ngọn */}
              <path
                d="M 160 180 C 140 110, 240 60, 320 90 C 390 120, 390 190, 330 230 C 260 260, 180 240, 160 180 Z"
                fill="url(#canopyShadow)"
              />
              {/* Tán nhánh phải trên */}
              <path
                d="M 380 260 C 360 190, 460 150, 540 180 C 610 210, 620 280, 560 320 C 490 350, 400 320, 380 260 Z"
                fill="url(#canopyShadow)"
              />
              {/* Tán nhánh phải dưới rủ */}
              <path
                d="M 440 430 C 420 370, 510 330, 580 360 C 640 390, 650 460, 590 500 C 530 530, 460 490, 440 430 Z"
                fill="url(#canopyShadow)"
              />
            </g>

            {/* ===== LỚP 2: THÂN TÁN HOA HỒNG THẮM (ANIME MIDTONE BLOOMS) ===== */}
            <g className="foliage-mid-layer">
              {/* Cụm 1: Tán xòe góc trái */}
              <path
                className="leaf-puff p-left-1"
                d="M -40 500 C -50 440, 15 410, 65 435 C 110 460, 120 520, 75 550 C 30 575, -30 555, -40 500 Z"
                fill="url(#canopyMidtone)"
              />
              <path
                className="leaf-puff p-left-2"
                d="M 20 440 C 10 390, 70 360, 120 385 C 165 410, 170 465, 130 495 C 85 520, 30 490, 20 440 Z"
                fill="url(#canopyMidtone)"
              />

              {/* Cụm 2: Tán vòm ngọn trung tâm (Crown Blooming) */}
              <path
                className="leaf-puff p-crown-1"
                d="M 120 190 C 95 120, 190 65, 275 85 C 345 105, 360 170, 310 215 C 245 255, 150 245, 120 190 Z"
                fill="url(#canopyMidtone)"
              />
              <path
                className="leaf-puff p-crown-2"
                d="M 210 130 C 185 65, 280 25, 360 50 C 435 75, 445 140, 395 180 C 330 220, 240 195, 210 130 Z"
                fill="url(#canopyMidtone)"
              />
              <path
                className="leaf-puff p-crown-3"
                d="M 140 110 C 125 55, 200 15, 270 35 C 330 55, 340 110, 295 145 C 240 175, 160 160, 140 110 Z"
                fill="url(#canopyMidtone)"
              />

              {/* Cụm 3: Tán vươn sang phải (Skyward Right) */}
              <path
                className="leaf-puff p-right-1"
                d="M 340 220 C 315 155, 410 110, 490 135 C 565 160, 580 225, 525 265 C 455 305, 370 280, 340 220 Z"
                fill="url(#canopyMidtone)"
              />
              <path
                className="leaf-puff p-right-2"
                d="M 430 180 C 410 120, 495 80, 570 105 C 640 130, 655 190, 605 230 C 540 265, 455 240, 430 180 Z"
                fill="url(#canopyMidtone)"
              />
              <path
                className="leaf-puff p-right-3"
                d="M 480 250 C 460 195, 545 165, 615 190 C 675 215, 685 275, 635 310 C 570 345, 500 315, 480 250 Z"
                fill="url(#canopyMidtone)"
              />

              {/* Cụm 4: Tán rủ thấp bên phải */}
              <path
                className="leaf-puff p-hang-1"
                d="M 420 380 C 400 325, 485 290, 555 315 C 620 340, 630 405, 575 440 C 510 475, 440 440, 420 380 Z"
                fill="url(#canopyMidtone)"
              />
              <path
                className="leaf-puff p-hang-2"
                d="M 480 430 C 460 375, 540 345, 605 370 C 665 395, 670 455, 615 490 C 555 520, 495 490, 480 430 Z"
                fill="url(#canopyMidtone)"
              />
            </g>

            {/* ===== LỚP 3: CÁC KHỐI BẮT SÁNG ĐÓN NẮNG TRẮNG HỒNG (HIGHLIGHT SUNLIT PUFFS) ===== */}
            <g className="foliage-highlight-layer">
              <path
                className="leaf-puff-hi hi-crown-1"
                d="M 150 95 C 135 55, 195 25, 255 42 C 305 58, 312 100, 275 125 C 230 148, 165 135, 150 95 Z"
                fill="url(#canopyHighlight)"
              />
              <path
                className="leaf-puff-hi hi-crown-2"
                d="M 230 50 C 215 15, 285 -10, 345 8 C 398 25, 405 70, 365 95 C 315 120, 250 95, 230 50 Z"
                fill="url(#canopyHighlight)"
              />
              <path
                className="leaf-puff-hi hi-right-1"
                d="M 370 145 C 350 98, 425 65, 488 85 C 545 105, 555 150, 510 182 C 455 210, 390 190, 370 145 Z"
                fill="url(#canopyHighlight)"
              />
              <path
                className="leaf-puff-hi hi-right-2"
                d="M 460 110 C 445 70, 510 40, 568 58 C 618 75, 628 118, 588 145 C 538 170, 478 150, 460 110 Z"
                fill="url(#canopyHighlight)"
              />
              <path
                className="leaf-puff-hi hi-hang-1"
                d="M 445 315 C 430 275, 495 250, 550 270 C 598 290, 605 330, 565 355 C 518 380, 462 355, 445 315 Z"
                fill="url(#canopyHighlight)"
              />
              <path
                className="leaf-puff-hi hi-left-1"
                d="M 35 390 C 25 350, 75 328, 118 345 C 155 362, 160 400, 128 422 C 90 442, 45 428, 35 390 Z"
                fill="url(#canopyHighlight)"
              />
            </g>

            {/* ===== LỚP 4: CÁC ĐÓA HOA ANH ĐÀO 5 CÁNH CHI TIẾT ĐIỂM XUYẾT NỞ RỘ ===== */}
            <g className="sakura-detailed-florets">
              {/* Cụm vòm ngọn */}
              <use href="#sakuraFlowerDef" x="220" y="80" transform="scale(1.2)" />
              <use href="#sakuraFlowerDef" x="170" y="110" transform="scale(1.0) rotate(24, 170, 110)" />
              <use href="#sakuraFlowerDef" x="280" y="70" transform="scale(1.1) rotate(-18, 280, 70)" />
              <use href="#sakuraFlowerDef" x="330" y="100" transform="scale(1.3) rotate(45, 330, 100)" />
              <use href="#sakuraFlowerDef" x="250" y="140" transform="scale(1.15) rotate(12, 250, 140)" />
              <use href="#sakuraFlowerDef" x="190" y="170" transform="scale(0.95) rotate(-35, 190, 170)" />
              <use href="#sakuraFlowerDef" x="310" y="160" transform="scale(1.2) rotate(60, 310, 160)" />

              {/* Cụm vươn sang phải */}
              <use href="#sakuraFlowerDef" x="420" y="140" transform="scale(1.3) rotate(-15, 420, 140)" />
              <use href="#sakuraFlowerDef" x="470" y="105" transform="scale(1.1) rotate(32, 470, 105)" />
              <use href="#sakuraFlowerDef" x="520" y="145" transform="scale(1.25) rotate(-40, 520, 145)" />
              <use href="#sakuraFlowerDef" x="560" y="190" transform="scale(1.15) rotate(18, 560, 190)" />
              <use href="#sakuraFlowerDef" x="480" y="195" transform="scale(1.35) rotate(50, 480, 195)" />
              <use href="#sakuraFlowerDef" x="440" y="240" transform="scale(1.05) rotate(-22, 440, 240)" />
              <use href="#sakuraFlowerDef" x="590" y="240" transform="scale(1.2) rotate(75, 590, 240)" />
              <use href="#sakuraFlowerDef" x="625" y="280" transform="scale(1.0) rotate(-10, 625, 280)" />

              {/* Cụm rủ dưới bên phải */}
              <use href="#sakuraFlowerDef" x="510" y="320" transform="scale(1.2) rotate(28, 510, 320)" />
              <use href="#sakuraFlowerDef" x="560" y="355" transform="scale(1.3) rotate(-30, 560, 355)" />
              <use href="#sakuraFlowerDef" x="480" y="380" transform="scale(1.1) rotate(42, 480, 380)" />
              <use href="#sakuraFlowerDef" x="610" y="400" transform="scale(1.15) rotate(-15, 610, 400)" />
              <use href="#sakuraFlowerDef" x="540" y="440" transform="scale(1.25) rotate(65, 540, 440)" />
              <use href="#sakuraFlowerDef" x="585" y="465" transform="scale(0.95) rotate(-45, 585, 465)" />

              {/* Cụm bên trái */}
              <use href="#sakuraFlowerDef" x="80" y="410" transform="scale(1.25) rotate(15, 80, 410)" />
              <use href="#sakuraFlowerDef" x="125" y="445" transform="scale(1.1) rotate(-30, 125, 445)" />
              <use href="#sakuraFlowerDef" x="35" y="465" transform="scale(1.2) rotate(40, 35, 465)" />
              <use href="#sakuraFlowerDef" x="-5" y="510" transform="scale(1.05) rotate(-18, -5, 510)" />
              <use href="#sakuraFlowerDef" x="55" y="525" transform="scale(1.15) rotate(55, 55, 525)" />

              {/* Các đóa bán nở và nụ hoa điểm xuyết viền tán */}
              <use href="#sakuraHalfBloomDef" x="145" y="60" />
              <use href="#sakuraHalfBloomDef" x="355" y="45" />
              <use href="#sakuraHalfBloomDef" x="410" y="85" />
              <use href="#sakuraHalfBloomDef" x="590" y="140" />
              <use href="#sakuraHalfBloomDef" x="645" y="225" />
              <use href="#sakuraHalfBloomDef" x="640" y="350" />
              <use href="#sakuraHalfBloomDef" x="515" y="480" />
              <use href="#sakuraHalfBloomDef" x="145" y="375" />
              <use href="#sakuraHalfBloomDef" x="15" y="440" />
            </g>

            {/* ===== LỚP 5: CÁC CHÙM HOA ANH ĐÀO BUÔNG RỦ (HANGING SAKURA SPRAYS) ===== */}
            {/* Chùm rủ 1 bên trái */}
            <g className="sakura-dangle-item d-left-1">
              <path d="M 60 540 Q 55 570 48 595" stroke="#4A2A22" strokeWidth="1.2" fill="none" />
              <circle cx="56" cy="560" r="4.5" fill="#FFAEC0" />
              <circle cx="50" cy="580" r="5" fill="#FFCCD7" />
              <circle cx="48" cy="595" r="4" fill="#FFE3EC" />
            </g>
            {/* Chùm rủ 2 bên phải 1 */}
            <g className="sakura-dangle-item d-right-1">
              <path d="M 495 445 Q 490 480 482 510" stroke="#4A2A22" strokeWidth="1.2" fill="none" />
              <circle cx="493" cy="465" r="5" fill="#FFAEC0" />
              <circle cx="487" cy="490" r="5.5" fill="#FFCCD7" />
              <circle cx="482" cy="510" r="4.2" fill="#FFE3EC" />
            </g>
            {/* Chùm rủ 3 bên phải 2 */}
            <g className="sakura-dangle-item d-right-2">
              <path d="M 570 480 Q 575 515 572 540" stroke="#4A2A22" strokeWidth="1.2" fill="none" />
              <circle cx="572" cy="500" r="4.8" fill="#FFAEC0" />
              <circle cx="574" cy="522" r="5.2" fill="#FFCCD7" />
              <circle cx="572" cy="540" r="3.8" fill="#FFE3EC" />
            </g>
            {/* Chùm rủ 4 ở giữa vòm cành */}
            <g className="sakura-dangle-item d-mid-1">
              <path d="M 370 280 Q 365 315 358 335" stroke="#4A2A22" strokeWidth="1.2" fill="none" />
              <circle cx="368" cy="298" r="4.5" fill="#FFAEC0" />
              <circle cx="362" cy="318" r="5" fill="#FFCCD7" />
              <circle cx="358" cy="335" r="3.8" fill="#FFE3EC" />
            </g>

            {/* ===== LỚP 6: CÁNH HOA BAY TÁCH KHỎI CÀNH (FLOATING DRIFTING PETALS) ===== */}
            <g className="sakura-tree-floating-petals">
              <path
                className="floating-petal fp-1"
                d="M 320 180 Q 325 170 335 174 Q 340 185 330 188 Q 320 186 320 180 Z"
                fill="#FFB7C5"
              />
              <path
                className="floating-petal fp-2"
                d="M 450 160 Q 456 148 468 152 Q 472 165 460 168 Q 450 166 450 160 Z"
                fill="#FFCCD7"
              />
              <path
                className="floating-petal fp-3"
                d="M 540 220 Q 548 208 560 214 Q 564 226 552 230 Q 540 228 540 220 Z"
                fill="#FFAEC0"
              />
              <path
                className="floating-petal fp-4"
                d="M 610 320 Q 618 308 630 314 Q 634 326 622 330 Q 610 328 610 320 Z"
                fill="#FFB7C5"
              />
              <path
                className="floating-petal fp-5"
                d="M 480 340 Q 488 328 500 334 Q 504 346 492 350 Q 480 348 480 340 Z"
                fill="#FFE3EC"
              />
              <path
                className="floating-petal fp-6"
                d="M 110 470 Q 118 458 130 464 Q 134 476 122 480 Q 110 478 110 470 Z"
                fill="#FFCCD7"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
