import React, { useMemo } from 'react';

type CreatureType =
  | 'crane' // Tiên hạc Á Đông (sải cánh rộng kiêu hãnh)
  | 'swallow' // Chim én (đuôi én xẻ đôi lướt nhanh)
  | 'songbird' // Chim khuyên lục ngọc (nhỏ nhắn nhấp nhô)
  | 'ink_bird' // Nhạn thủy mặc xa xăm
  | 'pink_butterfly' // Bướm hồ điệp hồng phấn
  | 'jade_butterfly' // Bướm lam ngọc bích
  | 'gold_butterfly' // Bướm hoàng kim swallowtail
  | 'violet_butterfly'; // Bướm tử la lan tím biếc

interface CreatureFlightConfig {
  id: string;
  type: CreatureType;
  direction: 'left-to-right' | 'right-to-left';
  top: number; // percentage from top (5% to 85%)
  duration: number; // flight across screen in seconds
  delay: number; // initial delay before starting
  scale: number; // visual scale
  opacity: number; // subtle blending
  waveHeight: number; // vertical sinusoidal amplitude
  waveSpeed: number; // seconds per wave cycle
  flapSpeed: number; // seconds per wing flap cycle
}

interface FlockMember {
  offsetX: number;
  offsetY: number;
  scale: number;
  flapOffset: number;
}

interface BirdFlockConfig {
  id: string;
  type: 'crane' | 'swallow' | 'songbird' | 'ink_bird';
  direction: 'left-to-right' | 'right-to-left';
  top: number;
  duration: number;
  delay: number;
  opacity: number;
  waveSpeed: number;
  flapSpeed: number;
  members: FlockMember[];
}

export default function NatureSkyCreatures() {
  // Cấu hình đàn chim thanh thoát, số lượng tối giản để siêu mượt và không lag
  const flocks = useMemo<BirdFlockConfig[]>(() => {
    return [
      // 1. Đàn Tiên Hạc trắng 3 con bay hình chữ V thanh nhã (Trái sang Phải)
      {
        id: 'crane-flock-1',
        type: 'crane',
        direction: 'left-to-right',
        top: 9,
        duration: 32,
        delay: -8,
        opacity: 0.85,
        waveSpeed: 5.5,
        flapSpeed: 0.95,
        members: [
          { offsetX: 0, offsetY: 0, scale: 0.95, flapOffset: 0 },
          { offsetX: -38, offsetY: -20, scale: 0.86, flapOffset: 0.18 },
          { offsetX: -36, offsetY: 20, scale: 0.86, flapOffset: 0.14 },
        ],
      },
      // 2. Cặp chim khuyên lục ngọc 2 con ríu rít tầng trung (Phải sang Trái)
      {
        id: 'songbird-flock-1',
        type: 'songbird',
        direction: 'right-to-left',
        top: 38,
        duration: 24,
        delay: -12,
        opacity: 0.8,
        waveSpeed: 3.2,
        flapSpeed: 0.28,
        members: [
          { offsetX: 0, offsetY: 0, scale: 0.82, flapOffset: 0 },
          { offsetX: 24, offsetY: 14, scale: 0.74, flapOffset: 0.14 },
        ],
      },
    ];
  }, []);

  // Cấu hình chim và bướm đơn lẻ bay dạo cảnh - tinh gọn, không gây rối mắt hay lag
  const creatures = useMemo<CreatureFlightConfig[]>(() => {
    return [
      // 1. Tiên hạc trắng bay cao thong dong (Trái sang Phải)
      {
        id: 'crane-1',
        type: 'crane',
        direction: 'left-to-right',
        top: 15,
        duration: 28,
        delay: -3,
        scale: 0.95,
        opacity: 0.8,
        waveHeight: 16,
        waveSpeed: 5.2,
        flapSpeed: 0.92,
      },
      // 2. Bướm hồng phấn dạo chơi tầng trung (Trái sang Phải)
      {
        id: 'pink-bf-1',
        type: 'pink_butterfly',
        direction: 'left-to-right',
        top: 30,
        duration: 22,
        delay: -14,
        scale: 0.9,
        opacity: 0.85,
        waveHeight: 24,
        waveSpeed: 3.4,
        flapSpeed: 0.3,
      },
      // 3. Chim khuyên lục ngọc đơn lẻ (Phải sang Trái)
      {
        id: 'songbird-1',
        type: 'songbird',
        direction: 'right-to-left',
        top: 50,
        duration: 20,
        delay: -7,
        scale: 0.8,
        opacity: 0.82,
        waveHeight: 22,
        waveSpeed: 2.8,
        flapSpeed: 0.26,
      },
      // 4. Bướm hoàng kim swallowtail tầng dưới (Phải sang Trái)
      {
        id: 'gold-bf-1',
        type: 'gold_butterfly',
        direction: 'right-to-left',
        top: 65,
        duration: 25,
        delay: -18,
        scale: 0.92,
        opacity: 0.85,
        waveHeight: 26,
        waveSpeed: 3.8,
        flapSpeed: 0.32,
      },
    ];
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Các đàn chim bay theo bầy / đội hình */}
      {flocks.map((f) => (
        <BirdFlockFlightItem key={f.id} config={f} />
      ))}

      {/* Các cánh chim và bướm đơn lẻ bay dạo cảnh */}
      {creatures.map((c) => (
        <CreatureFlightItem key={c.id} config={c} />
      ))}
    </div>
  );
}

