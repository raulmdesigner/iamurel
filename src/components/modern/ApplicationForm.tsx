import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Instagram, Globe } from 'lucide-react';
import { SiteSettings } from '../../types';
import { dataLayer } from '../../lib/data';

interface ApplicationFormProps {
  settings: SiteSettings;
  selectedPlan?: string | null;
}

export function ApplicationForm({ settings, selectedPlan }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    socialOrWebsite: '',
    selectedRoute: selectedPlan || 'Constância',
    mainProblem: '',
    investmentRange: 'R$ 1.500 a R$ 3.000/mês',
  });

  const routes = [
    { id: 'Fundação', label: 'Fundação', desc: 'Identidade e base de marca' },
    { id: 'Constância', label: 'Constância', desc: 'Produção editorial mensal' },
    { id: 'Conversão', label: 'Conversão', desc: 'Campanha ou lançamento pontual' },
  ];

  const investmentRanges = [
    'Até R$ 1.500',
    'R$ 1.500 a R$ 3.000/mês',
    'R$ 3.000 a R$ 6.000/mês',
    'Acima de R$ 6.000',
  ];

  // Gera mensagem estruturada para o WhatsApp comercial
  const getStructuredWhatsAppMessage = () => {
    const rawText = `*Aplicação IAMUREL — Nova Solicitação de Diagnóstico*
• *Nome:* ${formData.name}
• *WhatsApp:* ${formData.whatsapp}
• *Instagram / Site:* ${formData.socialOrWebsite || 'Não informado'}
• *Rota de Interesse:* ${formData.selectedRoute}
• *Problema Principal:* ${formData.mainProblem || 'Alinhamento geral de marca'}
• *Faixa de Investimento:* ${formData.investmentRange}`;
    return encodeURIComponent(rawText);
  };

  const whatsappDirectNumber = settings.whatsapp_number
    ? settings.whatsapp_number.replace(/\D/g, '')
    : '';

  const whatsappDirectUrl = whatsappDirectNumber
    ? `https://wa.me/${whatsappDirectNumber}?text=${getStructuredWhatsAppMessage()}`
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const leadPayload = {
      name: formData.name,
      phone: formData.whatsapp,
      email: '',
      need: `Rota: ${formData.selectedRoute} | ${formData.socialOrWebsite}`,
      message: `Problema: ${formData.mainProblem} | Faixa: ${formData.investmentRange}`,
      objective: formData.selectedRoute,
      timeframe: 'Imediato',
      investment_range: formData.investmentRange,
      preferred_channel: 'whatsapp',
      origin: 'Formulário de Aplicação Qualificada'
    };

    try {
      const res = await dataLayer.submitLead(leadPayload);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || 'Não foi possível salvar os dados. Você pode nos chamar diretamente no WhatsApp!');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao enviar. Por favor, clique no botão para chamar direto no WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 size={28} className="stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-display text-text">
            Aplicação Recebida com Sucesso!
          </h3>
          <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
            Avaliamos cada aplicação individualmente para confirmar o momento da marca. Retornamos em até 24 horas úteis via WhatsApp.
          </p>
        </div>

        {whatsappDirectUrl && (
          <div className="pt-2">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-action hover:bg-action-hover text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <MessageCircle size={16} />
              <span>Enviar dados via WhatsApp para resposta imediata</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
          {errorMessage}
        </div>
      )}

      {/* 1. Nome e WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text block">
            1. Seu Nome <span className="text-action">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Carlos Silva"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text block">
            WhatsApp para Contato <span className="text-action">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="(00) 00000-0000"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
          />
        </div>
      </div>

      {/* 2. Instagram ou site atual */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text block">
          2. Instagram ou site atual do seu negócio <span className="text-action">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <Instagram size={14} />
          </div>
          <input
            type="text"
            required
            placeholder="@suamarca ou https://seusite.com.br"
            value={formData.socialOrWebsite}
            onChange={(e) => setFormData({ ...formData, socialOrWebsite: e.target.value })}
            className="w-full pl-9 pr-4 py-3 bg-bg border border-border rounded-xl text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Rota de interesse */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text block">
          3. Rota de interesse principal <span className="text-action">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {routes.map((r) => {
            const isSelected = formData.selectedRoute.toLowerCase().includes(r.id.toLowerCase());
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setFormData({ ...formData, selectedRoute: r.id })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-action bg-action/5 ring-1 ring-action text-text'
                    : 'border-border bg-bg hover:border-action/40 text-muted hover:text-text'
                }`}
              >
                <div className="text-xs font-bold text-text flex items-center justify-between">
                  <span>{r.label}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-action" />}
                </div>
                <span className="text-[11px] text-muted block mt-0.5">{r.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Principal problema a ser resolvido agora */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text block">
          4. Principal gargalo ou problema a ser resolvido agora <span className="text-action">*</span>
        </label>
        <textarea
          required
          rows={3}
          placeholder="Ex: Já temos clientes, mas nosso visual no feed parece amador e não reflete o valor do que entregamos..."
          value={formData.mainProblem}
          onChange={(e) => setFormData({ ...formData, mainProblem: e.target.value })}
          className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all resize-none"
        />
      </div>

      {/* 5. Faixa de investimento prevista */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text block">
          5. Faixa de investimento prevista para esta etapa <span className="text-action">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {investmentRanges.map((range) => {
            const isSelected = formData.investmentRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setFormData({ ...formData, investmentRange: range })}
                className={`px-3 py-2.5 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-action bg-action text-white shadow-xs'
                    : 'border-border bg-bg text-muted hover:text-text hover:border-action/40'
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* LGPD Consent & Submit */}
      <div className="pt-2 space-y-4">
        <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer">
          <input type="checkbox" required className="mt-0.5 accent-action rounded" />
          <span>Autorizo o contato da IAMUREL exclusivamente para envio do diagnóstico solicitado.</span>
        </label>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-action hover:bg-action-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? 'Enviando Aplicação...' : 'Enviar Aplicação para Análise'}
            <ArrowRight size={14} />
          </button>

          {whatsappDirectUrl && (
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-muted hover:text-action inline-flex items-center justify-center gap-2 transition-colors py-2"
            >
              <MessageCircle size={15} />
              <span>Ou enviar dados direto via WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </form>
  );
}
