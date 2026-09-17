const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  '<InfiniteMarquee text="DIREÇÃO CRIATIVA • INTELIGÊNCIA ARTIFICIAL • BRANDING • DESIGN GRÁFICO • " speed={40} />',
  '{appearance.enable_text_banner !== false && <InfiniteMarquee text="DIREÇÃO CRIATIVA • INTELIGÊNCIA ARTIFICIAL • BRANDING • DESIGN GRÁFICO • " speed={40} />}'
);

code = code.replace(
  '{/* 5. PORTFÓLIO / SHOWCASE */}\\n      <section',
  '{appearance.enable_showcase !== false && (\\n      <section'
);

code = code.replace(
  '{/* 6. PACOTES / PREÇOS */}',
  ')}\\n      {/* 6. PACOTES / PREÇOS */}'
);

code = code.replace(
  '{/* 7. FAQ CURTA E OBJETIVA */}\\n      <section',
  '{appearance.enable_faq !== false && (\\n      <section'
);

code = code.replace(
  '{/* 8. CTA FINAL FORTE COM LOGO IAMUREL */}',
  ')}\\n      {/* 8. CTA FINAL FORTE COM LOGO IAMUREL */}'
);

// We also need to conditionally render the 3D scroll reveal, but maybe just changing it in ScrollReveal component is easier,
// or we can pass a prop to ScrollReveal. Let's patch ScrollReveal directly!

fs.writeFileSync('src/pages/public/Home.tsx', code);
