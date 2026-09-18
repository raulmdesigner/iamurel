import React, { useState, useEffect } from 'react';
import { dataLayer } from '../../lib/data';
import { AppearanceSettings } from '../../types';
import { Palette, Check, Save, Sparkles, RefreshCw, UploadCloud, Loader2, Layers } from 'lucide-react';
import { uploadMediaToSupabase, isSupabaseConfigured } from '../../lib/supabase';

export default function AppearanceCMS() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    dataLayer.getAppearance().then(setAppearance);
  }, []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, field: keyof AppearanceSettings) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    if (!isSupabaseConfigured) {
      alert("Configuração do Supabase necessária no menu Configurações da Base de Dados.");
      return;
    }

    const file = e.target.files[0];
    setUploadingField(field);

    const { url, error } = await uploadMediaToSupabase(file);
    
    if (error) {
      alert(`Erro no upload: ${error}`);
    } else if (url && appearance) {
      setAppearance({ ...appearance, [field]: url });
    }
    
    setUploadingField(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!appearance) return;
    await dataLayer.saveAppearance(appearance);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
      font_pairing: 'editorial',
      hero_video_url: null,
      hero_image_1_url: null,
      hero_image_2_url: null,
      hero_image_3_url: null,
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

        {/* Mídia do Hero */}
        <div className="pt-6 border-t border-border space-y-4">
          <div>
            <label className="block text-sm font-bold text-text mb-1 flex items-center gap-2">
              <UploadCloud size={16} className="text-action" />
              Mídia da Página Inicial (Via Supabase)
            </label>
            <p className="text-xs text-muted mb-4">
              Faça o upload do vídeo principal (Reel) e imagens do portfólio para compor a abertura do site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { id: 'hero_video_url', label: 'Vídeo Anúncio / Reel (MP4)', accept: 'video/*' },
              { id: 'hero_image_1_url', label: 'Imagem Flutuante Central 1', accept: 'image/*' },
              { id: 'hero_image_2_url', label: 'Imagem Flutuante Esquerda 2', accept: 'image/*' },
              { id: 'hero_image_3_url', label: 'Imagem Flutuante Direita 3', accept: 'image/*' },
            ].map((field) => (
              <div key={field.id} className="p-4 border border-border rounded-lg bg-surface">
                <span className="block text-xs font-bold text-text mb-2">{field.label}</span>
                {appearance[field.id as keyof AppearanceSettings] ? (
                  <div className="mb-3">
                    {field.accept.includes('video') ? (
                      <video src={appearance[field.id as keyof AppearanceSettings] as string} className="h-24 w-auto rounded border border-border object-cover" muted />
                    ) : (
                      <img src={appearance[field.id as keyof AppearanceSettings] as string} className="h-24 w-auto rounded border border-border object-cover" alt="Preview" />
                    )}
                  </div>
                ) : (
                  <div className="h-24 w-full rounded border border-dashed border-border mb-3 flex items-center justify-center bg-bg text-[10px] text-muted">
                    Sem mídia enviada
                  </div>
                )}

                <div className="relative mt-2">
                  <input
                    type="url"
                    placeholder="URL direta (se não for upload)"
                    value={appearance[field.id as keyof AppearanceSettings] as string || ''}
                    onChange={(e) => setAppearance({ ...appearance, [field.id]: e.target.value })}
                    className="w-full px-3 py-1.5 border border-border rounded text-xs bg-bg focus:border-action outline-none"
                  />
                </div>

                <div className="relative mt-2">
                  <input
                    type="file"
                    accept={field.accept}
                    onChange={(e) => handleFileUpload(e, field.id as keyof AppearanceSettings)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    disabled={uploadingField === field.id || !isSupabaseConfigured}
                  />
                  <div className="flex items-center justify-center gap-2 px-3 py-2 border border-border rounded text-xs bg-bg text-text pointer-events-none">
                    {uploadingField === field.id ? (
                      <><Loader2 size={14} className="animate-spin text-action" /> Enviando...</>
                    ) : (
                      <><UploadCloud size={14} /> {appearance[field.id as keyof AppearanceSettings] ? 'Trocar Arquivo' : 'Escolher Arquivo'}</>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Módulos do Site */}
        <div className="pt-6 border-t border-border space-y-4">
          <div>
            <label className="block text-sm font-bold text-text mb-1 flex items-center gap-2">
              <Layers size={16} className="text-action" />
              Módulos e Seções do Site
            </label>
            <p className="text-xs text-muted mb-4">
              Ative ou desative seções específicas do site para ajustar a experiência.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'enable_3d', label: 'Efeito 3D Scroll', desc: 'Animações de entrada 3D' },
              { id: 'enable_text_banner', label: 'Faixa de Texto', desc: 'Banner rotativo' },
              { id: 'enable_showcase', label: 'Portfólio/Casos', desc: 'Demonstrações' },
              { id: 'enable_services', label: 'Como Funciona', desc: 'Metodologia e serviços' },
              { id: 'enable_clients', label: 'Para Quem É', desc: 'Exemplos reais' },
              { id: 'enable_packages', label: 'Pacotes/Preços', desc: 'Sua esteira de serviços' },
              { id: 'enable_faq', label: 'Perguntas (FAQ)', desc: 'Dúvidas frequentes' },
              { id: 'enable_contact_form', label: 'Contato Final', desc: 'Rodapé de contato' },
            ].map((toggle) => (

              <div key={toggle.id} className="p-4 border border-border rounded-lg bg-surface flex items-start justify-between gap-4">
                <div>
                  <span className="block text-sm font-bold text-text mb-0.5">{toggle.label}</span>
                  <p className="text-xs text-muted">{toggle.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAppearance({ ...appearance, [toggle.id]: !(appearance as any)[toggle.id] })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${(appearance as any)[toggle.id] !== false ? 'bg-action' : 'bg-muted/30'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${(appearance as any)[toggle.id] !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
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
            {saveSuccess ? <Check size={16} className="text-white" /> : <Save size={16} />}
            <span>{saveSuccess ? 'Salvo com Sucesso!' : 'Salvar & Aplicar Aparência'}</span>
          </button>

        </div>
      </form>
    </div>
  );
}
