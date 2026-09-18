const fs = require('fs');
let code = fs.readFileSync('src/components/modern/ScrollReveal.tsx', 'utf8');

code = code.replace(
  "const initial = enable3d \n    ? { opacity: 0, filter: 'blur(10px)', scale: 0.98, rotateX: 10, ...getInitialOffset() }\n    : { opacity: 0, y: 30 };",
  "const initial = enable3d \n    ? { opacity: 0, filter: 'blur(10px)', scale: 0.98, rotateX: 10, ...getInitialOffset() }\n    : { opacity: 0, filter: 'blur(0px)', scale: 1, rotateX: 0, y: 30, x: 0 };"
);

code = code.replace(
  "whileInView={enable3d ? { opacity: 1, filter: 'blur(0px)', scale: 1, rotateX: 0, y: 0, x: 0 } : { opacity: 1, y: 0 }}",
  "whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, rotateX: 0, y: 0, x: 0 }}"
);

fs.writeFileSync('src/components/modern/ScrollReveal.tsx', code);
