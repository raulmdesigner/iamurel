const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/AppearanceCMS.tsx', 'utf8');

const urlInputStr = `
                <div className="relative mt-2">
                  <input
                    type="url"
                    placeholder="URL direta (se não for upload)"
                    value={appearance[field.id as keyof AppearanceSettings] as string || ''}
                    onChange={(e) => setAppearance({ ...appearance, [field.id]: e.target.value })}
                    className="w-full px-3 py-1.5 border border-border rounded text-xs bg-bg focus:border-action outline-none"
                  />
                </div>
`;

code = code.replace(
  /                <div className="relative">\n                  <input\n                    type="file"/g,
  urlInputStr + '\n                <div className="relative mt-2">\n                  <input\n                    type="file"'
);

const togglesStr = `
        {/* Módulos do Site */}
        <div className="pt-6 border-t border-border space-y-4">
          <div>
            <label className="block text-sm font-bold text-text mb-1 flex items-center gap-2">
              <Layers size={16} className="text-action" />
              Módulos e Seções do Site
            </label>
            <p className="text-xs text-muted mb-4">
              Ative ou desative seções específicas do site para ajustar a experiência.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'enable_3d', label: 'Efeito 3D Scroll Reveal', desc: 'Animações de entrada 3D nas seções' },
              { id: 'enable_text_banner', label: 'Faixa de Texto Rotativa', desc: 'O banner de texto rodapé/meio' },
              { id: 'enable_showcase', label: 'Seção de Portfólio (Casos)', desc: 'Demonstrações e estudos' },
              { id: 'enable_faq', label: 'Seção de Perguntas Frequentes', desc: 'FAQ' },
            ].map((toggle) => (
              <div key={toggle.id} className="p-4 border border-border rounded-lg bg-surface flex items-start justify-between gap-4">
                <div>
                  <span className="block text-sm font-bold text-text mb-0.5">{toggle.label}</span>
                  <p className="text-xs text-muted">{toggle.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAppearance({ ...appearance, [toggle.id]: !(appearance as any)[toggle.id] })}
                  className={\`w-10 h-5 rounded-full relative transition-colors \${(appearance as any)[toggle.id] !== false ? 'bg-action' : 'bg-muted/30'}\`}
                >
                  <div className={\`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform \${(appearance as any)[toggle.id] !== false ? 'translate-x-5' : 'translate-x-0'}\`} />
                </button>
              </div>
            ))}
          </div>
        </div>
`;

code = code.replace(
  /{[\s\S]*?\/\* Botões de Ação \*\//,
  (match) => {
    if (match.includes("Mídia do Hero")) {
       return match.replace('{/* Botões de Ação */}', togglesStr + '\n        {/* Botões de Ação */}');
    }
    return match;
  }
);

code = code.replace(/import { Layers } from 'lucide-react';/g, ""); // Prevent duplicate
code = code.replace(
  "import { Save, RefreshCw, UploadCloud, Loader2 } from 'lucide-react';",
  "import { Save, RefreshCw, UploadCloud, Loader2, Layers } from 'lucide-react';"
);

fs.writeFileSync('src/pages/admin/AppearanceCMS.tsx', code);
