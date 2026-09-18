const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  /{appearance\?\.enable_text_banner !== false && <InfiniteMarquee speed=\{'normal'\} \/>}/,
  "{appearance?.enable_text_banner !== false && <InfiniteMarquee />}"
);

code = code.replace(
  /<section id="como-funciona"/,
  "{appearance?.enable_services !== false && (\n      <section id=\"como-funciona\""
);

code = code.replace(
  /        <\/ScrollReveal>\n      <\/section>\n      \{\/\* 5\. SEÇÃO "PARA QUEM É"/,
  "        </ScrollReveal>\n      </section>\n      )}\n      {/* 5. SEÇÃO \"PARA QUEM É\""
);

code = code.replace(
  /<section className="py-16 md:py-24 px-6 bg-surface border-b border-border">/,
  "{appearance?.enable_clients !== false && (\n      <section className=\"py-16 md:py-24 px-6 bg-surface border-b border-border\">"
);

code = code.replace(
  /        <\/ScrollReveal>\n      <\/section>\n      \{\/\* 6\. SERVIÇOS \(TRÊS CAMINHOS\) \*\//,
  "        </ScrollReveal>\n      </section>\n      )}\n      {/* 6. SERVIÇOS (TRÊS CAMINHOS) */}"
);

code = code.replace(
  /<section id="pacotes" className="py-16 md:py-24 px-6 bg-bg border-b border-border">/,
  "{appearance?.enable_packages !== false && (\n      <section id=\"pacotes\" className=\"py-16 md:py-24 px-6 bg-bg border-b border-border\">"
);

code = code.replace(
  /        <\/ScrollReveal>\n      <\/section>\n      \{\/\* 7\. FAQ CURTA/,
  "        </ScrollReveal>\n      </section>\n      )}\n      {/* 7. FAQ CURTA"
);

code = code.replace(
  /<section className="py-20 md:py-28 px-6 bg-dark text-white relative overflow-hidden border-b border-border-dark">/,
  "{appearance?.enable_contact_form !== false && (\n      <section className=\"py-20 md:py-28 px-6 bg-dark text-white relative overflow-hidden border-b border-border-dark\">"
);

code = code.replace(
  /              <\/form>\n            <\/div>\n          <\/div>\n        <\/div>\n      <\/section>\n    <\/div>/,
  "              </form>\n            </div>\n          </div>\n        </div>\n      </section>\n      )}\n    </div>"
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
