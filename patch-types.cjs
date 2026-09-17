const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

code = code.replace(
  "  hero_image_3_url?: string | null;",
  "  hero_image_3_url?: string | null;\n  enable_3d?: boolean;\n  enable_text_banner?: boolean;\n  enable_faq?: boolean;\n  enable_showcase?: boolean;"
);

code = code.replace(
  "  quantity: string | null;",
  "  quantity: string | null;\n  is_included?: boolean;"
);

fs.writeFileSync('src/types/index.ts', code);
