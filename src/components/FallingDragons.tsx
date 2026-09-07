import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FloatingParticle {
  id: number;
  type: 'sparkle' | 'pearl' | 'star';
  x: number; // percentage
  delay: number;
  duration: number;
  size: number;
  color: string;
  opacity: number;
  char?: string;
}

export default function FallingDragons() {
  const particles = useMemo<FloatingParticle[]>(() => {
    const sparkleChars = ['✦', '✧', '⋆', '✨'];
    const colors = ['#FDF3D2', '#B8C4D8', '#F2DB88', '#F2DB88', '#7A8AA5', '#F8F6F5'];

    return Array.from({ length: 24 }).map((_, i) => {
      const pType: 'sparkle' | 'pearl' | 'star' = i % 3 === 0 ? 'pearl' : i % 2 === 0 ? 'sparkle' : 'star';
      const color = colors[i % colors.length];
      const opacity = 0.35 + (i % 4) * 0.08;

      return {
        id: i,
        type: pType,
        x: (i * 4.2 + Math.sin(i) * 12 + 100) % 100,
        delay: (i * 0.4) % 8,
        duration: 14 + (i % 7) * 2,
        size: pType === 'pearl' ? 14 + (i % 3) * 3 : 12 + (i % 5) * 4,
        color,
        opacity,
        char: sparkleChars[i % sparkleChars.length],
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {particles.map((p) => {
        if (p.type === 'pearl') {
          return (
            <motion.div
              key={p.id}
              initial={{ y: '105vh', opacity: 0, scale: 0.8 }}
              animate={{
                y: '-10vh',
                x: [0, 20, -15, 0],
                opacity: [0, p.opacity, p.opacity, 0],
                scale: [0.8, 1.1, 0.9, 0.8],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: 0,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${p.color} 60%, rgba(216, 222, 232, 0.4) 100%)`,
                boxShadow: `0 0 12px ${p.color}80`,
              }}
            />
          );
        }

        // Sparkle / Star
        return (
          <motion.div
            key={p.id}
            initial={{ y: '105vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '-10vh',
              x: [0, 15, -10, 0],
              rotate: [0, 180, 360],
              opacity: [0, p.opacity, p.opacity * 0.4, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: 0,
              fontSize: `${p.size}px`,
              color: p.color,
              textShadow: `0 0 8px ${p.color}90`,
            }}
          >
            {p.char}
          </motion.div>
        );
      })}
    </div>
  );
}
