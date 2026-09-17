const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  /className={`rounded-2xl overflow-hidden transition-all duration-300 relative \${[\s\S]*?`}/,
  "className={`rounded-2xl overflow-hidden transition-all duration-300 relative border ${isOpen ? 'bg-white/5 border-action/30 shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}"
);

code = code.replace(
  /style={{[\s\S]*?}}/g,
  (match, offset, str) => {
    if (str.slice(Math.max(0, offset - 100), offset).includes("rounded-2xl")) {
       return "style={{ backdropFilter: 'blur(12px)' }}";
    }
    return match;
  }
);

code = code.replace(
  /{[^}]*Glossy top reflection[^}]*}/,
  ""
);
code = code.replace(
  /<div className="absolute top-0 left-0 right-0 h-1\/2 bg-gradient-to-b from-white\/60 to-transparent pointer-events-none rounded-t-2xl z-0" \/>/g,
  ""
);

code = code.replace(
  /className={`text-base font-bold font-display transition-colors \${isOpen \? 'text-\[#005f73\]' : 'text-text'}`}/,
  "className={`text-base font-bold font-display transition-colors text-white`}"
);

code = code.replace(
  /className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 \${isOpen \? 'bg-\[#0081a7\] text-white shadow-\[0_0_15px_rgba\(0,129,167,0\.5\)\]' : 'bg-white text-muted shadow-sm border border-white\/80'}`}/,
  "className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-action text-white shadow-[0_0_15px_rgba(255,74,28,0.5)]' : 'bg-white/10 text-white/50 border border-white/10'}`}"
);

code = code.replace(
  /className="px-6 pb-6 text-xs sm:text-sm text-\[#003f4f\] leading-relaxed relative z-10"/,
  'className="px-6 pb-6 text-xs sm:text-sm text-white/70 leading-relaxed relative z-10"'
);

code = code.replace(
  /className="pt-4 border-t border-white\/50"/,
  'className="pt-4 border-t border-white/10"'
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
