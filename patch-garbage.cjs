const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  /      \)\}\\n            <\/div>\n      \)\}/g,
  '      </div>\n      )}'
);

code = code.replace(
  /      <\/section>\n\n      \)\}\\n            <\/div>\n      \)\}/g,
  '      </section>\n      </div>\n      )}'
);

code = code.replace(
  /      <\/section>\n      \}\)\\n      \{\/\* 6\. PACOTES \/ PREÇOS \*\//,
  '      </section>\n      </div>\n      )}\n      {/* 6. PACOTES / PREÇOS */}'
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
