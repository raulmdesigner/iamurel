const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

const dynamicPackages = `
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.filter(p => p.status === 'active').sort((a, b) => a.order_index - b.order_index).map((pkg) => (
            <div key={pkg.id} className={\`p-8 bg-surface border-2 \${pkg.is_highlighted ? 'border-action shadow-md relative' : 'border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1'} rounded-2xl flex flex-col justify-between space-y-6 group\`}>
              {pkg.is_highlighted && (
                <div className="absolute -top-3 left-8 bg-action text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  Mais Solicitado
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <span className={\`text-xs font-bold uppercase \${pkg.is_highlighted ? 'text-action' : 'text-muted'}\`}>{pkg.commercial_role}</span>
                  <h3 className="text-2xl font-bold font-display text-text mt-1">
                    {pkg.level}
                  </h3>
                  <p className="text-xs text-muted mt-2">
                    {pkg.description}
                  </p>
                </div>
                <div className="py-3 border-y border-border">
                  <span className="text-[11px] text-muted block uppercase">Investimento</span>
                  <p className="text-2xl font-bold font-display text-text">
                    {pkg.price_type === 'hidden' ? 'Consulte-nos' : 
                     pkg.price_type === 'starting_at' ? \`A partir de R$ \${pkg.price?.toLocaleString('pt-BR')}\` :
                     pkg.price_type === 'fixed' ? \`R$ \${pkg.price?.toLocaleString('pt-BR')}\` :
                     'Sob consulta'}
                  </p>
                  <span className="text-[11px] text-muted">{pkg.timeframe}</span>
                </div>
                <ul className="space-y-2 text-xs text-text/90">
                  {pkg.items?.sort((a, b) => a.order_index - b.order_index).map(item => (
                    <li key={item.id} className={\`flex items-start gap-2 \${item.is_included === false ? 'opacity-50 line-through' : ''}\`}>
                      {item.is_included === false ? (
                        <XCircle size={14} className="text-muted shrink-0 mt-0.5" />
                      ) : (
                        <Check size={14} className="text-action shrink-0 mt-0.5" />
                      )}
                      <span>{item.quantity ? \`\${item.quantity} \` : ''}{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSelectPlan(pkg.level)}
                className={\`w-full py-3 font-bold text-xs rounded-lg transition-colors cursor-pointer \${pkg.is_highlighted ? 'bg-action hover:bg-action-hover text-white shadow-sm' : 'bg-bg border border-border hover:border-text text-text'}\`}
              >
                Falar sobre este pacote
              </button>
            </div>
            ))}
          </div>
`;

code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-8">[\s\S]*?<\/div>\n        <\/div>\n        <\/ScrollReveal>\n      <\/section>/,
  dynamicPackages + '\n        </div>\n        </ScrollReveal>\n      </section>'
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