/**
 * Một đàn chim (Flock) bay cùng nhau theo đội hình hoặc theo bầy
 */
function BirdFlockFlightItem({ config }: { config: BirdFlockConfig }) {
  const isL2R = config.direction === 'left-to-right';

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${config.top}%`,
        left: 0,
        width: '100%',
        transform: isL2R ? 'translateX(-50vw)' : 'translateX(140vw)',
        opacity: 0,
        animation: `${isL2R ? 'skyFlockL2R' : 'skyFlockR2L'} ${config.duration}s linear infinite both`,
        animationDelay: `${config.delay}s`,
        willChange: 'transform',
      }}
    >
      {/* Container lượn sóng dọc chung của cả đàn */}
      <div
        className="relative"
        style={{
          animation: `skyVerticalBob ${config.waveSpeed}s ease-in-out infinite alternate`,
          opacity: config.opacity,
        }}
      >
        {config.members.map((m, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              transform: `translate(${m.offsetX}px, ${m.offsetY}px) scale(${m.scale})`,
            }}
          >
            {renderCreatureSVG(
              config.type,
              Math.max(0.2, config.flapSpeed + (m.flapOffset - 0.1) * 0.2),
              isL2R
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Một sinh vật bay trên bầu trời (chim hoặc bướm) với chuyển động ngang + lượn sóng + đập cánh
 */
function CreatureFlightItem({ config }: { config: CreatureFlightConfig }) {
  const isL2R = config.direction === 'left-to-right';

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${config.top}%`,
        left: 0,
        width: '100%',
        transform: isL2R ? 'translateX(-30vw)' : 'translateX(130vw)',
        opacity: 0,
        animation: `${isL2R ? 'skyFlightL2R' : 'skyFlightR2L'} ${config.duration}s linear infinite both`,
        animationDelay: `${config.delay}s`,
        willChange: 'transform',
      }}
    >
      {/* Container lượn sóng dọc (Sinusoidal Wave) */}
      <div
        style={{
          animation: `skyVerticalBob ${config.waveSpeed}s ease-in-out infinite alternate`,
          transform: `scale(${config.scale})`,
          opacity: config.opacity,
        }}
      >
        {/* Render đúng SVG và chuyển động đập cánh của từng loại */}
        {renderCreatureSVG(config.type, config.flapSpeed, isL2R)}
      </div>
    </div>
  );
}

/**
 * Vẽ vector SVG sắc nét, đậm chất Á Đông cho từng loại chim và bướm
 */
