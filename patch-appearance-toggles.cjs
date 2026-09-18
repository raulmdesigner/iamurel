const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/AppearanceCMS.tsx', 'utf8');

const togglesStr = `
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'enable_3d', label: 'Efeito 3D Scroll', desc: 'Animações de entrada 3D' },
              { id: 'enable_text_banner', label: 'Faixa de Texto', desc: 'Banner rotativo' },
              { id: 'enable_showcase', label: 'Portfólio/Casos', desc: 'Demonstrações' },
              { id: 'enable_services', label: 'Como Funciona', desc: 'Metodologia e serviços' },
              { id: 'enable_clients', label: 'Para Quem É', desc: 'Exemplos reais' },
              { id: 'enable_packages', label: 'Pacotes/Preços', desc: 'Sua esteira de serviços' },
              { id: 'enable_faq', label: 'Perguntas (FAQ)', desc: 'Dúvidas frequentes' },
              { id: 'enable_contact_form', label: 'Contato Final', desc: 'Rodapé de contato' },
            ].map((toggle) => (
`;

code = code.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">[\s\S]*?\.map\(\(toggle\) => \(/,
  togglesStr
);

// Add a save confirmation state
code = code.replace(
  "export default function AppearanceCMS() {",
  "export default function AppearanceCMS() {\n  const [saveSuccess, setSaveSuccess] = useState(false);"
);

code = code.replace(
  "await dataLayer.saveAppearance(appearance);",
  "await dataLayer.saveAppearance(appearance);\n    setSaveSuccess(true);\n    setTimeout(() => setSaveSuccess(false), 3000);"
);

// We need to find the save button and add the success message
const saveButton = `
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            {saveSuccess ? <Check size={16} className="text-white" /> : <Save size={16} />}
            <span>{saveSuccess ? 'Salvo com Sucesso!' : 'Salvar & Aplicar Aparência'}</span>
          </button>
`;

code = code.replace(
  /<button\s+type="submit"\s+className="inline-flex items-center gap-2 px-6 py-2\.5 bg-action[^>]+>[\s\S]*?<\/button>/,
  saveButton
);

fs.writeFileSync('src/pages/admin/AppearanceCMS.tsx', code);
