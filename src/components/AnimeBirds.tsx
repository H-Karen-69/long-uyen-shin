import React from 'react';

/**
 * Đàn chim phong cách Anime (Anime Birds in Flight)
 * Các chú chim bay từ xa tới (Fly in, scale up), lượn chao cánh tự nhiên,
 * rồi bay vút đi xa khuất chân trời (Fly away, scale down).
 * Đôi cánh đập nhịp nhàng theo chuyển động khí động học mềm mại.
 */
export const AnimeBirds: React.FC = () => {
  return (
    <div className="anime-birds-sky-container" aria-hidden="true">
      {/* =================================================================
          ĐÀN CHIM 1: Bay từ góc phải xa xăm tới gần trung tâm rồi bay đi về bên trái
          ================================================================= */}
      <div className="bird-flight-path flight-path-1">
        {/* Chim đầu đàn */}
        <div className="anime-bird-wrapper bird-lead">
          <svg className="anime-bird-svg" viewBox="0 0 60 40">
            {/* Thân & Đầu chim */}
            <path className="bird-body" d="M 27 22 Q 30 18 36 17 Q 42 16 46 20 Q 48 21 44 23 Q 36 24 29 27 Z" fill="#3D4E6B" />
            <path className="bird-tail" d="M 23 29 L 29 27 L 27 33 Z" fill="#2E3B52" />
            <ellipse cx="44" cy="19.5" rx="1" ry="1" fill="#FFFFFF" opacity="0.8" />
            {/* Cánh trái (Đập cánh) */}
            <g className="wing-flap-left">
              <path d="M 33 19 C 28 8 18 2 8 4 C 15 12 25 18 31 22 Z" fill="#4B5E80" />
              <path d="M 18 8 C 12 5 8 4 6 5 C 10 9 16 13 22 17 Z" fill="#5F759E" opacity="0.6" />
            </g>
            {/* Cánh phải (Đập cánh phía sau) */}
            <g className="wing-flap-right">
              <path d="M 36 18 C 34 9 27 3 20 2 C 24 10 31 16 34 20 Z" fill="#364560" />
            </g>
          </svg>
        </div>

        {/* Chim bay kèm số 2 */}
        <div className="anime-bird-wrapper bird-companion-1">
          <svg className="anime-bird-svg" viewBox="0 0 60 40">
            <path className="bird-body" d="M 27 22 Q 30 18 36 17 Q 42 16 46 20 Q 48 21 44 23 Q 36 24 29 27 Z" fill="#485B7C" />
            <path className="bird-tail" d="M 23 29 L 29 27 L 27 33 Z" fill="#35445E" />
            <g className="wing-flap-left">
              <path d="M 33 19 C 28 8 18 2 8 4 C 15 12 25 18 31 22 Z" fill="#5A6F94" />
            </g>
            <g className="wing-flap-right">
              <path d="M 36 18 C 34 9 27 3 20 2 C 24 10 31 16 34 20 Z" fill="#3E4F6D" />
            </g>
          </svg>
        </div>

        {/* Chim bay kèm số 3 */}
        <div className="anime-bird-wrapper bird-companion-2">
          <svg className="anime-bird-svg" viewBox="0 0 60 40">
            <path className="bird-body" d="M 27 22 Q 30 18 36 17 Q 42 16 46 20 Q 48 21 44 23 Q 36 24 29 27 Z" fill="#52668A" />
            <path className="bird-tail" d="M 23 29 L 29 27 L 27 33 Z" fill="#3E4F6D" />
            <g className="wing-flap-left">
              <path d="M 33 19 C 28 8 18 2 8 4 C 15 12 25 18 31 22 Z" fill="#657DA6" />
            </g>
            <g className="wing-flap-right">
              <path d="M 36 18 C 34 9 27 3 20 2 C 24 10 31 16 34 20 Z" fill="#46587A" />
            </g>
          </svg>
        </div>

        {/* Chim bay theo sau nhỏ ở xa */}
        <div className="anime-bird-wrapper bird-trailing">
          <svg className="anime-bird-svg" viewBox="0 0 60 40">
            <path className="bird-body" d="M 27 22 Q 30 18 36 17 Q 42 16 46 20 Q 48 21 44 23 Q 36 24 29 27 Z" fill="#5F759E" />
            <g className="wing-flap-left">
              <path d="M 33 19 C 28 8 18 2 8 4 C 15 12 25 18 31 22 Z" fill="#728BB8" />
            </g>
            <g className="wing-flap-right">
              <path d="M 36 18 C 34 9 27 3 20 2 C 24 10 31 16 34 20 Z" fill="#52668A" />
            </g>
          </svg>
        </div>
      </div>

      {/* =================================================================
          ĐÀN CHIM 2: Đôi bạch điệp/bạch yến trắng tiên cảnh
          Bay tới từ góc cao phía trái lượn qua trên vòm hoa anh đào rồi bay đi
          ================================================================= */}
      <div className="bird-flight-path flight-path-2">
        {/* Bạch yến 1 */}
        <div className="anime-bird-wrapper white-bird-1">
          <svg className="anime-bird-svg" viewBox="0 0 64 44">
            {/* Thân chim trắng ánh ngọc */}
            <path d="M 28 24 Q 34 19 40 18 Q 48 17 52 21 Q 53 23 48 25 Q 38 27 30 30 Z" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(100,120,160,0.25))" />
            <path d="M 22 34 L 30 30 L 26 37 Z" fill="#E8EEF7" />
            {/* Điểm nhấn mỏ và mắt chim */}
            <path d="M 52 21 L 56 22 L 51 23 Z" fill="#E6A15C" />
            <circle cx="48" cy="20" r="1.2" fill="#2C3E50" />
            {/* Đôi cánh vút nhọn thanh thoát */}
            <g className="wing-flap-left-white">
              <path d="M 36 20 C 30 7 19 1 6 2 C 14 11 26 19 33 24 Z" fill="#FFFFFF" />
              <path d="M 18 7 C 12 3 8 2 6 2 C 10 7 18 12 25 18 Z" fill="#F0F4FA" opacity="0.9" />
              {/* Vệt lông vũ cánh */}
              <path d="M 12 4 L 16 11 M 17 6 L 22 14 M 23 9 L 28 17" stroke="#DDE7F3" strokeWidth="0.8" strokeLinecap="round" />
            </g>
            <g className="wing-flap-right-white">
              <path d="M 39 19 C 36 9 28 3 19 2 C 24 10 32 17 37 22 Z" fill="#E8F0F8" />
            </g>
          </svg>
        </div>

        {/* Bạch yến 2 (Bay kèm cùng nhau) */}
        <div className="anime-bird-wrapper white-bird-2">
          <svg className="anime-bird-svg" viewBox="0 0 64 44">
            <path d="M 28 24 Q 34 19 40 18 Q 48 17 52 21 Q 53 23 48 25 Q 38 27 30 30 Z" fill="#F8FAFD" />
            <path d="M 22 34 L 30 30 L 26 37 Z" fill="#DFE8F3" />
            <path d="M 52 21 L 56 22 L 51 23 Z" fill="#E6A15C" />
            <circle cx="48" cy="20" r="1.1" fill="#2C3E50" />
            <g className="wing-flap-left-white">
              <path d="M 36 20 C 30 7 19 1 6 2 C 14 11 26 19 33 24 Z" fill="#FFFFFF" />
              <path d="M 18 7 C 12 3 8 2 6 2 C 10 7 18 12 25 18 Z" fill="#EBF1F8" />
            </g>
            <g className="wing-flap-right-white">
              <path d="M 39 19 C 36 9 28 3 19 2 C 24 10 32 17 37 22 Z" fill="#DDE7F3" />
            </g>
          </svg>
        </div>
      </div>

      {/* =================================================================
          ĐÀN CHIM 3: Đàn én mùa xuân bay lượn từ xa xăm vút qua vầng mặt trời
          Tạo chiều sâu cho không gian tiên cảnh
          ================================================================= */}
      <div className="bird-flight-path flight-path-3">
        <div className="anime-bird-wrapper distant-bird-1">
          <svg className="anime-bird-svg" viewBox="0 0 50 30">
            <path d="M 20 16 Q 26 13 32 14 Q 35 15 31 17 Q 24 19 18 22 Z" fill="#4B5E80" />
            <g className="wing-flap-left">
              <path d="M 24 14 C 19 6 12 1 4 2 C 10 8 18 13 22 17 Z" fill="#5F759E" />
            </g>
            <g className="wing-flap-right">
              <path d="M 26 13 C 24 7 19 2 13 1 C 16 7 22 12 25 15 Z" fill="#3D4E6B" />
            </g>
          </svg>
        </div>

        <div className="anime-bird-wrapper distant-bird-2">
          <svg className="anime-bird-svg" viewBox="0 0 50 30">
            <path d="M 20 16 Q 26 13 32 14 Q 35 15 31 17 Q 24 19 18 22 Z" fill="#52668A" />
            <g className="wing-flap-left">
              <path d="M 24 14 C 19 6 12 1 4 2 C 10 8 18 13 22 17 Z" fill="#6880A8" />
            </g>
            <g className="wing-flap-right">
              <path d="M 26 13 C 24 7 19 2 13 1 C 16 7 22 12 25 15 Z" fill="#425473" />
            </g>
          </svg>
        </div>

        <div className="anime-bird-wrapper distant-bird-3">
          <svg className="anime-bird-svg" viewBox="0 0 50 30">
            <path d="M 20 16 Q 26 13 32 14 Q 35 15 31 17 Q 24 19 18 22 Z" fill="#5A6F94" />
            <g className="wing-flap-left">
              <path d="M 24 14 C 19 6 12 1 4 2 C 10 8 18 13 22 17 Z" fill="#718BB3" />
            </g>
            <g className="wing-flap-right">
              <path d="M 26 13 C 24 7 19 2 13 1 C 16 7 22 12 25 15 Z" fill="#4B5E80" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
