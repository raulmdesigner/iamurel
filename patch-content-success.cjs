const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/ContentCMS.tsx', 'utf8');

// The save button for settings
code = code.replace(
  /<button\s+type="submit"\s+className="inline-flex items-center gap-2 px-6 py-2\.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"\s*>\s*<Save size=\{16\} \/>\s*<span>Salvar Textos da Abertura<\/span>\s*<\/button>/g,
  `<button
    type="submit"
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
  >
    {success ? <Check size={16} /> : <Save size={16} />}
    <span>{success ? 'Salvo!' : 'Salvar Textos da Abertura'}</span>
  </button>`
);

code = code.replace(
  /<button\s+onClick=\{handleSavePackages\}\s+className="inline-flex items-center gap-2 px-6 py-2\.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"\s*>\s*<Save size=\{16\} \/>\s*<span>Salvar Pacotes<\/span>\s*<\/button>/g,
  `<button
    onClick={handleSavePackages}
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
  >
    {success ? <Check size={16} /> : <Save size={16} />}
    <span>{success ? 'Salvo!' : 'Salvar Pacotes'}</span>
  </button>`
);

code = code.replace(
  /<button\s+onClick=\{handleSaveFaq\}\s+className="inline-flex items-center gap-2 px-6 py-2\.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"\s*>\s*<Save size=\{16\} \/>\s*<span>Salvar FAQ<\/span>\s*<\/button>/g,
  `<button
    onClick={handleSaveFaq}
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
  >
    {success ? <Check size={16} /> : <Save size={16} />}
    <span>{success ? 'Salvo!' : 'Salvar FAQ'}</span>
  </button>`
);

fs.writeFileSync('src/pages/admin/ContentCMS.tsx', code);
