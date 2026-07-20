import React from 'react';

interface LemonCloseButtonProps {
  onClick: () => void;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LemonCloseButton({ onClick, tooltip = 'Khép lại vườn', className = '', style }: LemonCloseButtonProps) {
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
      {/* Rotating Lemon Slice SVG */}
      <div className="w-6 h-6 transition-transform duration-500 ease-out group-hover:rotate-90 flex items-center justify-center">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Peel */}
          <circle cx="50" cy="50" r="45" fill="#FFE873" stroke="#5D4E3C" strokeWidth="6" />
          {/* White inner ring */}
          <circle cx="50" cy="50" r="37" fill="#FFFDF2" />
          {/* Segments */}
          <path d="M50 50 L50 18 C65 18 78 30 78 45 C78 48 74 50 68 50 Z" fill="#FFE873" stroke="#5D4E3C" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 50 L82 50 C82 65 70 78 55 78 C52 78 50 74 50 68 Z" fill="#FFE873" stroke="#5D4E3C" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 50 L50 82 C35 82 22 70 22 55 C22 52 26 50 32 50 Z" fill="#FFE873" stroke="#5D4E3C" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 50 L18 50 C18 35 30 22 45 22 C48 22 50 26 50 32 Z" fill="#FFE873" stroke="#5D4E3C" strokeWidth="4" strokeLinejoin="round" />
          {/* Small seeds */}
          <circle cx="42" cy="42" r="3" fill="#FFFDF2" />
          <circle cx="58" cy="58" r="3" fill="#FFFDF2" />
          <circle cx="42" cy="58" r="3" fill="#FFFDF2" />
          <circle cx="58" cy="42" r="3" fill="#FFFDF2" />
        </svg>
      </div>
      
      {/* Hover background indicator / active touch ripple */}
      <span className="absolute inset-0 rounded-full bg-[#FFE873]/10 opacity-0 group-active:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
}
