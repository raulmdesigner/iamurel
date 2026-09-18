import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { SiteSettings } from '../../types';
import { ScrollReveal } from './ScrollReveal';

interface FitCheckProps {
  settings: SiteSettings;
}

export function FitCheck({ settings }: FitCheckProps) {
  const defaultIncluded = [
    'Você possui um serviço, produto ou negócio real.',
    'Está disposto a fornecer informações e aprovar materiais.',
    'Precisa de direção, não apenas de templates.',
    'Valoriza consistência visual e clareza.',
  ];

  const defaultExcluded = [
    'Você quer somente uma arte isolada pelo menor preço.',
    'Ainda não sabe o que vende ou para quem vende.',
    'Espera que a IA substitua estratégia e revisão.',
    'Precisa de publicação diária imediata sem processo de aprovação.',
  ];

  const includedList = settings.fit_included
    ? settings.fit_included.split('\n').filter((l) => l.trim().length > 0)
    : defaultIncluded;

  const excludedList = settings.fit_excluded
    ? settings.fit_excluded.split('\n').filter((l) => l.trim().length > 0)
    : defaultExcluded;

  return (
    <section className="py-20 md:py-28 px-6 bg-bg border-b border-border relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-2">
              <ShieldCheck size={16} />
              Alinhamento de Expectativas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
              {settings.fit_title || 'A IAMUREL é o parceiro certo para o seu negócio?'}
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              {settings.fit_subtitle || 'Acreditamos em transparência radical antes de qualquer contratação comercial. Veja se o nosso modelo se encaixa na sua operação:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Coluna 1: Para quem É */}
            <div className="p-8 sm:p-10 rounded-3xl bg-surface border-2 border-emerald-500/30 shadow-md flex flex-col justify-between space-y-8 relative overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-extrabold">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 block">
                        ALINHAMENTO POSITIVO
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-text font-display">
                        A IAMUREL é ideal para você se:
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Fit Alto
                  </span>
                </div>

                <ul className="space-y-4">
                  {includedList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-text leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} className="stroke-[3]" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-950 flex items-center justify-between">
                <span className="font-semibold">Seu negócio se encaixa nesse perfil?</span>
                <a href="#contato" className="text-emerald-700 hover:text-emerald-900 font-extrabold inline-flex items-center gap-1">
                  Iniciar conversa →
                </a>
              </div>
            </div>

            {/* Coluna 2: Para quem NÃO É */}
            <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-rose-200/80 shadow-sm flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-extrabold">
                      <XCircle size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 block">
                        DESALINHAMENTO
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-text font-display">
                        Talvez NÃO sejamos o fit ideal se:
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    Sem Sinergia
                  </span>
                </div>

                <ul className="space-y-4">
                  {excludedList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-muted leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                        <XCircle size={13} className="stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-bg border border-border text-xs text-muted">
                <span className="font-medium">Preferimos a honestidade de recusar um trabalho a entregar algo fora do nosso padrão autoral.</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
