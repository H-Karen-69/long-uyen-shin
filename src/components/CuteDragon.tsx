import React from 'react';

interface SparkleProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * SparkleDecoration / Mystic Pearl component
 * Replaces old mascot icon with elegant pastel sparkles and pearls.
 */
export default function CuteDragon({
  className = '',
  size = 24,
  color = '#F2DB88',
}: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none pointer-events-none inline-block`}
    >
      {/* Outer soft glow aura */}
      <circle cx="50" cy="50" r="35" fill={color} opacity="0.25" className="blur-sm" />
      {/* Central 8-point Sparkle */}
      <path
        d="M 50 10 Q 50 50 10 50 Q 50 50 50 90 Q 50 50 90 50 Q 50 50 50 10 Z"
        fill={color}
      />
      <path
        d="M 50 25 Q 50 50 25 50 Q 50 50 50 75 Q 50 50 75 50 Q 50 50 50 25 Z"
        fill="#FFFFFF"
        opacity="0.8"
      />
      {/* Corner diagonal sparkles */}
      <path
        d="M 50 32 L 53 47 L 68 50 L 53 53 L 50 68 L 47 53 L 32 50 L 47 47 Z"
        fill="#F2DB88"
        opacity="0.9"
      />
    </svg>
  );
}
