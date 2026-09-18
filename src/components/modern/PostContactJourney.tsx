import React from 'react';
import { Send, FileSearch, PhoneCall, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../../types';
import { ScrollReveal } from './ScrollReveal';

interface PostContactJourneyProps {
  settings: SiteSettings;
}

export function PostContactJourney({ settings }: PostContactJourneyProps) {
  const steps = [
    {
      num: '01',
      icon: Send,
      title: settings.journey_step_1_title || '1. Confirmação & Análise',
      desc: settings.journey_step_1_desc || 'Recebemos suas respostas no CRM e analisamos seu perfil atual, segmento e principais concorrentes.',
      timing: 'Imediato',
      highlight: 'Análise de perfil & nicho'
    },
    {
      num: '02',
      icon: FileSearch,
      title: settings.journey_step_2_title || '2. Diagnóstico em até 24h',
      desc: settings.journey_step_2_desc || 'Retornamos pelo WhatsApp comercial com apontamentos sinceros sobre o que a sua marca precisa de fato.',
      timing: 'Em até 24h úteis',
      highlight: 'Retorno direto no WhatsApp'
    },
    {
      num: '03',
      icon: PhoneCall,
      title: settings.journey_step_3_title || '3. Recomendação de Rota',
      desc: settings.journey_step_3_desc || 'Apresentamos a proposta com escopo fechado, prazos e investimento. Você só contrata se fizer sentido.',
      timing: 'Sem pressão comercial',
      highlight: 'Proposta clara & fechada'
    },
  ];

  return (
    <section className="py-20 md:py-24 px-6 bg-bg border-b border-border relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center justify-center gap-2">
              <Sparkles size={15} />
              Processo Transparente
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-text tracking-tight">
              {settings.journey_title || 'O que acontece após você enviar o formulário?'}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {settings.journey_subtitle || 'Sem surpresas, sem ligações invasivas de telemarketing. Um processo previsível de diagnóstico e alinhamento:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-surface border border-border/90 p-8 rounded-3xl relative flex flex-col justify-between space-y-6 hover:border-action/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between border-b border-border/70 pb-4">
                    <span className="text-3xl font-display font-black text-text/20 group-hover:text-action/30 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-action/10 text-action flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-action font-bold block">
                      {step.highlight}
                    </span>
                    <h4 className="text-lg font-bold text-text font-display">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted font-mono text-[11px]">Prazo de resposta:</span>
                    <span className="font-extrabold text-action bg-action/10 px-2.5 py-1 rounded-full text-[11px]">
                      {step.timing}
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
