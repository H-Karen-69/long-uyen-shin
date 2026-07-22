const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/\.glass-card \{[\s\S]*?\}/, `.glass-card {
  background-color: rgba(255, 253, 242, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(196, 228, 214, 0.5);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}`);

css = css.replace(/\.glass-card-hover:hover \{[\s\S]*?\}/, `.glass-card-hover:hover {
  background-color: rgba(255, 253, 242, 0.65);
  border-color: rgba(143, 207, 184, 0.8);
  transform: translateY(-5px);
  box-shadow: 
    0 8px 24px rgba(93, 78, 60, 0.10),
    0 5px 15px -5px rgba(143, 207, 184, 0.2);
}`);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('index.css updated');
