const fs = require('fs');
let code = fs.readFileSync('src/components/modern/ScrollReveal.tsx', 'utf8');

const importStr = "import { useState, useEffect } from 'react';\nimport { dataLayer } from '../../lib/data';\n";
code = code.replace("import React from 'react';", "import React from 'react';\n" + importStr);

code = code.replace(
  "export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: ScrollRevealProps) {",
  "export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: ScrollRevealProps) {\n  const [enable3d, setEnable3d] = useState(true);\n  useEffect(() => {\n    dataLayer.getAppearance().then(app => {\n      if (app.enable_3d === false) setEnable3d(false);\n    });\n  }, []);"
);

code = code.replace(
  "const initial = { opacity: 0, filter: 'blur(10px)', scale: 0.98, ...getInitialOffset() };",
  "const initial = enable3d \n    ? { opacity: 0, filter: 'blur(10px)', scale: 0.98, rotateX: 10, ...getInitialOffset() }\n    : { opacity: 0, y: 30 };"
);

code = code.replace(
  "whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, x: 0 }}",
  "whileInView={enable3d ? { opacity: 1, filter: 'blur(0px)', scale: 1, rotateX: 0, y: 0, x: 0 } : { opacity: 1, y: 0 }}"
);

fs.writeFileSync('src/components/modern/ScrollReveal.tsx', code);
