const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');

// The dynamic packages I created
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

// Original method steps:
const methodSteps = `
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-4xl font-display font-light text-muted/30">01</span>
              <h3 className="text-xl font-bold font-display text-text">Pesquisa & Diagnóstico</h3>
              <p className="text-sm text-muted">
                Antes de qualquer layout, entendemos o mercado, os concorrentes e o objetivo do material.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-4xl font-display font-light text-muted/30">02</span>
              <h3 className="text-xl font-bold font-display text-text">Direção & Geração IA</h3>
              <p className="text-sm text-muted">
                Usamos ferramentas de IA para gerar múltiplos caminhos visuais e variações de copy rapidamente.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-4xl font-display font-light text-muted/30">03</span>
              <h3 className="text-xl font-bold font-display text-text">Lapidação & Entrega</h3>
              <p className="text-sm text-muted">
                O diretor de arte refina, aplica a identidade da sua marca e finaliza os arquivos para uso imediato.
              </p>
            </div>
          </div>
`;

// We currently have dynamic packages inside <section id="como-funciona"> (which should have methodSteps)
code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-8">[\s\S]*?<section id="pacotes" className="py-16 md:py-24 px-6 bg-bg border-b border-border">/,
  methodSteps + '\n        </div>\n        </ScrollReveal>\n      </section>\n      {/* 5. SEÇÃO "PARA QUEM É" (EXEMPLOS REAIS DE CLIENTES) */}\n      <section className="py-16 md:py-24 px-6 bg-surface border-b border-border">\n        <ScrollReveal>\n          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">\n            <div className="space-y-6">\n              <h2 className="text-3xl md:text-4xl font-display font-bold text-text leading-tight">\n                Para marcas que querem fugir do "mais do mesmo".\n              </h2>\n              <ul className="space-y-4">\n                <li className="flex items-start gap-3">\n                  <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />\n                  <p className="text-sm text-muted">Empresas que precisam renovar a marca mas têm urgência.</p>\n                </li>\n                <li className="flex items-start gap-3">\n                  <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />\n                  <p className="text-sm text-muted">Especialistas e infoprodutores buscando autoridade visual.</p>\n                </li>\n                <li className="flex items-start gap-3">\n                  <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />\n                  <p className="text-sm text-muted">Negócios locais querendo profissionalizar a comunicação no Instagram.</p>\n                </li>\n              </ul>\n            </div>\n            <div className="relative">\n              <div className="aspect-square bg-bg rounded-2xl border border-border overflow-hidden relative shadow-lg">\n                <div className="absolute inset-0 bg-gradient-to-tr from-action/5 to-transparent z-10 pointer-events-none" />\n                {/* Placeholder para uma imagem de bastidores ou resultado */}\n                <div className="absolute inset-0 flex items-center justify-center text-muted flex-col gap-2 bg-surface/50 backdrop-blur-sm">\n                  <Smartphone className="w-8 h-8 opacity-20" />\n                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Direção Criativa</span>\n                </div>\n              </div>\n              <div className="absolute -bottom-6 -left-6 bg-bg border border-border p-4 rounded-xl shadow-xl flex items-center gap-4">\n                <div className="w-12 h-12 rounded-full bg-action/10 flex items-center justify-center text-action font-bold text-xl">\n                  +3\n                </div>\n                <div>\n                  <p className="text-xs font-bold text-text">Dias úteis</p>\n                  <p className="text-[10px] text-muted">Prazo médio de entregas mensais</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ScrollReveal>\n      </section>\n      {/* 6. SERVIÇOS (TRÊS CAMINHOS) */}\n      <section id="pacotes" className="py-16 md:py-24 px-6 bg-bg border-b border-border">'
);

// Now replace the hardcoded packages in section id="pacotes" with dynamicPackages
code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-8">\s*\{\/\* Opção 1: Marca \*\/\}[\s\S]*?<\/div>\n        <\/div>\n        <\/ScrollReveal>\n      <\/section>/,
  dynamicPackages + '\n        </div>\n        </ScrollReveal>\n      </section>'
);

fs.writeFileSync('src/pages/public/Home.tsx', code);
