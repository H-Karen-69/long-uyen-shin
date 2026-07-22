const fs = require('fs');
const content = fs.readFileSync('src/components/MoodQuiz.tsx', 'utf8');

const replacement = `export function QuizDragon({ mood, size = 60, className = '' }: QuizDragonProps) {
  let colorTop = '#FFF9C4';
  let colorBottom = '#FFE873';
  let auraColor = 'rgba(255, 232, 115, 0.4)';

  switch (mood) {
    case 'vui':
      colorTop = '#FFF9C4';
      colorBottom = '#FFE873';
      auraColor = 'rgba(255, 232, 115, 0.4)';
      break;
    case 'buon':
      colorTop = '#EAE0F0';
      colorBottom = '#D4C4E8';
      auraColor = 'rgba(212, 196, 232, 0.4)';
      break;
    case 'codon':
      colorTop = '#C4E4D6';
      colorBottom = '#8FCFB8';
      auraColor = 'rgba(143, 207, 184, 0.4)';
      break;
    case 'binh-thuong':
      colorTop = '#FFE5D4';
      colorBottom = '#FFD3B6';
      auraColor = 'rgba(255, 211, 182, 0.4)';
      break;
    case 'buc':
      colorTop = '#FFC4A3';
      colorBottom = '#FFB088';
      auraColor = 'rgba(255, 176, 136, 0.4)';
      break;
  }

  const gradientId = \`jade-grad-\${mood}\`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={\`\${className} select-none overflow-visible\`}
    >
      <defs>
        <radialGradient id={gradientId} cx="0.5" cy="0.3" r="0.7" fx="0.5" fy="0.3">
          <stop offset="0%" stopColor={colorTop} />
          <stop offset="100%" stopColor={colorBottom} />
        </radialGradient>
      </defs>

      {/* Aura */}
      <circle cx="50" cy="50" r="45" fill={auraColor} filter="blur(4px)" />
      
      {/* Ngọc (Sphere) */}
      <circle cx="50" cy="50" r="38" fill={\`url(#\${gradientId})\`} />
      
      {/* Highlight (sáng ở góc trên trái) */}
      <ellipse cx="36" cy="32" rx="12" ry="6" transform="rotate(-30 36 32)" fill="white" opacity="0.6" />

      {/* Mặt biểu cảm - Màu nâu ấm #5D4E3C */}
      <g stroke="#5D4E3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {mood === 'vui' && (
          <>
            <circle cx="38" cy="48" r="3" fill="#5D4E3C" stroke="none" />
            <circle cx="62" cy="48" r="3" fill="#5D4E3C" stroke="none" />
            <path d="M 42 56 Q 50 64 58 56" />
          </>
        )}
        {mood === 'buon' && (
          <>
            <circle cx="38" cy="52" r="3" fill="#5D4E3C" stroke="none" />
            <circle cx="62" cy="52" r="3" fill="#5D4E3C" stroke="none" />
            <path d="M 42 58 Q 50 52 58 58" />
          </>
        )}
        {mood === 'codon' && (
          <>
            <circle cx="38" cy="50" r="2.5" fill="#5D4E3C" stroke="none" />
            <circle cx="62" cy="50" r="2.5" fill="#5D4E3C" stroke="none" />
            <path d="M 46 58 H 54" />
          </>
        )}
        {mood === 'binh-thuong' && (
          <>
            <circle cx="38" cy="50" r="3" fill="#5D4E3C" stroke="none" />
            <circle cx="62" cy="50" r="3" fill="#5D4E3C" stroke="none" />
            <path d="M 44 58 Q 50 60 56 58" />
          </>
        )}
        {mood === 'buc' && (
          <>
            <path d="M 32 44 L 40 48" />
            <path d="M 68 44 L 60 48" />
            <circle cx="38" cy="52" r="3" fill="#5D4E3C" stroke="none" />
            <circle cx="62" cy="52" r="3" fill="#5D4E3C" stroke="none" />
            <path d="M 44 60 Q 50 56 56 60" />
          </>
        )}
      </g>
    </svg>
  );
}`;

const lines = content.split(/\r?\n/);
const startIndex = lines.findIndex(l => l.includes('export function QuizDragon({'));
let endIndex = -1;
for (let i = startIndex + 1; i < lines.length; i++) {
  if (lines[i].includes('export default function MoodQuiz')) {
    endIndex = i - 1; // before the next function
    break;
  }
}
while (lines[endIndex].trim() === '') endIndex--;

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1, replacement);
  fs.writeFileSync('src/components/MoodQuiz.tsx', lines.join('\n'), 'utf8');
  console.log('Replaced successfully');
} else {
  console.log('Could not find indices', startIndex, endIndex);
}
