const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

code = code.replace(
  "  enable_showcase?: boolean;",
  "  enable_showcase?: boolean;\n  enable_services?: boolean;\n  enable_clients?: boolean;\n  enable_packages?: boolean;\n  enable_contact_form?: boolean;"
);

fs.writeFileSync('src/types/index.ts', code);
