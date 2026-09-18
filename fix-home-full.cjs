const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

// Fix the pacotes closing tag
code = code.replace(
  /        <\/ScrollReveal>\n      <\/section>\n\n      \{\/\* 7\. FAQ CURTA E OBJETIVA \*\/\}/,
  "        </ScrollReveal>\n      </section>\n      )}\n\n      {/* 7. FAQ CURTA E OBJETIVA */}"
);

// If there's an issue with the regex above because I already replaced some things, let's just do a reliable string replace for line 298.
const searchLines = `        </div>
        </ScrollReveal>
      </section>

      {appearance?.enable_faq !== false && (
      <div className="faq-wrapper">`;

const replaceLines = `        </div>
        </ScrollReveal>
      </section>
      )}

      {appearance?.enable_faq !== false && (
      <div className="faq-wrapper">`;

code = code.replace(searchLines, replaceLines);

fs.writeFileSync('src/pages/public/Home.tsx', code);
