const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

const s1 = `      </section>

      {/* FORMULÁRIO DE CONTATO DIRETO E OBJETIVO */}`;

const r1 = `      </section>
      )}

      {/* FORMULÁRIO DE CONTATO DIRETO E OBJETIVO */}`;

code = code.replace(s1, r1);

fs.writeFileSync('src/pages/public/Home.tsx', code);
