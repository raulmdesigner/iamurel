import React, { useState, useEffect } from 'react';
import { dataLayer } from '../../lib/data';
import { AppearanceSettings } from '../../types';
import { Palette, Check, Save, Sparkles, RefreshCw } from 'lucide-react';

export default function AppearanceCMS() {
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    dataLayer.getAppearance().then(setAppearance);
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!appearance) return;
    await dataLayer.saveAppearance(appearance);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  function handleReset() {
    const defaultVals: AppearanceSettings = {
      primary_color: '#242422',
      action_color: '#D95B43',
      bg_tone: 'cream',
      border_style: 'minimal',
      motion_level: 'balanced',
      font_pairing: 'editorial'
    };
    setAppearance(defaultVals);
  }

  if (!appearance) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-display text-text">Editor de Identidade & Aparência</h2>
          <p className="text-sm text-muted">Ajuste o tom, as cores de destaque e a densidade de layout do site.</p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold animate-fade-in">
            <Check size={16} />
            <span>Aparência salva e aplicada!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-surface p-8 rounded-lg border border-border">
        {/* Seletor de Cores Primárias e de Ação */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text font-mono">
            Paleta Cromática do Sistema
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-bg border border-border rounded space-y-3">
              <label className="text-xs font-semibold text-text block">
                Cor de Ação / Destaque Comercial
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.action_color}
                  onChange={e => setAppearance({ ...appearance, action_color: e.target.value })}
                  className="w-12 h-10 p-0 rounded border border-border cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={appearance.action_color}
                  onChange={e => setAppearance({ ...appearance, action_color: e.target.value })}
                  className="font-mono text-xs px-3 py-2 bg-surface border border-border rounded w-28 uppercase"
                />
                <span className="text-xs text-muted">Botões e links principais</span>
              </div>
            </div>

            <div className="p-4 bg-bg border border-border rounded space-y-3">
              <label className="text-xs font-semibold text-text block">
                Cor Primária de Texto / Carvão
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.primary_color}
                  onChange={e => setAppearance({ ...appearance, primary_color: e.target.value })}
                  className="w-12 h-10 p-0 rounded border border-border cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={appearance.primary_color}
                  onChange={e => setAppearance({ ...appearance, primary_color: e.target.value })}
                  className="font-mono text-xs px-3 py-2 bg-surface border border-border rounded w-28 uppercase"
                />
                <span className="text-xs text-muted">Títulos e contrastes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tipografia & Estilo de Bordas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text block">
              Par Tipográfico Principal
            </label>
            <select
              value={appearance.font_pairing}
              onChange={e => setAppearance({ ...appearance, font_pairing: e.target.value as any })}
              className="w-full px-4 py-2.5 bg-bg border border-border rounded text-sm"
            >
              <option value="editorial">Playfair Display (Serif) + Plus Jakarta Sans (Padrão IAMUREL)</option>
              <option value="contemporary">Plus Jakarta Sans Integral (Contemporâneo)</option>
              <option value="grotesk">Monospaced & Grotesk (Técnico / Editorial)</option>
            </select>
            <p className="text-[11px] text-muted">Mantém alto contraste sem cair em fontes genéricas.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-text block">
              Estilo de Cantos / Bordas dos Elementos
            </label>
            <select
              value={appearance.border_style}
              onChange={e => setAppearance({ ...appearance, border_style: e.target.value as any })}
              className="w-full px-4 py-2.5 bg-bg border border-border rounded text-sm"
            >
              <option value="minimal">Sutil (4px a 8px) — Recomendado Anti-Slop</option>
              <option value="sharp">Reto Puro (0px) — Editorial Vanguardista</option>
              <option value="rounded">Arredondado Moderado (12px)</option>
            </select>
            <p className="text-[11px] text-muted">Evita bordas de 30px infladas de templates genéricos.</p>
          </div>
        </div>

        {/* Nível de Animação */}
        <div className="space-y-3 pt-6 border-t border-border">
          <label className="text-xs font-semibold text-text block">
            Intensidade de Movimento & Transições
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'reduced', label: 'Estático / Reduzido', desc: 'Respeita acessibilidade e carrega com foco imediato.' },
              { id: 'balanced', label: 'Equilibrado (Padrão)', desc: 'Microinterações discretas de hover e clique.' },
              { id: 'expressive', label: 'Fluido Moderado', desc: 'Transições suaves entre abas e modais.' }
            ].map(item => (
              <label
                key={item.id}
                className={`p-4 rounded border cursor-pointer transition-colors ${
                  appearance.motion_level === item.id
                    ? 'border-action bg-action/5'
                    : 'border-border bg-bg hover:border-text/30'
                }`}
              >
                <input
                  type="radio"
                  name="motion_level"
                  value={item.id}
                  checked={appearance.motion_level === item.id}
                  onChange={() => setAppearance({ ...appearance, motion_level: item.id as any })}
                  className="sr-only"
                />
                <span className="font-semibold text-xs block text-text">{item.label}</span>
                <span className="text-[11px] text-muted block mt-1">{item.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-border text-muted hover:text-text rounded text-xs transition-colors cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Restaurar Padrão IAMUREL</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Save size={16} />
            <span>Salvar & Aplicar Aparência</span>
          </button>
        </div>
      </form>
    </div>
  );
}
