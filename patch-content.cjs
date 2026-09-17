const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/ContentCMS.tsx', 'utf8');

const itemTemplate = `
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const newPackages = [...packages];
                              newPackages[pkgIdx].items![itemIdx].title = e.target.value;
                              setPackages(newPackages);
                            }}
                            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm"
                            placeholder="Nome do Item (Ex: Logo Principal)"
                          />
                          <div className="flex items-center gap-4">
                            <input
                              type="text"
                              value={item.quantity || ''}
                              onChange={(e) => {
                                const newPackages = [...packages];
                                newPackages[pkgIdx].items![itemIdx].quantity = e.target.value;
                                setPackages(newPackages);
                              }}
                              className="w-1/2 px-3 py-2 bg-bg border border-border rounded-lg text-sm"
                              placeholder="Qtd (opcional)"
                            />
                            <label className="flex items-center gap-2 text-xs font-bold text-text cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={item.is_included !== false}
                                onChange={(e) => {
                                  const newPackages = [...packages];
                                  newPackages[pkgIdx].items![itemIdx].is_included = e.target.checked;
                                  setPackages(newPackages);
                                }}
                                className="accent-action"
                              />
                              Incluso no pacote?
                            </label>
                          </div>
                        </div>
`;

code = code.replace(
  /<input\s+type="text"\s+value=\{item\.title\}[\s\S]*?placeholder="Nome do Item[^>]*\/>/g,
  itemTemplate
);

code = code.replace(
  "id: crypto.randomUUID(), package_id: pkg.id, title: 'Novo Item', quantity: null, order_index: pkg.items?.length || 0",
  "id: crypto.randomUUID(), package_id: pkg.id, title: 'Novo Item', quantity: null, order_index: pkg.items?.length || 0, is_included: true"
);

fs.writeFileSync('src/pages/admin/ContentCMS.tsx', code);
