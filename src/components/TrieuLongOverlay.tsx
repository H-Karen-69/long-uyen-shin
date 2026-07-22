/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TrieuLongOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface FogParticle {
  id: number;
  x: number;
  scale: number;
  delay: number;
  opacity: number;
}

export default function TrieuLongOverlay({
  isActive,
  onComplete,
}: TrieuLongOverlayProps) {
  // Stage state: 1 (0-0.4s), 2 (0.4-0.7s), 3 (0.7-1.5s), 4 (1.5-1.8s), 5 (1.8-2.0s)
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [fogParticles, setFogParticles] = useState<FogParticle[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);

  // Guard against duplicate execution or stale closures
  const onCompleteRef = useRef(onComplete);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) {
      hasTriggeredRef.current = false;
      setStage(1);
      return;
    }

    // Check prefers-reduced-motion for reduced motion fallback
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        const timer = setTimeout(() => {
          onCompleteRef.current();
        }, 500);
        return () => clearTimeout(timer);
      }
    }

    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Generate random star sparkles
    const newSparkles: SparkleParticle[] = Array.from({ length: 14 }).map(
      (_, i) => ({
        id: i,
        x: 12 + Math.random() * 76,
        y: 12 + Math.random() * 76,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 0.3,
        duration: 0.6 + Math.random() * 0.6,
      })
    );
    setSparkles(newSparkles);

    // Generate pastel pink fog mist particles
    const newFog: FogParticle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: (i / 6) * 100 + (Math.random() * 8 - 4),
      scale: 1 + Math.random() * 1.2,
      delay: Math.random() * 0.2,
      opacity: 0.25 + Math.random() * 0.2,
    }));
    setFogParticles(newFog);

    // Timeline timers (total 2.0s)
    // Stage 2 (0.4s): Dragon Pearl Emerges
    const t2 = setTimeout(() => setStage(2), 400);

    // Stage 3 (0.7s): Dragon Flies Out in S-curve Motion
    const t3 = setTimeout(() => setStage(3), 700);

    // Stage 4 (1.5s): Dragon Flash & Scale Out
    const t4 = setTimeout(() => setStage(4), 1500);

    // Stage 5 & Completion (1.8s - 2.0s): Cleanup & Unmount
    const t5 = setTimeout(() => {
      setStage(5);
      onCompleteRef.current();
    }, 1800);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive]);

  if (!isActive) return null;

  // Fallback view for reduced motion preference
  if (isReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 pointer-events-none bg-[#7A8AA5]/80 backdrop-blur-md flex items-center justify-center"
      >
        <div className="text-center p-6">
          <span className="text-5xl mb-2 block animate-pulse">🔮</span>
          <p className="font-serif font-bold text-[#F8F6F5] text-lg tracking-widest">
            TRIỆU HỒI LONG UYỂN
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {stage < 5 && (
        <motion.div
          key="trieu-long-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 4 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: stage === 4 ? 0.3 : 0.4 }}
          className="fixed inset-0 z-50 pointer-events-none select-none flex items-center justify-center overflow-hidden"
        >
          {/* ======================================================================== */}
          {/* GIAI ĐOẠN 1: BACKGROUND BLUE-GREY RADIAL GRADIENT (#7A8AA5 / #B8C4D8)  */}
          {/* ======================================================================== */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at center, rgba(184,196,216,0.85) 0%, rgba(122,138,165,0.92) 65%, rgba(90,107,133,0.98) 100%)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* SƯƠNG MÙ PASTEL HỒNG PHẤN (#F5C8D0 / #E88BA0) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {fogParticles.map((fog) => (
              <motion.div
                key={fog.id}
                initial={{ y: '100%', opacity: 0, scale: fog.scale }}
                animate={{
                  y: ['100%', '10%', '-30%'],
                  opacity: stage === 4 ? 0 : [0, fog.opacity, fog.opacity * 0.7, 0],
                }}
                transition={{
                  duration: 2.0,
                  delay: fog.delay,
                  ease: 'easeOut',
                }}
                className="absolute bottom-0 w-60 h-60 rounded-full blur-2xl pointer-events-none"
                style={{
                  left: `${fog.x}%`,
                  background:
                    'radial-gradient(circle, rgba(245,200,208,0.5) 0%, rgba(232,139,160,0.25) 60%, transparent 100%)',
                }}
              />
            ))}
          </div>

          {/* ĐỐM SÁNG LẤP LÁNH (SPARKLE STARS) */}
          <div className="absolute inset-0 pointer-events-none">
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: stage === 4 ? 0 : [0, 0.85, 0],
                  scale: stage === 4 ? 0 : [0, 1.2, 0],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: sp.duration,
                  delay: sp.delay,
                  repeat: stage < 4 ? 1 : 0,
                  ease: 'easeInOut',
                }}
                className="absolute text-[#F8F6F5] drop-shadow-[0_0_6px_rgba(248,246,245,0.9)]"
                style={{
                  top: `${sp.y}%`,
                  left: `${sp.x}%`,
                  fontSize: `${sp.size}px`,
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>

          {/* ======================================================================== */}
          {/* GIAI ĐOẠN 2: NGỌC RỒNG (DRAGON PEARL) & TIA SÁNG TỎA 8 HƯỚNG             */}
          {/* ======================================================================== */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center pointer-events-none z-20">
            {stage >= 2 && (
              <motion.div
                key="dragon-pearl-container"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  stage === 4
                    ? { scale: 1.4, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={
                  stage === 4
                    ? { duration: 0.3 }
                    : { type: 'spring', stiffness: 140, damping: 16 }
                }
                className="relative flex items-center justify-center"
              >
                {/* 6-8 TIA SÁNG TỎA RA HÌNH SAO */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: stage === 4 ? 2 : [0, 1.5, 1],
                        opacity: stage === 4 ? 0 : [0, 0.75, 0.35],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.03,
                        ease: 'easeOut',
                      }}
                      className="absolute w-40 h-1 origin-center"
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(248,246,245,0.9) 50%, transparent 100%)',
                        filter: 'blur(1px)',
                      }}
                    />
                  ))}
                </div>

                {/* HALO PHÁT SÁNG NHẤP NHÁY (PULSE 0.8s) */}
                <motion.div
                  animate={{
                    scale: [0.95, 1.12, 0.95],
                    opacity: [0.6, 0.95, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(248,246,245,0.85) 0%, rgba(245,200,208,0.5) 50%, transparent 75%)',
                    boxShadow:
                      '0 0 45px rgba(232,139,160,0.6), 0 0 80px rgba(184,196,216,0.4)',
                  }}
                />

                {/* VIÊN NGỌC RỒNG TRÒN (GRADIENT #F8F6F5 -> #F5C8D0 -> #E88BA0) */}
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 border-[#F8F6F5]/90 overflow-hidden shadow-2xl"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 35%, #F8F6F5 0%, #F5C8D0 30%, #E88BA0 70%, #D66A85 100%)',
                    boxShadow:
                      'inset 0 -8px 16px rgba(214,106,133,0.5), inset 0 5px 10px rgba(255,255,255,0.95), 0 0 35px rgba(232,139,160,0.8)',
                  }}
                >
                  <span className="text-2xl md:text-3xl select-none opacity-80 animate-pulse">
                    🔮
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* ======================================================================== */}
          {/* GIAI ĐOẠN 3: RỒNG PHƯƠNG ĐÔNG THẬT (SVG từ https://files.catbox.moe/e85x2l.svg) */}
          {/* ======================================================================== */}
          {stage >= 3 && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
              {/* VỆT MÂY MỞ RỘNG VÀ VỆT SÁNG PHÍA SAU ĐƯỜNG BAY CỦA RỒNG */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: stage === 4 ? 0 : [0, 0.5, 0.3],
                  scale: stage === 4 ? 1.8 : [0.6, 1.3, 1.5],
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute w-[500px] h-[350px] md:w-[750px] md:h-[480px] rounded-full blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(232,139,160,0.45) 0%, rgba(184,196,216,0.25) 55%, transparent 80%)',
                }}
              />

              {/* RỒNG PHƯƠNG ĐÔNG BAY UỐN LƯỢN S-CURVE (NẾU LOAD BỊ LỖI THÌ DÙNG PLACEHOLDER DẢI LỤA) */}
              {!imgLoadError ? (
                <motion.div
                  key="oriental-dragon-container"
                  initial={{
                    scale: 0.2,
                    opacity: 0,
                    x: '0vw',
                    y: '0vh',
                    rotate: -10,
                  }}
                  animate={
                    stage === 4
                      ? {
                          scale: 1.4,
                          opacity: 0,
                          x: '20vw',
                          y: '-20vh',
                          rotate: 10,
                        }
                      : {
                          x: ['0vw', '-18vw', '20vw', '-12vw'],
                          y: ['0vh', '0vh', '-20vh', '12vh'],
                          scale: [0.2, 0.7, 1.0, 1.1],
                          rotate: [-10, -10, 15, -20],
                          opacity: [0, 1, 0.95, 0.9],
                        }
                  }
                  transition={
                    stage === 4
                      ? { duration: 0.3, ease: 'easeOut' }
                      : {
                          duration: 0.8,
                          times: [0, 0.25, 0.65, 1],
                          ease: 'easeInOut',
                        }
                  }
                  className="relative flex items-center justify-center pointer-events-none"
                >
                  <img
                    src="https://files.catbox.moe/e85x2l.svg"
                    alt="Rồng Phương Đông Long Uyển"
                    onError={() => setImgLoadError(true)}
                    className="w-[260px] sm:w-[360px] md:w-[440px] max-w-[85vw] h-auto object-contain select-none"
                    style={{
                      // Color alignment filter: Convert original navy/red tones to Long Uyển Pastel Pink (#E88BA0) & Blue-Grey (#7A8AA5)
                      filter:
                        'hue-rotate(285deg) saturate(0.85) brightness(1.12) drop-shadow(0 0 20px rgba(232, 139, 160, 0.75)) drop-shadow(0 0 40px rgba(122, 138, 165, 0.45))',
                    }}
                  />
                </motion.div>
              ) : (
                /* FALLBACK DẢI LỤA RỒNG CŨ KHI NẮM CHẮC AN TOÀN NẾU MẠNG CHẬM HOẶC SVG THẤT BẠI */
                <svg
                  viewBox="0 0 1000 600"
                  className="w-full h-full max-w-5xl max-h-[80vh] overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="dragonRibbonGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7A8AA5" />
                      <stop offset="50%" stopColor="#E88BA0" />
                      <stop offset="100%" stopColor="#F8F6F5" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 150,480 C 280,180 380,520 520,280 C 660,80 820,380 920,160"
                    fill="none"
                    stroke="url(#dragonRibbonGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, opacity: stage === 4 ? 0 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>
              )}
            </div>
          )}

          {/* ======================================================================== */}
          {/* GIAI ĐOẠN 4: FLASH TRẮNG BẠC CHÓI NGHỆ THUẬT (0.15S)                     */}
          {/* ======================================================================== */}
          {stage === 4 && (
            <motion.div
              key="flash-[#F8F6F5]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 2.5, 3.5],
              }}
              transition={{ duration: 0.3, times: [0, 0.4, 1], ease: 'easeOut' }}
              className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            >
              <div
                className="w-64 h-64 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, #F8F6F5 0%, rgba(245,200,208,0.85) 45%, rgba(122,138,165,0.4) 75%, transparent 100%)',
                  boxShadow:
                    '0 0 120px #F8F6F5, 0 0 200px rgba(232,139,160,0.8)',
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
