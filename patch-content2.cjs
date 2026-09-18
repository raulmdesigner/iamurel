const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/ContentCMS.tsx', 'utf8');

const itemsEditor = `
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-text">Itens do Pacote (Inclusos e Exclusos)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...packages];
                        if (!updated[idx].items) updated[idx].items = [];
                        updated[idx].items.push({
                          id: crypto.randomUUID(),
                          package_id: pkg.id,
                          title: 'Novo Item',
                          quantity: null,
                          order_index: updated[idx].items.length,
                          is_included: true
                        });
                        setPackages(updated);
                      }}
                      className="text-[10px] bg-action/10 text-action px-2 py-1 rounded font-bold uppercase"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pkg.items?.map((item, itemIdx) => (
                      <div key={item.id} className="flex items-start gap-2 bg-bg p-2 rounded border border-border">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...packages];
                              updated[idx].items[itemIdx].title = e.target.value;
                              setPackages(updated);
                            }}
                            className="w-full px-2 py-1 bg-surface border border-border rounded text-[11px]"
                            placeholder="Nome do Item (Ex: Logo Principal)"
                          />
                          <div className="flex items-center gap-4">
                            <input
                              type="text"
                              value={item.quantity || ''}
                              onChange={(e) => {
                                const updated = [...packages];
                                updated[idx].items[itemIdx].quantity = e.target.value;
                                setPackages(updated);
                              }}
                              className="w-20 px-2 py-1 bg-surface border border-border rounded text-[11px]"
                              placeholder="Qtd"
                            />
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-text cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={item.is_included !== false}
                                onChange={(e) => {
                                  const updated = [...packages];
                                  updated[idx].items[itemIdx].is_included = e.target.checked;
                                  setPackages(updated);
                                }}
                                className="accent-action"
                              />
                              Incluso no pacote?
                            </label>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...packages];
                            updated[idx].items = updated[idx].items.filter((_, i) => i !== itemIdx);
                            setPackages(updated);
                          }}
                          className="text-red-500 p-1 hover:bg-red-500/10 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
`;

code = code.replace(
  /                  <\/div>\n                <\/div>\n              <\/div>/,
  '                  </div>\n                </div>\n' + itemsEditor + '              </div>'
);

fs.writeFileSync('src/pages/admin/ContentCMS.tsx', code);
