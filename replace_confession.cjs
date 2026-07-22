const fs = require('fs');
const content = fs.readFileSync('src/components/ConfessionCorner.tsx', 'utf8');

let newContent = content.replace(
  '<div className="w-full max-w-3xl mx-auto flex flex-col max-h-[85vh]">',
  '<div className="w-full max-w-3xl mx-auto flex flex-col max-h-[85vh] frosted-glass-kem rounded-[32px] overflow-hidden">'
);
newContent = newContent.replace(
  '<div className="flex-none bg-[#FFFDF2]/90 p-4 rounded-t-[32px] border-x-2 border-t-2 border-[#F5EAD2] shadow-sm backdrop-blur-sm relative z-10 flex flex-col items-center justify-center text-center">',
  '<div className="flex-none p-4 relative z-10 flex flex-col items-center justify-center text-center border-b border-[#F5EAD2]/30">'
);
newContent = newContent.replace(
  '<div className="flex-1 bg-[#FFFDF2]/80 border-x-2 border-b-2 border-[#F5EAD2] rounded-b-[32px] overflow-hidden flex flex-col backdrop-blur-sm">',
  '<div className="flex-1 overflow-hidden flex flex-col">'
);

fs.writeFileSync('src/components/ConfessionCorner.tsx', newContent, 'utf8');
console.log('Confession replaced');
