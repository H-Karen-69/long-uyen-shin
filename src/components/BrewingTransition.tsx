/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BrewingTransitionProps {
  onExplode: () => void;
  onComplete: () => void;
  isMuted?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
  type: 'drop' | 'slice' | 'leaf' | 'cube' | 'star';
  vx: number;
  vy: number;
}

export default function BrewingTransition({ onExplode, onComplete, isMuted = false }: BrewingTransitionProps) {
  const [phase, setPhase] = useState<'intro' | 'brewing' | 'burst' | 'fadeout'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [juiceHeight, setJuiceHeight] = useState(0); // 0 to 100%

  const onExplodeRef = React.useRef(onExplode);
  const onCompleteRef = React.useRef(onComplete);

  useEffect(() => {
    onExplodeRef.current = onExplode;
    onCompleteRef.current = onComplete;
  }, [onExplode, onComplete]);

  useEffect(() => {
    // Phase 1: Intro (0s - 0.2s) - Glass scales in
    const tIntro = setTimeout(() => {
      setPhase('brewing');
    }, 200);

    // Phase 2: Brewing (0.2s - 1.4s) - Juice fills steadily
    const intervalJuice = setInterval(() => {
      setJuiceHeight((prev) => {
        if (prev >= 100) {
          clearInterval(intervalJuice);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    // Phase 3: EXPLOSION at 1.5s!
    const tBurst = setTimeout(() => {
      setPhase('burst');
      generateConfetti();
      onExplodeRef.current(); // Unlock Inner App immediately underneath!
    }, 1500);

    // Phase 4: Clean fadeout (2.2s)
    const tFinal = setTimeout(() => {
      setPhase('fadeout');
      onCompleteRef.current(); // Clean up overlay
    }, 2200);

    return () => {
      clearTimeout(tIntro);
      clearInterval(intervalJuice);
      clearTimeout(tBurst);
      clearTimeout(tFinal);
    };
  }, []);

  // Generate beautiful, soft, pastel confetti particles radiating outwards
  const generateConfetti = () => {
    const numParticles = 35;
    const colors = [
      '#FFE873', // Pastel yellow
      '#FFF5CC', // Cream yellow
      '#FFD3B6', // Peach pink
      '#FFB7B2', // Soft red-pink
      '#C8E6C9', // Mint green
      '#B2F7EF', // Soft cyan
      '#E8A382', // Warm coral
    ];
    const types: Particle['type'][] = ['drop', 'slice', 'leaf', 'cube', 'star'];

    const newParticles: Particle[] = Array.from({ length: numParticles }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 14 + Math.random() * 16;
      return {
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // minor upward bias
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };
    });

    setParticles(newParticles);
  };

  return (
    <div id="brewing-transition-container" className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Background Dimming & Blur - only visible while NOT burst / fadeout */}
      <AnimatePresence>
        {phase !== 'burst' && phase !== 'fadeout' && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#C7D9BA]/85 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* FULL SCREEN JUICE SPLASH & SLIDE DOWN (CỰC KỲ DỄ THƯƠNG & CHỈ CHẠY 1 LẦN) */}
      <AnimatePresence>
        {phase === 'burst' && (
          <motion.div
            initial={{ scale: 0, opacity: 0, borderRadius: '50%' }}
            animate={{ 
              scale: [0, 1.8, 1.8], 
              opacity: [0, 1, 1],
              borderRadius: ['50%', '0%', '0%'],
              y: ['0%', '0%', '100%']
            }}
            transition={{
              duration: 1.1,
              times: [0, 0.35, 1],
              ease: 'easeInOut'
            }}
            className="fixed inset-0 bg-[#FFE873] z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Sparkles in the background */}
      {phase !== 'burst' && phase !== 'fadeout' && (
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '25%', left: '30%', delay: 0.0, size: 'text-xl' },
            { top: '20%', left: '65%', delay: 0.1, size: 'text-2xl' },
            { top: '70%', left: '25%', delay: 0.2, size: 'text-lg' },
            { top: '60%', left: '75%', delay: 0.15, size: 'text-xl' },
          ].map((spark, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: spark.delay }}
              className={`absolute ${spark.size} text-[#FFF176]`}
              style={{ top: spark.top, left: spark.left }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {/* MAIN CONTAINER FOR ANIMATING COCKTAIL GLASS & INGREDIENTS */}
      <div className="relative w-[300px] h-[300px] flex items-center justify-center pointer-events-none">
        
        {/* RADIAL LIGHT BURST WAVE */}
        <AnimatePresence>
          {phase === 'burst' && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 14, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-24 h-24 rounded-full bg-radial from-[#FFE873] via-[#FFE873]/40 to-transparent pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* QUICK BREWING INGREDIENTS */}
        {phase === 'brewing' && (
          <div className="absolute inset-0 pointer-events-none z-20">
            
            {/* Cute lemon squeezing */}
            <motion.div
              initial={{ y: -130, opacity: 0, scale: 0.7 }}
              animate={{ 
                y: [-130, -65, -72, -65], 
                opacity: 1, 
                scale: 1 
              }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="relative w-16 h-16">
                {/* Left Half */}
                <motion.div
                  animate={{ x: -14, rotate: -25 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="absolute left-0 w-8 h-16 overflow-hidden"
                >
                  <svg width="64" height="64" viewBox="0 0 100 100" className="absolute left-0">
                    <circle cx="50" cy="50" r="40" fill="#FFE873" stroke="#5D4E3C" strokeWidth="4" />
                    <circle cx="50" cy="50" r="32" fill="#FFF5CC" />
                    <path d="M 32 46 Q 36 42 40 46" stroke="#5D4E3C" strokeWidth="3.5" fill="none" />
                    <circle cx="30" cy="52" r="3" fill="#FFB7B2" />
                  </svg>
                </motion.div>

                {/* Right Half */}
                <motion.div
                  animate={{ x: 14, rotate: 25 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="absolute right-0 w-8 h-16 overflow-hidden"
                >
                  <svg width="64" height="64" viewBox="0 0 100 100" className="absolute right-0">
                    <circle cx="50" cy="50" r="40" fill="#FFE873" stroke="#5D4E3C" strokeWidth="4" />
                    <circle cx="50" cy="50" r="32" fill="#FFF5CC" />
                    <path d="M 60 46 Q 64 42 68 46" stroke="#5D4E3C" strokeWidth="3.5" fill="none" />
                    <circle cx="70" cy="52" r="3" fill="#FFB7B2" />
                  </svg>
                </motion.div>
              </div>

              {/* Continuous juice stream pouring down */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
                transition={{ delay: 0.45, duration: 0.85 }}
                className="w-1.5 h-16 bg-[#FFE873] origin-top rounded-full shadow-[0_0_4px_#FFE873] mt-1"
              />
            </motion.div>

            {/* Falling Ice cube 1 */}
            <motion.div
              initial={{ y: -130, x: -35, opacity: 0 }}
              animate={{ y: 22, x: -10, opacity: [0, 1, 1, 0], rotate: 45 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="absolute left-1/2 text-xl"
            >
              🧊
            </motion.div>

            {/* Falling Mint Leaf 1 */}
            <motion.div
              initial={{ y: -130, x: 35, opacity: 0 }}
              animate={{ y: 24, x: 8, opacity: [0, 1, 1, 0], rotate: -30 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="absolute left-1/2 text-xl"
            >
              🍃
            </motion.div>

            {/* Falling Ice cube 2 */}
            <motion.div
              initial={{ y: -130, x: -20, opacity: 0 }}
              animate={{ y: 22, x: -5, opacity: [0, 1, 1, 0], rotate: -15 }}
              transition={{ delay: 0.8, duration: 0.45 }}
              className="absolute left-1/2 text-xl"
            >
              🧊
            </motion.div>

            {/* Falling Mint Leaf 2 */}
            <motion.div
              initial={{ y: -130, x: 20, opacity: 0 }}
              animate={{ y: 24, x: -2, opacity: [0, 1, 1, 0], rotate: 45 }}
              transition={{ delay: 1.0, duration: 0.45 }}
              className="absolute left-1/2 text-xl"
            >
              🍃
            </motion.div>

            {/* Falling Sparkle Stars */}
            <motion.div
              initial={{ y: -130, x: 5, opacity: 0 }}
              animate={{ y: 20, x: 2, opacity: [0, 1, 1, 0], rotate: 180 }}
              transition={{ delay: 1.2, duration: 0.45 }}
              className="absolute left-1/2 text-xl text-[#FFE873]"
            >
              ✨
            </motion.div>
          </div>
        )}

        {/* COCKTAIL GLASS (MARTINI/MARGARITA SHAPED) */}
        {phase !== 'burst' && phase !== 'fadeout' && (
          <motion.div
            key="cocktail-glass-stage"
            initial={{ y: 100, opacity: 0, scale: 0.7 }}
            animate={
              phase === 'brewing'
                ? { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    // Shake rapidly near the end to trigger explosion
                    rotate: juiceHeight > 80 ? [0, -4, 4, -4, 4, 0] : 0,
                    transition: { 
                      y: { type: 'spring', damping: 14 },
                      rotate: { repeat: Infinity, duration: 0.15 }
                    }
                  }
                : { y: 0, opacity: 1, scale: 1 }
            }
            className="relative z-10 w-44 h-56 flex items-center justify-center pointer-events-none"
          >
            <svg width="180" height="220" viewBox="0 0 180 220" className="absolute">
              <defs>
                {/* Triangular clip for the drink inside the glass bowl */}
                <clipPath id="drink-clip">
                  <polygon points="34,50 146,50 90,136" />
                </clipPath>
                {/* Gold-yellow juice gradient */}
                <linearGradient id="liquid-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#FFE873" />
                  <stop offset="100%" stopColor="#FFF59D" />
                </linearGradient>
              </defs>

              {/* Straw cắm nghiêng (Mint/Peach pink) */}
              <line
                x1="110" y1="20" x2="85" y2="115"
                stroke="#FFB7B2"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Fluid Body inside clip path */}
              <g clipPath="url(#drink-clip)">
                {/* Filling rect driven by state */}
                <motion.rect
                  x="20"
                  y={136 - (86 * juiceHeight) / 100}
                  width="140"
                  height="100"
                  fill="url(#liquid-grad)"
                />

                {/* Bubbles inside */}
                {juiceHeight > 10 && (
                  <>
                    <circle cx="75" cy="110" r="2" fill="white" opacity="0.6" />
                    <circle cx="105" cy="95" r="1.5" fill="white" opacity="0.5" />
                    <circle cx="85" cy="80" r="2.5" fill="white" opacity="0.6" />
                    <circle cx="65" cy="70" r="1.5" fill="white" opacity="0.4" />
                    <circle cx="115" cy="65" r="2" fill="white" opacity="0.7" />
                  </>
                )}
              </g>

              {/* Glass Frame (Outline + Stem + Foot) */}
              {/* Triangular V-bowl */}
              <polygon
                points="30,45 150,45 90,140"
                fill="rgba(255, 255, 255, 0.15)"
                stroke="#5D4E3C"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Elegant Thin Stem */}
              <line
                x1="90" y1="140" x2="90" y2="195"
                stroke="#5D4E3C"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Soft Foot/Base */}
              <path
                d="M 60 195 C 60 195 70 202 90 202 C 110 202 120 195 120 195 C 120 195 115 201 90 201 C 65 201 60 195 60 195"
                fill="#FFF"
                stroke="#5D4E3C"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Cute Lemon slice gaced on the left rim */}
              <g transform="translate(35, 45) rotate(-22)">
                <circle cx="0" cy="0" r="14" fill="#FFE873" stroke="#5D4E3C" strokeWidth="3.5" />
                <circle cx="0" cy="0" r="10" fill="#FFF5CC" />
                {/* Slit */}
                <rect x="-1" y="4" width="2.5" height="10" fill="#5D4E3C" opacity="0.15" />
                {/* Smiley face */}
                <circle cx="-3" cy="-1" r="1" fill="#5D4E3C" />
                <circle cx="3" cy="-1" r="1" fill="#5D4E3C" />
                <path d="M-1.5,1.5 Q0,3.2 1.5,1.5" stroke="#5D4E3C" strokeWidth="1" fill="none" />
              </g>

              {/* Cute Face on the glass itself */}
              <g transform="translate(90, 85)">
                <circle cx="-12" cy="0" r="2.5" fill="#5D4E3C" />
                <circle cx="12" cy="0" r="2.5" fill="#5D4E3C" />
                <path d="M -4,5 Q 0,8 4,5" stroke="#5D4E3C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                {/* Blush cheeks */}
                <circle cx="-18" cy="4" r="2.5" fill="#FFB7B2" />
                <circle cx="18" cy="4" r="2.5" fill="#FFB7B2" />
              </g>
            </svg>
          </motion.div>
        )}

        {/* CONFETTI BLASTER PARTICLES */}
        {phase === 'burst' && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{
                  x: [0, p.vx * 1.5, p.vx * 1.8],
                  y: [0, p.vy * 1.5, p.vy * 1.8 + 180], // falling gravity
                  scale: [0, p.scale, p.scale * 0.7, 0],
                  rotate: [0, p.rotate, p.rotate * 2],
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.1, 0.8, 0.25, 1] 
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
              >
                {p.type === 'drop' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={p.color}>
                    <path d="M12,2.69C12,2.69 6,10.19 6,15A6,6 0 0,0 12,21A6,6 0 0,0 18,15C18,10.19 12,2.69 12,2.69Z" />
                  </svg>
                )}
                {p.type === 'slice' && (
                  <span className="text-xl">🍋</span>
                )}
                {p.type === 'leaf' && (
                  <span className="text-lg">🍃</span>
                )}
                {p.type === 'cube' && (
                  <div 
                    className="w-4.5 h-4.5 rounded border border-[#5D4E3C]/20 shadow-sm"
                    style={{ backgroundColor: p.color, opacity: 0.85 }}
                  />
                )}
                {p.type === 'star' && (
                  <span className="text-base" style={{ color: p.color }}>✦</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
