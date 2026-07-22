const fs = require('fs');

// 1. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');
const newGlass = `
.glass-card-transparent {
  background-color: rgba(255, 253, 242, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(245, 228, 184, 0.5);
  box-shadow: 0 4px 12px rgba(93, 78, 60, 0.06);
}
`;
if (!css.includes('.glass-card-transparent')) {
  css = css.replace('.frosted-glass-kem {', newGlass + '\n.frosted-glass-kem {');
  fs.writeFileSync('src/index.css', css, 'utf8');
}

// 2. Update Leaderboard.tsx
let leaderboard = fs.readFileSync('src/components/Leaderboard.tsx', 'utf8');
leaderboard = leaderboard.replace(/className="frosted-glass-kem/g, 'className="glass-card-transparent');
fs.writeFileSync('src/components/Leaderboard.tsx', leaderboard, 'utf8');

// 3. Update App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
// replace empty states which are frosted-glass-kem
app = app.replace(/className="frosted-glass-kem rounded-\[24px\]/g, 'className="glass-card-transparent rounded-[24px]');
fs.writeFileSync('src/App.tsx', app, 'utf8');

// 4. Update MiniMusicPlayer.tsx
let mini = fs.readFileSync('src/components/MiniMusicPlayer.tsx', 'utf8');
mini = mini.replace(/className=".*frosted-glass-kem/g, (match) => {
    return match.replace('frosted-glass-kem', 'glass-card-transparent');
});
fs.writeFileSync('src/components/MiniMusicPlayer.tsx', mini, 'utf8');

console.log('Done');
