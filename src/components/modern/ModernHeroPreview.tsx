import React, { useState } from 'react';
import { IamurelSymbol, IamurelLogo } from '../brand/IamurelBrand';
import { ArrowRight, Check, Sparkles, ChevronRight, Eye, Download, ShieldCheck } from 'lucide-react';

export function ModernHeroPreview() {
  const [activeTab, setActiveTab] = useState<'carousel' | 'story' | 'identity'>('carousel');

  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Barra Superior com Seleção de Tipo de Trabalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-[11px] font-bold text-action uppercase tracking-wider block">
            Trabalho Real Finalizado
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-text">
            O que você recebe pronto para publicar.
          </h3>
        </div>

        {/* Abas Interativas */}
        <div className="flex bg-bg p-1 rounded-xl border border-border gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('carousel')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'carousel'
                ? 'bg-action text-white shadow-xs'
                : 'text-muted hover:text-text'
            }`}
          >
            Carrossel 4:5
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-action text-white shadow-xs'
                : 'text-muted hover:text-text'
            }`}
          >
            Story & Anúncio
          </button>
          <button
            onClick={() => setActiveTab('identity')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-action text-white shadow-xs'
                : 'text-muted hover:text-text'
            }`}
          >
            Identidade Visual
          </button>
        </div>
      </div>

      {/* Área Central: Visualização Limpa e Direta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Mockup Interativo Visual */}
        <div className="lg:col-span-7">
          {activeTab === 'carousel' && (
            <div className="bg-dark text-white rounded-2xl p-6 sm:p-8 border border-border-dark space-y-6 shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-bg/60 border-b border-border-dark pb-3">
                <div className="flex items-center gap-2">
                  <IamurelSymbol className="w-5 h-5 text-action" />
                  <span className="font-bold text-white uppercase tracking-wider">IAMUREL EDITORIAL</span>
                </div>
                <span className="px-2 py-0.5 bg-action/20 text-action rounded font-mono text-[10px] font-bold">
                  SLIDE 01 DE 06
                </span>
              </div>

              <div className="space-y-4 py-4">
                <span className="text-xs font-mono font-bold text-action uppercase tracking-wider block">
                  POSICIONAMENTO DE VALOR
                </span>
                <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                  "Se você tem que justificar seu preço toda semana, o problema não é o cliente. É a sua comunicação."
                </h4>
                <p className="text-xs sm:text-sm text-bg/70 leading-relaxed max-w-lg">
                  Clientes que pagam mais compram clareza e segurança, não quantidade de posts soltos.
                </p>
              </div>

              <div className="pt-4 border-t border-border-dark flex items-center justify-between text-xs text-bg/50">
                <span className="flex items-center gap-1.5 text-bg/80">
                  <Check size={14} className="text-action" />
                  Arquivo Final PNG 1080x1350
                </span>
                <span className="text-action font-semibold flex items-center gap-1">
                  Arraste para ler <ChevronRight size={14} />
                </span>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="bg-dark text-white rounded-2xl p-6 sm:p-8 border border-border-dark space-y-6 shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-bg/60 border-b border-border-dark pb-3">
                <div className="flex items-center gap-2">
                  <IamurelSymbol className="w-5 h-5 text-action" />
                  <span className="font-bold text-white uppercase tracking-wider">CAMPANHA COMERCIAL</span>
                </div>
                <span className="px-2 py-0.5 bg-action/20 text-action rounded font-mono text-[10px] font-bold">
                  FORMATO VERTICAL 9:16
                </span>
              </div>

              <div className="space-y-4 py-4 text-center max-w-md mx-auto">
                <div className="inline-block px-3 py-1 bg-action text-white rounded-md text-xs font-bold uppercase tracking-wider">
                  Vagas de Consultoria Abertas
                </div>
                <h4 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                  Atendimento estratégico para quem precisa escalar sem perder qualidade.
                </h4>
                <p className="text-xs sm:text-sm text-bg/70">
                  Criativo pronto para veicular no tráfego pago ou nos stories orgânicos do Instagram.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 bg-white text-text px-5 py-2.5 rounded-lg text-xs font-bold">
                    Toque para falar no WhatsApp
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-dark flex items-center justify-between text-xs text-bg/50">
                <span className="flex items-center gap-1.5 text-bg/80">
                  <Check size={14} className="text-action" />
                  Arquivo Final MP4/PNG 1080x1920
                </span>
                <span className="text-action font-semibold">Pronto para Anunciar</span>
              </div>
            </div>
          )}

          {activeTab === 'identity' && (
            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-muted border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <IamurelSymbol className="w-5 h-5 text-action" />
                  <span className="font-bold text-text uppercase tracking-wider">SISTEMA VISUAL DE MARCA</span>
                </div>
                <span className="px-2 py-0.5 bg-bg border border-border rounded font-mono text-[10px] font-bold text-text">
                  VETOR & CORES
                </span>
              </div>

              <div className="space-y-4 py-2">
                <div className="p-4 bg-bg border border-border rounded-xl flex items-center justify-between">
                  <IamurelLogo className="h-8 text-text" />
                  <div className="flex gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#091A24] border border-border" title="#091A24"></span>
                    <span className="w-5 h-5 rounded-full bg-[#FF4A1C]" title="#FF4A1C"></span>
                    <span className="w-5 h-5 rounded-full bg-[#FBFBFA] border border-border" title="#FBFBFA"></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-bg border border-border rounded-lg space-y-1">
                    <span className="font-bold text-text block">Tipografia Proprietária</span>
                    <p className="text-[11px] text-muted">Contraste alto, leitura fluida em telas mobile e impressos.</p>
                  </div>
                  <div className="p-3 bg-bg border border-border rounded-lg space-y-1">
                    <span className="font-bold text-text block">Manual em PDF</span>
                    <p className="text-[11px] text-muted">Regras de uso de cor, espaçamento e logotipo sem complicação.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5 text-text font-medium">
                  <Check size={14} className="text-action" />
                  Manual Completo em PDF + Vetores
                </span>
                <span className="text-action font-semibold">100% Autoral</span>
              </div>
            </div>
          )}
        </div>

        {/* Lado Direito: Garantias e Facilidade para o Cliente */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 bg-bg border border-border rounded-xl space-y-3">
            <span className="text-xs font-bold text-action uppercase tracking-wider block">
              Sem dor de cabeça
            </span>
            <h4 className="text-lg font-bold font-display text-text">
              Você não precisa aprender a usar programas de design.
            </h4>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Não enviamos arquivos complicados que exigem conhecimentos técnicos. Nosso compromisso é entregar tudo 100% pronto para publicar, com visual refinado e textos comerciais que valorizam o seu negócio.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-text/90">
            <div className="flex items-center gap-2">
              <Check size={15} className="text-action shrink-0 stroke-[2.5]" />
              <span>Arquivos em alta resolução (PNG, JPG e PDF para gráfica)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={15} className="text-action shrink-0 stroke-[2.5]" />
              <span>Copy e legendas comerciais prontas para copiar e colar</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={15} className="text-action shrink-0 stroke-[2.5]" />
              <span>Retorno rápido e alinhamento prático pelo WhatsApp</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <span>Solicitar orçamento direto</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
