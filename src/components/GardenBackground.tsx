import React from 'react';

export const GardenBackground = () => {
  // Generate falling petals
  const petals = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 6,
    left: `${Math.random() * 80 - 20}vw`,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 12,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#F5F3EC]">
      <style>{`
        @keyframes gentleSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes swayReverse {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-1deg); }
        }
        @keyframes fallAndSway {
          0% { transform: translate(0, -5vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translate(15vw, 110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes waterRipple {
          0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.4; }
          50% { transform: scaleX(1.05) scaleY(1.02); opacity: 0.7; }
        }
        @keyframes sunRay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .sway {
          animation: gentleSway 8s ease-in-out infinite;
          transform-origin: top left;
        }
        .sway-reverse {
          animation: swayReverse 9s ease-in-out infinite;
          transform-origin: top right;
        }
        .petal {
          position: absolute;
          background: #F8E7E9;
          border-radius: 50% 0 50% 50%;
          animation: fallAndSway linear infinite;
        }
      `}</style>
      
      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9E6E6" /> {/* Soft sky blue */}
            <stop offset="35%" stopColor="#F5F3EC" /> {/* Creamy white */}
            <stop offset="70%" stopColor="#EAE4EB" /> {/* Subtle lavender */}
            <stop offset="100%" stopColor="#E2E6DF" /> {/* Fading to ground */}
          </linearGradient>
          
          {/* Distant Hills / Tree lines (Mist layered) */}
          <linearGradient id="mistHill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD6CD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B6C7B8" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="mistHill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B6C7B8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9FB3A3" stopOpacity="0.8" />
          </linearGradient>

          {/* Ground */}
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCE3D4" />
            <stop offset="100%" stopColor="#B3C6AD" />
          </linearGradient>

          {/* Stone Path */}
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D5D1C8" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#E6E3DB" />
            <stop offset="100%" stopColor="#D5D1C8" stopOpacity="0.6"/>
          </linearGradient>

          {/* Pond */}
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D0E3E6" />
            <stop offset="100%" stopColor="#E6F0F2" />
          </linearGradient>
          
          {/* Volumetric Sun Rays */}
          <linearGradient id="rayGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFDF7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFDF7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1920" height="1080" fill="url(#skyGrad)" />

        {/* Morning Mist / Sun Rays (Volumetric Lighting) */}
        <g style={{ animation: 'sunRay 12s ease-in-out infinite' }}>
          {/* Main ray */}
          <polygon points="0,0 800,0 1600,1080 0,1080" fill="url(#rayGrad)" opacity="0.6" />
          {/* Secondary ray */}
          <polygon points="300,0 1100,0 1920,1080 600,1080" fill="url(#rayGrad)" opacity="0.4" />
        </g>

        {/* Distant Hills / Forest line */}
        <path d="M0 550 Q 400 480, 800 560 T 1500 520 T 1920 590 L 1920 1080 L 0 1080 Z" fill="url(#mistHill1)" />
        <path d="M0 620 Q 300 580, 700 660 T 1400 610 T 1920 680 L 1920 1080 L 0 1080 Z" fill="url(#mistHill2)" />

        {/* Ground */}
        <path d="M0 720 Q 500 680, 1000 750 T 1920 720 L 1920 1080 L 0 1080 Z" fill="url(#groundGrad)" />

        {/* Stone Path */}
        <path d="M750 1080 C 820 950, 860 850, 920 750 C 935 730, 960 730, 975 750 C 1030 850, 1100 950, 1150 1080 Z" fill="url(#pathGrad)" />
        
        {/* Stone details on the path */}
        <g fill="#C4C0B6" opacity="0.8">
          <ellipse cx="860" cy="1000" rx="45" ry="15" transform="rotate(-3 860 1000)" />
          <ellipse cx="910" cy="940" rx="35" ry="12" transform="rotate(-6 910 940)" />
          <ellipse cx="950" cy="880" rx="25" ry="8" transform="rotate(-2 950 880)" />
          <ellipse cx="940" cy="810" rx="15" ry="5" transform="rotate(4 940 810)" />
          <ellipse cx="980" cy="900" rx="30" ry="10" transform="rotate(8 980 900)" />
          <ellipse cx="1020" cy="970" rx="40" ry="13" transform="rotate(5 1020 970)" />
          <ellipse cx="1060" cy="1040" rx="55" ry="18" transform="rotate(10 1060 1040)" />
        </g>

        {/* Pond on the Right */}
        <path d="M1200 850 C 1150 920, 1280 1020, 1500 1060 C 1750 1100, 1900 980, 1850 880 C 1800 780, 1500 750, 1350 780 C 1280 790, 1240 800, 1200 850 Z" fill="url(#waterGrad)" />
        
        {/* Water Ripples */}
        <g stroke="#F8FDFD" strokeWidth="2" fill="none" opacity="0.5" style={{ animation: 'waterRipple 5s ease-in-out infinite alternate', transformOrigin: '1500px 900px' }}>
          <ellipse cx="1500" cy="920" rx="80" ry="20" />
          <ellipse cx="1650" cy="980" rx="50" ry="12" />
          <ellipse cx="1350" cy="950" rx="40" ry="10" />
          <ellipse cx="1450" cy="840" rx="30" ry="7" />
        </g>

        {/* Lotus / Lily pads */}
        <g fill="#9FB3A3">
          <ellipse cx="1300" cy="880" rx="22" ry="8" transform="rotate(-15 1300 880)" />
          <ellipse cx="1360" cy="860" rx="16" ry="6" transform="rotate(10 1360 860)" />
          <ellipse cx="1700" cy="1000" rx="28" ry="10" transform="rotate(-20 1700 1000)" />
          <ellipse cx="1760" cy="960" rx="20" ry="7" transform="rotate(15 1760 960)" />
          
          {/* Small water flowers (Ivory white) */}
          <circle cx="1310" cy="875" r="4" fill="#F8F5EE" />
          <circle cx="1710" cy="995" r="5" fill="#F8F5EE" />
        </g>

        {/* FOREGROUND FRAMING - LEFT SIDE (Old Tree with Pale Pink / Ivory blossoms) */}
        <g className="sway">
          {/* Trunk and branches */}
          <path d="M-80 100 C 50 250, 100 450, 0 1080 L -150 1080 Z" fill="#8C8377" />
          <path d="M0 250 C 150 220, 250 120, 380 0 L 0 0 Z" fill="#7C7469" />
          <path d="M40 450 C 180 430, 260 320, 350 200 L 0 200 Z" fill="#7C7469" />
          <path d="M60 650 C 150 630, 220 580, 280 500 L 0 500 Z" fill="#7C7469" />
          
          {/* Foliage Base (Sage/Muted Green) */}
          <circle cx="80" cy="80" r="160" fill="#9BAFA0" opacity="0.85" />
          <circle cx="250" cy="60" r="130" fill="#A8BCAE" opacity="0.9" />
          <circle cx="380" cy="-20" r="140" fill="#8C9E90" opacity="0.85" />
          
          <circle cx="180" cy="240" r="120" fill="#9BAFA0" opacity="0.8" />
          <circle cx="350" cy="180" r="130" fill="#A8BCAE" opacity="0.9" />
          
          <circle cx="120" cy="450" r="110" fill="#9BAFA0" opacity="0.85" />
          <circle cx="260" cy="400" r="100" fill="#8C9E90" opacity="0.9" />

          <circle cx="80" cy="620" r="90" fill="#A8BCAE" opacity="0.8" />
          <circle cx="180" cy="560" r="80" fill="#9BAFA0" opacity="0.85" />

          {/* Pale Pink and Ivory Flowers scattered in the foliage */}
          <circle cx="120" cy="150" r="70" fill="#F8E7E9" opacity="0.9" />
          <circle cx="280" cy="80" r="65" fill="#FAF5F6" opacity="0.85" />
          <circle cx="380" cy="100" r="50" fill="#F8E7E9" opacity="0.8" />
          <circle cx="220" cy="300" r="55" fill="#FAF5F6" opacity="0.9" />
          <circle cx="320" cy="250" r="60" fill="#F8E7E9" opacity="0.8" />
          <circle cx="160" cy="480" r="50" fill="#FAF5F6" opacity="0.85" />
          <circle cx="240" cy="450" r="40" fill="#F8E7E9" opacity="0.9" />
          <circle cx="100" cy="650" r="45" fill="#FAF5F6" opacity="0.8" />
          <circle cx="150" cy="600" r="35" fill="#F8E7E9" opacity="0.9" />
        </g>

        {/* FOREGROUND FRAMING - RIGHT SIDE (Willow branches & Bushes) */}
        <g className="sway-reverse">
          {/* Drooping willow-like branches */}
          <path d="M1920 -50 C 1800 100, 1750 350, 1750 550" stroke="#8C967A" strokeWidth="4" fill="none" opacity="0.8" />
          <path d="M1920 50 C 1850 200, 1800 400, 1820 650" stroke="#8C967A" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M1920 150 C 1880 300, 1850 500, 1880 750" stroke="#8C967A" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M1920 250 C 1900 400, 1880 600, 1920 850" stroke="#8C967A" strokeWidth="2" fill="none" opacity="0.8" />
          
          {/* Leaves for willow */}
          <g fill="#A5B89D" opacity="0.9">
            {Array.from({ length: 25 }).map((_, i) => (
              <ellipse key={`wil1-${i}`} cx={1750 + Math.sin(i*0.5)*20} cy={50 + i*22} rx="18" ry="6" transform={`rotate(${60 + Math.sin(i)*15} ${1750 + Math.sin(i*0.5)*20} ${50 + i*22})`} />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <ellipse key={`wil2-${i}`} cx={1820 + Math.sin(i*0.4)*15} cy={100 + i*20} rx="15" ry="5" transform={`rotate(${75 + Math.sin(i)*10} ${1820 + Math.sin(i*0.4)*15} ${100 + i*20})`} />
            ))}
            {Array.from({ length: 32 }).map((_, i) => (
              <ellipse key={`wil3-${i}`} cx={1880 + Math.sin(i*0.6)*10} cy={150 + i*20} rx="12" ry="4" transform={`rotate(${45 + Math.sin(i)*20} ${1880 + Math.sin(i*0.6)*10} ${150 + i*20})`} />
            ))}
            {Array.from({ length: 28 }).map((_, i) => (
              <ellipse key={`wil4-${i}`} cx={1910 + Math.sin(i*0.3)*12} cy={250 + i*22} rx="14" ry="5" transform={`rotate(${80 + Math.sin(i)*12} ${1910 + Math.sin(i*0.3)*12} ${250 + i*22})`} />
            ))}
          </g>
        </g>

        {/* BOTTOM FOREGROUND BUSHES & GRASS */}
        <g fill="#8C9E90">
          {/* Left Bushes */}
          <circle cx="-50" cy="1100" r="280" fill="#758A7A" />
          <circle cx="150" cy="1080" r="200" fill="#8C9E90" />
          <circle cx="350" cy="1120" r="140" fill="#9BAFA0" />
          <circle cx="500" cy="1150" r="100" fill="#A8BCAE" />
          
          {/* Left Bush Flowers (Ivory, soft lavender, pale pink) */}
          <circle cx="80" cy="950" r="35" fill="#FAF5F6" />
          <circle cx="160" cy="920" r="45" fill="#EAE4EB" />
          <circle cx="260" cy="1000" r="30" fill="#F8E7E9" />
          <circle cx="380" cy="1040" r="25" fill="#FAF5F6" />
          <circle cx="120" cy="1020" r="20" fill="#F8E7E9" />

          {/* Right Bushes */}
          <circle cx="2000" cy="1100" r="320" fill="#758A7A" />
          <circle cx="1780" cy="1080" r="240" fill="#8C9E90" />
          <circle cx="1580" cy="1120" r="160" fill="#9BAFA0" />
          
          {/* Right Bush Flowers (Ivory, soft lavender, pale pink) */}
          <circle cx="1850" cy="920" r="50" fill="#F8E7E9" />
          <circle cx="1720" cy="940" r="40" fill="#FAF5F6" />
          <circle cx="1600" cy="1020" r="35" fill="#EAE4EB" />
          <circle cx="1780" cy="1020" r="25" fill="#FAF5F6" />
          <circle cx="1680" cy="1060" r="30" fill="#F8E7E9" />
        </g>

        {/* Small scattered flowers along the path & grass (Midground) */}
        <g fill="#F8F5EE" opacity="0.9">
          {/* Left grass */}
          <circle cx="680" cy="980" r="6" />
          <circle cx="650" cy="1010" r="8" fill="#F8E7E9" />
          <circle cx="720" cy="1030" r="5" />
          <circle cx="780" cy="880" r="7" fill="#EAE4EB" />
          <circle cx="750" cy="900" r="5" />
          <circle cx="820" cy="820" r="6" />
          <circle cx="850" cy="840" r="4" fill="#F8E7E9" />
          
          {/* Right grass */}
          <circle cx="1220" cy="980" r="7" />
          <circle cx="1260" cy="1020" r="9" fill="#EAE4EB" />
          <circle cx="1180" cy="940" r="5" />
          <circle cx="1120" cy="880" r="6" fill="#F8E7E9" />
          <circle cx="1150" cy="850" r="4" />
          <circle cx="1080" cy="810" r="5" />
          <circle cx="1050" cy="780" r="4" fill="#EAE4EB" />
        </g>
      </svg>

      {/* Falling Petals Layer (Animation) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petals.map((p) => (
          <div
            key={`petal-${p.id}`}
            className="petal"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: `-20px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Soft overlay to ensure center readability without washing out colors */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10 pointer-events-none mix-blend-soft-light" />
      <div className="absolute inset-0 bg-white/10 pointer-events-none mix-blend-overlay" />
    </div>
  );
};
