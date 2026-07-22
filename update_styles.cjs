const fs = require('fs');

// 1. Update Header in App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  /bg-\[rgba\(255,253,242,0\.5\)\] backdrop-blur-sm border-b border-\[#C4E4D6\]\/50 shadow-sm/g,
  'bg-[rgba(254,246,222,0.7)] backdrop-blur-sm border-b border-[#FFE0CE]/50 shadow-sm'
);
fs.writeFileSync('src/App.tsx', app, 'utf8');

// 2. Update Leaderboard items in Leaderboard.tsx
let leaderboard = fs.readFileSync('src/components/Leaderboard.tsx', 'utf8');
leaderboard = leaderboard.replace(
  /bg-\[rgba\(255,253,242,0\.5\)\] hover:bg-\[rgba\(255,253,242,0\.65\)\] backdrop-blur-sm/g,
  'bg-[rgba(255,253,242,0.75)] hover:bg-[rgba(255,253,242,0.9)]'
);
fs.writeFileSync('src/components/Leaderboard.tsx', leaderboard, 'utf8');

// 3. Update index.css glass-card styles
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/\.glass-card \{[\s\S]*?\}/, `.glass-card {
  background-color: rgba(255, 253, 242, 0.75);
  border: 1px solid rgba(196, 228, 214, 0.5);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}`);

css = css.replace(/\.glass-card-hover:hover \{[\s\S]*?\}/, `.glass-card-hover:hover {
  background-color: rgba(255, 253, 242, 0.9);
  border-color: rgba(143, 207, 184, 0.8);
  transform: translateY(-5px);
  box-shadow: 
    0 8px 24px rgba(93, 78, 60, 0.10),
    0 5px 15px -5px rgba(143, 207, 184, 0.2);
}`);

css = css.replace(/\.glass-card-transparent \{[\s\S]*?\}/, `.glass-card-transparent {
  background-color: rgba(255, 253, 242, 0.75);
  border: 1px solid rgba(245, 228, 184, 0.5);
  box-shadow: 0 4px 12px rgba(93, 78, 60, 0.06);
}`);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Update finished');
