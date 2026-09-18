import React from 'react';
import { Compass, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function MethodSection() {
  const steps = [
    {
      num: '01',
      icon: Compass,
      name: 'Contexto',
      tag: 'Diagnóstico & Estratégia',
      desc: 'Entendemos a fundo o seu negócio, o público que você deseja atrair e o objetivo real de cada entrega.',
      highlight: 'Sem briefing genérico.',
    },
    {
      num: '02',
      icon: Cpu,
      name: 'Exploração',
      tag: 'Pesquisa & IA Aplicada',
      desc: 'Usamos ferramentas de IA para pesquisar referências, gerar múltiplas possibilidades visuais e acelerar variações.',
      highlight: 'Velocidade sem retrabalho.',
    },
    {
      num: '03',
      icon: Sparkles,
      name: 'Direção',
      tag: 'Curadoria & Acabamento',
      desc: 'Selecionamos as melhores ideias, refinamos a tipografia, a cor e a narrativa com olhar estético 100% humano.',
      highlight: 'Acabamento autoral.',
    },
  ];

  return (
    <section id="metodo" className="py-20 md:py-28 px-6 bg-bg border-b border-border relative">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-1.5">
                <Cpu size={14} />
                Método de Produção
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                IA na velocidade. Direção humana no critério.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Mais velocidade sem perder o padrão autoral. A tecnologia elimina o trabalho braçal; a curadoria humana garante o rigor estético.
              </p>
            </div>

            <div className="text-xs text-muted font-mono bg-surface border border-border px-4 py-2.5 rounded-xl shrink-0 self-start md:self-end">
              3 Etapas Claras
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-surface border border-border hover:border-action/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between transition-all duration-300 shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-display font-black text-action/30">
                        {step.num}
                      </span>
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-muted bg-bg border border-border px-2.5 py-1 rounded-md">
                        {step.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-action/10 text-action flex items-center justify-center font-bold">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-2xl font-bold font-display text-text">
                        {step.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-action flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="stroke-[2.5]" />
                      {step.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
