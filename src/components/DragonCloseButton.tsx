import React from 'react';

interface DragonCloseButtonProps {
  onClick: () => void;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function DragonCloseButton({ onClick, tooltip = 'Khép lại Long Uyển', className = '', style }: DragonCloseButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={tooltip}
      className={`group absolute top-4 right-4 z-40 flex items-center justify-center rounded-full bg-[#FFF9E5] hover:bg-[#FFF2CC] border-2 border-[#FFE873] shadow-sm hover:shadow-md active:scale-90 transition-all duration-300 cursor-pointer w-11 h-11 md:w-10 md:h-10 shrink-0 ${className}`}
      style={{ position: 'absolute', top: '16px', right: '16px', left: 'auto', zIndex: 40, ...style }}
    >
      {/* Rotating Long Châu / Dragon Pearl SVG */}
      <div className="w-6 h-6 transition-transform duration-500 ease-out group-hover:rotate-180 flex items-center justify-center">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer golden aura ring */}
          <circle cx="50" cy="50" r="45" fill="#FFE873" stroke="#5D4E3C" strokeWidth="6" />
          {/* Inner mystical pearl center */}
          <circle cx="50" cy="50" r="37" fill="#FDF3D2" />
          {/* Yin-Yang swirl or Dragon Clouds */}
          <path d="M50 13 A37 37 0 0 0 50 87 A18.5 18.5 0 0 1 50 50 A18.5 18.5 0 0 0 50 13 Z" fill="#FFFDF2" opacity="0.35" />
          {/* Rotating "X" close symbol styled as mystical intersecting clouds */}
          <path
            d="M 32 32 L 68 68 M 68 32 L 32 68"
            stroke="#5D4E3C"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* Small shiny diamond sparkles */}
          <path d="M 50 25 L 53 28 L 50 31 L 47 28 Z" fill="#FFF" />
          <path d="M 50 69 L 53 72 L 50 75 L 47 72 Z" fill="#FFF" />
        </svg>
      </div>
      
      {/* Hover background indicator / active touch ripple */}
      <span className="absolute inset-0 rounded-full bg-[#FFE873]/10 opacity-0 group-active:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
}