function renderCreatureSVG(type: CreatureType, flapSpeed: number, isL2R: boolean) {
  // Lật chiều sinh vật theo hướng bay để đầu luôn hướng về phía trước
  const faceTransform = isL2R ? '' : 'scale(-1, 1)';

  switch (type) {
    case 'crane':
      // Tiên hạc Á Đông (Sacred Crane): mỏ dài, cổ cong duyên dáng, thân trắng tuyết, viền cánh huyền hắc, chỏm đầu đỏ son
      return (
        <div
          className="relative w-16 h-12 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 70 50" className="w-full h-full overflow-visible">
            {/* Đôi cánh vỗ nhịp nhàng */}
            <g
              style={{
                transformOrigin: '28px 24px',
                animation: `craneWingFlap ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              {/* Cánh trên */}
              <path
                d="M 28 24 Q 20 6, 8 2 Q 18 14, 24 22 Z"
                fill="#FFFFFF"
                stroke="#D8DEE8"
                strokeWidth="0.8"
              />
              {/* Viền lông đen huyền hạc tiên */}
              <path
                d="M 8 2 Q 14 8, 20 16 L 24 22 L 20 14 Z"
                fill="#424B5C"
              />
            </g>

            {/* Thân hạc thon dài */}
            <path
              d="M 16 28 Q 28 22, 38 24 Q 48 26, 56 22 L 64 22 Q 54 28, 40 30 Q 24 32, 16 28 Z"
              fill="#FFFFFF"
              stroke="#D8DEE8"
              strokeWidth="0.8"
            />

            {/* Chân hạc duỗi thẳng về sau */}
            <path
              d="M 18 28 L 2 33 M 17 29 L 4 36"
              stroke="#6B788E"
              strokeWidth="0.9"
              strokeLinecap="round"
            />

            {/* Cổ và mỏ thanh thoát */}
            <path
              d="M 52 23 Q 58 20, 62 17 L 69 16.5 L 61 19 Z"
              fill="#FFFFFF"
            />
            {/* Mỏ vàng ngà */}
            <path d="M 62 17 L 70 16.5 L 62 18 Z" fill="#DEB16A" />
            {/* Chỏm đầu đỏ son đặc trưng của Đan Đỉnh Hạc */}
            <circle cx="58" cy="17" r="1.5" fill="#E84A5F" />

            {/* Cánh dưới vỗ đối xứng nhẹ */}
            <g
              style={{
                transformOrigin: '32px 28px',
                animation: `craneWingFlap ${flapSpeed}s ease-in-out infinite alternate-reverse`,
              }}
            >
              <path
                d="M 32 28 Q 26 42, 18 46 Q 24 36, 30 30 Z"
                fill="#EBF0F7"
                stroke="#D8DEE8"
                strokeWidth="0.8"
              />
              <path d="M 18 46 Q 22 40, 26 34 L 30 30 L 25 38 Z" fill="#424B5C" />
            </g>
          </svg>
        </div>
      );

    case 'swallow':
      // Chim én (Huyền Nhạn): Cánh liềm dài, đuôi én đôi chẻ nhọn, chao lượn nhanh
      return (
        <div
          className="relative w-12 h-9 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 54 40" className="w-full h-full overflow-visible">
            {/* Cánh trên vỗ */}
            <g
              style={{
                transformOrigin: '24px 18px',
                animation: `swallowWingFlap ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 24 18 Q 16 4, 4 1 Q 12 12, 22 17 Z"
                fill="#343E50"
                stroke="#4C586E"
                strokeWidth="0.6"
              />
            </g>

            {/* Cánh dưới */}
            <g
              style={{
                transformOrigin: '24px 22px',
                animation: `swallowWingFlap ${flapSpeed}s ease-in-out infinite alternate-reverse`,
              }}
            >
              <path
                d="M 24 22 Q 16 34, 6 38 Q 14 28, 22 23 Z"
                fill="#2B3444"
              />
            </g>

            {/* Thân chim én thon gọn */}
            <ellipse cx="28" cy="20" rx="9" ry="3.8" fill="#343E50" />
            {/* Ức én màu trắng bạc phớt hồng */}
            <ellipse cx="30" cy="21" rx="5" ry="2.2" fill="#F8F6F5" />
            {/* Đuôi én chẻ đôi sắc nét */}
            <path
              d="M 20 20 L 4 14 L 11 20 L 3 26 Z"
              fill="#2B3444"
            />
            {/* Mỏ nhọn */}
            <path d="M 37 19.5 L 42 20 L 37 20.5 Z" fill="#E8B072" />
          </svg>
        </div>
      );

    case 'songbird':
      // Chim khuyên / sẻ hoa: Nhỏ nhắn, màu lục ngọc pastel (#7CB9A8) pha vàng mơ
      return (
        <div
          className="relative w-10 h-7 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 46 32" className="w-full h-full overflow-visible">
            {/* Cánh vỗ vui tươi */}
            <g
              style={{
                transformOrigin: '20px 15px',
                animation: `birdFlapQuick ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 20 15 Q 12 5, 2 3 Q 10 11, 18 15 Z"
                fill="#6EA998"
              />
            </g>
            {/* Thân tròn mũm mĩm đáng yêu */}
            <ellipse cx="23" cy="16" rx="8.5" ry="5" fill="#7BBCA9" />
            {/* Bụng vàng ngà mơ mộng */}
            <ellipse cx="24" cy="18" rx="5.5" ry="3.2" fill="#FFF2CF" />
            {/* Đuôi xoè nhẹ */}
            <path d="M 15 16 L 3 13 L 5 19 Z" fill="#589B88" />
            {/* Mắt đen li ti */}
            <circle cx="28" cy="14.5" r="1.1" fill="#2E3A48" />
            {/* Mỏ xinh */}
            <path d="M 31 15.5 L 35 16 L 31 16.5 Z" fill="#E88BA0" />
          </svg>
        </div>
      );

    case 'pink_butterfly':
      // Bướm hồ điệp hồng phấn (#F5A8B8 & #E88BA0)
      return (
        <div
          className="relative w-9 h-8 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 44 38" className="w-full h-full overflow-visible">
            {/* Cánh trái đập 3D */}
            <g
              style={{
                transformOrigin: '22px 19px',
                animation: `butterflyWingLeft ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              {/* Cánh trước */}
              <path
                d="M 22 17 C 15 6, 4 7, 2 15 C 0 21, 10 24, 21 19 Z"
                fill="url(#pinkBfGradTop)"
                stroke="#DE7B92"
                strokeWidth="0.6"
              />
              {/* Đốm hoa văn cánh */}
              <ellipse cx="9" cy="14" rx="2.5" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-25 9 14)" />
              {/* Cánh sau */}
              <path
                d="M 21 19 C 14 23, 6 27, 8 33 C 11 37, 18 34, 22 23 Z"
                fill="url(#pinkBfGradBottom)"
                stroke="#DE7B92"
                strokeWidth="0.6"
              />
            </g>

            {/* Thân bướm thon mảnh */}
            <ellipse cx="22" cy="20" rx="1.4" ry="7" fill="#5D4E3C" />
            {/* Râu bướm uốn cong */}
            <path
              d="M 22 13 Q 19 8, 16 7 M 22 13 Q 25 8, 28 7"
              stroke="#5D4E3C"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Cánh phải đập 3D */}
            <g
              style={{
                transformOrigin: '22px 19px',
                animation: `butterflyWingRight ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 22 17 C 29 6, 40 7, 42 15 C 44 21, 34 24, 23 19 Z"
                fill="url(#pinkBfGradTop)"
                stroke="#DE7B92"
                strokeWidth="0.6"
              />
              <ellipse cx="35" cy="14" rx="2.5" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(25 35 14)" />
              <path
                d="M 23 19 C 30 23, 38 27, 36 33 C 33 37, 26 34, 22 23 Z"
                fill="url(#pinkBfGradBottom)"
                stroke="#DE7B92"
                strokeWidth="0.6"
              />
            </g>

            {/* Gradient định nghĩa cho bướm hồng */}
            <defs>
              <linearGradient id="pinkBfGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFAEC0" />
                <stop offset="100%" stopColor="#E88BA0" />
              </linearGradient>
              <linearGradient id="pinkBfGradBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E88BA0" />
                <stop offset="100%" stopColor="#D46C83" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'jade_butterfly':
      // Bướm lam ngọc bích (#7EE0D6 & #4EB3A8)
      return (
        <div
          className="relative w-9 h-8 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 44 38" className="w-full h-full overflow-visible">
            <g
              style={{
                transformOrigin: '22px 19px',
                animation: `butterflyWingLeft ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 22 17 C 15 5, 3 6, 2 15 C 1 21, 10 24, 21 19 Z"
                fill="url(#jadeBfGrad)"
                stroke="#39958C"
                strokeWidth="0.6"
              />
              <circle cx="10" cy="13" r="2.2" fill="#E8FFFA" opacity="0.75" />
              <path
                d="M 21 19 C 14 23, 5 27, 7 34 C 10 38, 18 34, 22 23 Z"
                fill="#4EB3A8"
                stroke="#39958C"
                strokeWidth="0.6"
              />
            </g>

            <ellipse cx="22" cy="20" rx="1.3" ry="6.5" fill="#3D4B54" />
            <path
              d="M 22 13.5 Q 18 8, 15 7 M 22 13.5 Q 26 8, 29 7"
              stroke="#3D4B54"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />

            <g
              style={{
                transformOrigin: '22px 19px',
                animation: `butterflyWingRight ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 22 17 C 29 5, 41 6, 42 15 C 43 21, 34 24, 23 19 Z"
                fill="url(#jadeBfGrad)"
                stroke="#39958C"
                strokeWidth="0.6"
              />
              <circle cx="34" cy="13" r="2.2" fill="#E8FFFA" opacity="0.75" />
              <path
                d="M 23 19 C 30 23, 39 27, 37 34 C 34 38, 26 34, 22 23 Z"
                fill="#4EB3A8"
                stroke="#39958C"
                strokeWidth="0.6"
              />
            </g>

            <defs>
              <linearGradient id="jadeBfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A2F5EC" />
                <stop offset="100%" stopColor="#4EB3A8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'gold_butterfly':
      // Bướm hoàng kim swallowtail (#FCD872 & #E5B232)
      return (
        <div
          className="relative w-10 h-9 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 46 40" className="w-full h-full overflow-visible">
            <g
              style={{
                transformOrigin: '23px 20px',
                animation: `butterflyWingLeft ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 23 18 C 15 5, 2 6, 1 15 C 0 22, 11 25, 22 20 Z"
                fill="url(#goldBfGrad)"
                stroke="#BA8B1E"
                strokeWidth="0.6"
              />
              {/* Đuôi cánh bướm phượng hoàng xẻ nhẹ */}
              <path
                d="M 22 20 C 14 24, 4 28, 5 36 L 8 38 L 10 34 C 15 36, 19 33, 23 24 Z"
                fill="#E5B232"
                stroke="#BA8B1E"
                strokeWidth="0.6"
              />
            </g>

            <ellipse cx="23" cy="20.5" rx="1.4" ry="7" fill="#423422" />
            <path
              d="M 23 13.5 Q 19 8, 16 7 M 23 13.5 Q 27 8, 30 7"
              stroke="#423422"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />

            <g
              style={{
                transformOrigin: '23px 20px',
                animation: `butterflyWingRight ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 23 18 C 31 5, 44 6, 45 15 C 46 22, 35 25, 24 20 Z"
                fill="url(#goldBfGrad)"
                stroke="#BA8B1E"
                strokeWidth="0.6"
              />
              <path
                d="M 24 20 C 32 24, 42 28, 41 36 L 38 38 L 36 34 C 31 36, 27 33, 23 24 Z"
                fill="#E5B232"
                stroke="#BA8B1E"
                strokeWidth="0.6"
              />
            </g>

            <defs>
              <linearGradient id="goldBfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF099" />
                <stop offset="100%" stopColor="#F5C038" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'violet_butterfly':
      // Bướm tử la lan tím (#D8B4F8 & #9D6CD8)
      return (
        <div
          className="relative w-9 h-8 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 44 38" className="w-full h-full overflow-visible">
            <g
              style={{
                transformOrigin: '22px 19px',
                animation: `butterflyWingLeft ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 22 17 C 14 5, 3 7, 2 15 C 1 21, 10 24, 21 19 Z"
                fill="#C69DF5"
                stroke="#8452C4"
                strokeWidth="0.6"
              />
              <circle cx="10" cy="14" r="2" fill="#FFFFFF" opacity="0.65" />
              <path
                d="M 21 19 C 14 23, 6 27, 8 34 C 11 38, 18 34, 22 23 Z"
                fill="#9D6CD8"
                stroke="#8452C4"
                strokeWidth="0.6"
              />
            </g>

            <ellipse cx="22" cy="20" rx="1.3" ry="6.5" fill="#3B2A4A" />
            <path
              d="M 22 13.5 Q 18 8, 15 7 M 22 13.5 Q 26 8, 29 7"
              stroke="#3B2A4A"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />

            <g
              style={{
                transformOrigin: '22px 19px',
                animation: `butterflyWingRight ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              <path
                d="M 22 17 C 30 5, 41 7, 42 15 C 43 21, 34 24, 23 19 Z"
                fill="#C69DF5"
                stroke="#8452C4"
                strokeWidth="0.6"
              />
              <circle cx="34" cy="14" r="2" fill="#FFFFFF" opacity="0.65" />
              <path
                d="M 23 19 C 30 23, 38 27, 36 34 C 33 38, 26 34, 22 23 Z"
                fill="#9D6CD8"
                stroke="#8452C4"
                strokeWidth="0.6"
              />
            </g>
          </svg>
        </div>
      );

    case 'ink_bird':
      // Chim nhạn thiên di nét mực thư pháp Á Đông (Thủy Mặc bay tầng cao)
      return (
        <div
          className="relative w-8 h-5 flex items-center justify-center"
          style={{ transform: faceTransform }}
        >
          <svg viewBox="0 0 38 22" className="w-full h-full overflow-visible">
            <g
              style={{
                transformOrigin: '19px 12px',
                animation: `inkBirdWingFlap ${flapSpeed}s ease-in-out infinite alternate`,
              }}
            >
              {/* Cánh trái vuốt nét mực */}
              <path
                d="M 19 12 Q 10 1, 2 3 Q 11 8, 17 12 Z"
                fill="#374151"
              />
              {/* Cánh phải vuốt nét mực */}
              <path
                d="M 19 12 Q 28 1, 36 3 Q 27 8, 21 12 Z"
                fill="#374151"
              />
            </g>
            {/* Thân chim nhạn */}
            <ellipse cx="19" cy="12" rx="3.5" ry="1.6" fill="#1F2937" />
          </svg>
        </div>
      );
  }
}
