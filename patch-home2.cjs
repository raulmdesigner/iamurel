const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  '<InfiniteMarquee />',
  '{appearance.enable_text_banner !== false && <InfiniteMarquee text="DIREÇÃO CRIATIVA • INTELIGÊNCIA ARTIFICIAL • BRANDING • DESIGN GRÁFICO • " speed={40} />}'
);

code = code.replace(
  '{/* 5. PORTFÓLIO / SHOWCASE */}',
  '{appearance.enable_showcase !== false && (\n      <div className="showcase-wrapper">\n      {/* 5. PORTFÓLIO / SHOWCASE */}'
);

code = code.replace(
  '{/* 6. PACOTES / PREÇOS */}',
  '      </div>\n      )}\n      {/* 6. PACOTES / PREÇOS */}'
);

code = code.replace(
  '{/* 7. FAQ CURTA E OBJETIVA */}',
  '{appearance.enable_faq !== false && (\n      <div className="faq-wrapper">\n      {/* 7. FAQ CURTA E OBJETIVA */}'
);

code = code.replace(
  '{/* 8. CTA FINAL FORTE COM LOGO IAMUREL */}',
  '      </div>\n      )}\n      {/* 8. CTA FINAL FORTE COM LOGO IAMUREL */}'
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
