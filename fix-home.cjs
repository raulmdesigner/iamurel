const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  "{/* 6. SERVIÇOS (TRÊS CAMINHOS) */}}",
  "{/* 6. SERVIÇOS (TRÊS CAMINHOS) */}"
);

code = code.replace(
  "      </section>\n      )}\n\n      {appearance?.enable_faq !== false && (",
  "      </section>\n      )}\n      {appearance?.enable_faq !== false && ("
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
