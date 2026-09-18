const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/ContentCMS.tsx', 'utf8');

const packageHeader = `
              <div key={pkg.id} className="border border-border rounded-lg bg-surface relative">
                <div className="absolute top-4 right-4 flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-text cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={pkg.status === 'active'}
                      onChange={(e) => {
                        const updated = [...packages];
                        updated[idx].status = e.target.checked ? 'active' : 'archived';
                        setPackages(updated);
                      }}
                      className="accent-action"
                    />
                    Público (Visível)
                  </label>
                  <button
                    onClick={() => setPackages(packages.filter(p => p.id !== pkg.id))}
                    className="text-muted hover:text-red-500 transition-colors p-1"
                    title="Excluir Pacote"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-4 md:p-6 space-y-6">
`;

code = code.replace(
  /<div key=\{pkg\.id\} className="border border-border rounded-lg bg-surface">\s*<div className="p-4 md:p-6 space-y-6">/g,
  packageHeader
);

fs.writeFileSync('src/pages/admin/ContentCMS.tsx', code);
