const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  "import { SiteSettings, FAQ } from '../../types';",
  "import { SiteSettings, FAQ, Package, Showcase } from '../../types';"
);

code = code.replace(
  "const [faqs, setFaqs] = useState<FAQ[]>([]);",
  "const [faqs, setFaqs] = useState<FAQ[]>([]);\n  const [packages, setPackages] = useState<Package[]>([]);\n  const [cases, setCases] = useState<Showcase[]>([]);"
);

code = code.replace(
  "dataLayer.getFaq()",
  "dataLayer.getFaq(),\n          dataLayer.getPackages(),\n          dataLayer.getShowcases()"
);

code = code.replace(
  "const [st, fq] = await Promise.all([",
  "const [st, fq, pkgs, cses] = await Promise.all(["
);

code = code.replace(
  "setFaqs(fq);",
  "setFaqs(fq);\n        setPackages(pkgs);\n        setCases(cses);"
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
