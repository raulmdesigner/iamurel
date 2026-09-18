const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

const s1 = `      {/* FORMULÁRIO DE CONTATO DIRETO E OBJETIVO */}
      <section id="contato" className="py-16 md:py-24 px-6 bg-bg">`;

const r1 = `      {/* FORMULÁRIO DE CONTATO DIRETO E OBJETIVO */}
      {appearance?.enable_contact_form !== false && (
      <section id="contato" className="py-16 md:py-24 px-6 bg-bg">`;

code = code.replace(s1, r1);

const s2 = `      </section>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. SEÇÃO DE PORTFÓLIO CENTRAL (ESTUDOS CONCRETOS)
// ----------------------------------------------------------------------`;

const r2 = `      </section>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. SEÇÃO DE PORTFÓLIO CENTRAL (ESTUDOS CONCRETOS)
// ----------------------------------------------------------------------`;

code = code.replace(s2, r2);

fs.writeFileSync('src/pages/public/Home.tsx', code);
