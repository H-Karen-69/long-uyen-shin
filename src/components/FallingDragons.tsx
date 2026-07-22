/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FallingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  content: string;
  rotationDirection: number;
  opacity: number;
}

export default function FallingDragons() {
  const items = useMemo<FallingItem[]>(() => {
    const types = ['🐉', '🌸', '🔮', '✨', '🍵', '🍃'];
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random percentage across width
      delay: Math.random() * 10, // Delay before start
      duration: 12 + Math.random() * 15, // Travel time (slow)
      size: 14 + Math.random() * 24, // Size in pixels
      content: types[i % types.length],
      rotationDirection: Math.random() > 0.5 ? 1 : -1,
      opacity: 0.25 + Math.random() * 0.45,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '105vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [0, item.rotationDirection * 35, -item.rotationDirection * 15, 0],
            rotate: item.rotationDirection * 360,
            opacity: [0, item.opacity, item.opacity, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: 0,
            fontSize: item.size,
            filter: 'drop-shadow(0 2px 4px rgba(93, 78, 60, 0.08))',
          }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}
