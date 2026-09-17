const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

code = code.replace(
  "import { SiteSettings, FAQ, Package, Showcase } from '../../types';",
  "import { SiteSettings, FAQ, Package, Showcase, AppearanceSettings } from '../../types';"
);

code = code.replace(
  "const [faqs, setFaqs] = useState<FAQ[]>([]);",
  "const [faqs, setFaqs] = useState<FAQ[]>([]);\n  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);"
);

code = code.replace(
  "dataLayer.getPackages(),",
  "dataLayer.getPackages(),\n          dataLayer.getAppearance(),"
);

code = code.replace(
  "const [st, fq, pkgs, cses] = await Promise.all([",
  "const [st, fq, pkgs, app, cses] = await Promise.all(["
);

code = code.replace(
  "setPackages(pkgs);",
  "setPackages(pkgs);\n        setAppearance(app);"
);

code = code.replace(
  "{appearance.enable_text_banner",
  "{appearance?.enable_text_banner"
);

code = code.replace(
  "{appearance.enable_showcase",
  "{appearance?.enable_showcase"
);

code = code.replace(
  "{appearance.enable_faq",
  "{appearance?.enable_faq"
);

code = code.replace(
  "speed={40}",
  "speed={'normal'}"
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
