import React, { useState } from 'react';
import { Check, X, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { IamurelSymbol } from '../brand/IamurelBrand';

export function BeforeAfterComparison() {
  const [viewMode, setViewMode] = useState<'sideBySide' | 'toggle'>('sideBySide');
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-action/10 text-action rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Comparação Direta</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-text">
            A diferença entre postar por obrigação e postar para vender.
          </h3>
          <p className="text-sm text-muted">
            Veja como um tema comum se transforma de um post genérico em uma peça com autoridade e acabamento profissional.
          </p>
        </div>

        {/* Toggle para telas menores */}
        <div className="sm:hidden flex bg-bg p-1 rounded-lg border border-border">
          <button
            onClick={() => setActiveTab('before')}
            className={`flex-1 py-1.5 text-xs font-bold rounded cursor-pointer ${
              activeTab === 'before' ? 'bg-red-50 text-red-700' : 'text-muted'
            }`}
          >
            Sem Direção
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`flex-1 py-1.5 text-xs font-bold rounded cursor-pointer ${
              activeTab === 'after' ? 'bg-action text-white' : 'text-muted'
            }`}
          >
            Com IAMUREL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* CARD 1: O Que a Maioria Faz (Antes / Sem Direção) */}
        <div
          className={`bg-bg border border-red-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
            activeTab === 'before' ? 'block' : 'hidden sm:flex'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
              <X size={16} />
              <span>O que a maioria faz (Sem Direção)</span>
            </div>
            <span className="text-[10px] text-muted bg-surface px-2.5 py-0.5 rounded border border-border">
              Amador
            </span>
          </div>

          {/* Visual representativo do post amador */}
          <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-inner opacity-90">
            <div className="text-[10px] text-gray-400 font-sans tracking-wide">
              TEMPLATE CANVA PADRÃO #402
            </div>
            <div className="p-4 bg-yellow-50/70 border border-yellow-200 rounded text-center space-y-2">
              <span className="text-xs font-bold text-gray-700 block">
                "Dica do Dia: Invista em Você!"
              </span>
              <p className="text-[11px] text-gray-500 leading-tight">
                Mude sua mentalidade hoje mesmo para alcançar o sucesso profissional. Curta e compartilhe com os amigos.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-1 text-[10px] text-gray-400">
              <span>#foco</span>
              <span>#sucesso</span>
              <span>#mindset</span>
              <span>#marketing</span>
            </div>
          </div>

          {/* Falhas do modelo */}
          <div className="space-y-2 text-xs text-muted">
            <div className="flex items-start gap-2">
              <X size={15} className="text-red-500 shrink-0 mt-0.5" />
              <span>Texto vago e motivacional sem conexão com serviço pago</span>
            </div>
            <div className="flex items-start gap-2">
              <X size={15} className="text-red-500 shrink-0 mt-0.5" />
              <span>Visual idêntico ao de concorrentes que usam templates gratuitos</span>
            </div>
            <div className="flex items-start gap-2">
              <X size={15} className="text-red-500 shrink-0 mt-0.5" />
              <span>Audiência passa direto pelo feed sem perceber autoridade</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Com a IAMUREL (Design com Intenção & Conteúdo com Direção) */}
        <div
          className={`bg-surface border-2 border-action/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden ${
            activeTab === 'after' ? 'block' : 'hidden sm:flex'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-action font-extrabold text-xs uppercase tracking-wider">
              <Check size={16} />
              <span>Com a IAMUREL (Design com Intenção)</span>
            </div>
            <span className="text-[10px] font-bold text-white bg-action px-2.5 py-0.5 rounded-full">
              Pronto para Postar
            </span>
          </div>

          {/* Visual representativo do post profissional IAMUREL */}
          <div className="p-5 bg-dark text-white rounded-xl space-y-4 border border-border-dark shadow-sm">
            <div className="flex items-center justify-between text-[10px] text-bg/60 border-b border-border-dark pb-2">
              <span className="text-action font-bold uppercase tracking-wider">ESTRATÉGIA EDITORIAL 4:5</span>
              <IamurelSymbol className="w-4 h-4 text-action" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-action font-bold uppercase tracking-wider block">
                Quebra de Objeção
              </span>
              <p className="text-base font-display font-extrabold text-white leading-snug">
                "Por que o cliente que pede desconto no primeiro contato é o que mais traz prejuízo no pós-venda."
              </p>
              <p className="text-xs text-bg/70 leading-relaxed pt-1">
                Uma análise prática sobre posicionamento de preço, filtro de demanda e preservação de margem de lucro.
              </p>
            </div>
            <div className="pt-2 border-t border-border-dark flex items-center justify-between text-[10px] text-bg/50 font-medium">
              <span>Alta Resolução (PNG 1080x1350)</span>
              <span className="text-action font-bold">Deslize para ler →</span>
            </div>
          </div>

          {/* Benefícios reais */}
          <div className="space-y-2 text-xs text-text/90">
            <div className="flex items-start gap-2">
              <Check size={15} className="text-action shrink-0 mt-0.5 stroke-[2.5]" />
              <span className="font-semibold text-text">Gancho inicial que atrai tomadores de decisão dispostos a pagar</span>
            </div>
            <div className="flex items-start gap-2">
              <Check size={15} className="text-action shrink-0 mt-0.5 stroke-[2.5]" />
              <span className="font-semibold text-text">Identidade visual e diagramação autoral com alto valor percebido</span>
            </div>
            <div className="flex items-start gap-2">
              <Check size={15} className="text-action shrink-0 mt-0.5 stroke-[2.5]" />
              <span className="font-semibold text-text">Arquivo final 100% pronto para download e publicação imediata</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
