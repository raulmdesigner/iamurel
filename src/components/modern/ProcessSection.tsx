import React from 'react';
import { MessageSquareText, Compass, PenTool, CheckCircle, Clock, Calendar, ShieldAlert } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function ProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Contato inicial',
      desc: 'Alinhamento rápido do momento atual da marca e do objetivo principal através do formulário ou WhatsApp.',
      timeframe: 'Retorno em até 24h úteis',
      icon: MessageSquareText,
    },
    {
      step: '02',
      title: 'Diagnóstico da rota',
      desc: 'Definição técnica da melhor opção entre Fundação, Constância ou Conversão, sem empurrar serviços desnecessários.',
      timeframe: 'Proposta clara em 1 a 2 dias',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Produção e aprovação',
      desc: 'Criação estruturada com ciclos ágeis de revisão e canal direto para validações objetivas.',
      timeframe: 'Lotes a cada 7 a 15 dias',
      icon: PenTool,
    },
    {
      step: '04',
      title: 'Entrega final',
      desc: 'Arquivos organizados em nuvem, em alta resolução e nos formatos corretos, prontos para publicação ou veiculação.',
      timeframe: 'Pasta estruturada e acessível',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="processo" className="py-20 md:py-28 px-6 bg-surface border-b border-border relative">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-1.5">
                <Clock size={14} />
                Transparência Operacional
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                O que acontece depois que você entra em contato?
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Processo previsível do primeiro diagnóstico até a entrega dos arquivos finais. Sem reuniões intermináveis ou burocracia desnecessária.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-muted bg-bg border border-border px-4 py-2.5 rounded-xl shrink-0 self-start md:self-end">
              <Clock size={14} className="text-action" />
              <span>Resposta em até 24h úteis</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-bg border border-border hover:border-action/40 rounded-2xl p-6 sm:p-7 space-y-5 flex flex-col justify-between transition-all duration-300 shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-black text-action/30">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border text-action flex items-center justify-center">
                        <Icon size={16} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold font-display text-text">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-mono text-action font-semibold">
                    <Calendar size={12} />
                    <span>{item.timeframe}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-bg border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
            <span>Todas as etapas contam com canal direto de alinhamento para dúvidas e aprovações rápidas.</span>
            <span className="font-semibold text-text shrink-0">Sem surpresas de escopo</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
