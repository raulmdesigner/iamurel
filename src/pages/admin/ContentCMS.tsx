import React, { useState, useEffect } from 'react';
import { dataLayer } from '../../lib/data';
import { SiteSettings, Service, Package, FAQ } from '../../types';
import { Save, Plus, Trash2, Check, AlertCircle, Edit3 } from 'lucide-react';

export default function ContentCMS() {
  const [activeTab, setActiveTab] = useState<'geral' | 'servicos' | 'pacotes' | 'faq' | 'legal'>('geral');
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const [st, sv, pk, fq] = await Promise.all([
        dataLayer.getSettings(),
        dataLayer.getServices(),
        dataLayer.getPackages(),
        dataLayer.getFaq()
      ]);
      setSettings(st);
      setServices(sv);
      setPackages(pk);
      setFaqs(fq);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    await dataLayer.saveSettings(settings);
    triggerSuccess();
  }

  async function handleSaveServices() {
    await dataLayer.saveServices(services);
    triggerSuccess();
  }

  async function handleSavePackages() {
    await dataLayer.savePackages(packages);
    triggerSuccess();
  }

  async function handleSaveFaqs() {
    await dataLayer.saveFaqs(faqs);
    triggerSuccess();
  }

  function triggerSuccess() {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  if (loading || !settings) {
    return <div className="p-8 text-sm text-muted">Carregando gerenciador de conteúdo...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header com Abas e Confirmação de Salvamento */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-display text-text">Gestor de Conteúdo & Seções (CMS)</h2>
          <p className="text-sm text-muted">Edite textos, serviços, valores e termos. Todas as alterações refletem na página pública.</p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold animate-fade-in">
            <Check size={16} />
            <span>Alterações salvas com sucesso!</span>
          </div>
        )}
      </div>

      {/* Menu de Abas */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {[
          { id: 'geral', label: 'Textos da Abertura (Hero)' },
          { id: 'servicos', label: 'Especialidades & Escopos' },
          { id: 'pacotes', label: 'Pacotes & Preços' },
          { id: 'faq', label: 'Perguntas Frequentes' },
          { id: 'legal', label: 'Termos & Privacidade (LGPD)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id ? 'bg-text text-bg shadow-sm' : 'bg-surface text-muted hover:text-text border border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. ABA: GERAL / HERO */}
      {activeTab === 'geral' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                Título Principal da Abertura (Hero Title)
              </label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={e => setSettings({ ...settings, hero_title: e.target.value })}
                className="w-full px-4 py-2.5 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action font-display text-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                Subtítulo e Posicionamento de Marca
              </label>
              <textarea
                rows={3}
                value={settings.hero_subtitle}
                onChange={e => setSettings({ ...settings, hero_subtitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                  Texto do Botão Principal (CTA)
                </label>
                <input
                  type="text"
                  value={settings.primary_cta_text}
                  onChange={e => setSettings({ ...settings, primary_cta_text: e.target.value })}
                  className="w-full px-4 py-2 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                  Texto do Botão Secundário
                </label>
                <input
                  type="text"
                  value={settings.secondary_cta_text}
                  onChange={e => setSettings({ ...settings, secondary_cta_text: e.target.value })}
                  className="w-full px-4 py-2 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                  E-mail Oficial de Contato
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={e => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full px-4 py-2 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                  WhatsApp com DDD (somente números)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_number || ''}
                  onChange={e => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  placeholder="5511999999999"
                  className="w-full px-4 py-2 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
    type="submit"
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
  >
    {success ? <Check size={16} /> : <Save size={16} />}
    <span>{success ? 'Salvo!' : 'Salvar Textos da Abertura'}</span>
  </button>
          </div>
        </form>
      )}

      {/* 2. ABA: SERVIÇOS & ESCOPOS */}
      {activeTab === 'servicos' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted">Defina claramente o que cada serviço resolve e o que NÃO está incluso.</p>
            <button
              onClick={() => {
                const newSrv: Service = {
                  id: 'srv-' + Date.now(),
                  title: 'Novo Serviço Editorial',
                  problem_solved: 'Descreva a dor específica do cliente...',
                  deliverables: 'Liste as entregas práticas...',
                  target_audience: 'Público-alvo indicado...',
                  not_included: 'O que não faz parte deste escopo...',
                  timeframe: '20 dias úteis',
                  investment_range: 'A partir de R$ 2.000',
                  image_url: null,
                  order_index: services.length + 1,
                  status: 'active'
                };
                setServices([...services, newSrv]);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-text text-bg rounded text-xs font-semibold hover:bg-text/90 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              <span>Adicionar Especialidade</span>
            </button>
          </div>

          <div className="space-y-6">
            {services.map((srv, idx) => (
              <div key={srv.id} className="p-6 bg-surface border border-border rounded-lg space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={srv.title}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx].title = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full font-bold text-lg font-display bg-transparent border-b border-transparent hover:border-border focus:border-action focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={srv.status}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx].status = e.target.value as any;
                        setServices(updated);
                      }}
                      className="text-xs bg-bg border border-border px-2 py-1 rounded"
                    >
                      <option value="active">Publicado (Ativo)</option>
                      <option value="archived">Oculto (Arquivado)</option>
                    </select>

                    <button
                      onClick={() => setServices(services.filter(s => s.id !== srv.id))}
                      className="text-muted hover:text-red-600 transition-colors p-1"
                      title="Excluir serviço"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-muted block mb-1">Problema que resolve:</label>
                    <textarea
                      rows={2}
                      value={srv.problem_solved}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx].problem_solved = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full p-2.5 bg-bg border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-action block mb-1">O que entregamos (Entregáveis):</label>
                    <textarea
                      rows={2}
                      value={srv.deliverables}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx].deliverables = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full p-2.5 bg-bg border border-border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-muted block mb-1">Para quem é indicado:</label>
                    <input
                      type="text"
                      value={srv.target_audience}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx].target_audience = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full p-2 bg-bg border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-red-600 block mb-1">O que NÃO está incluso:</label>
                    <input
                      type="text"
                      value={srv.not_included}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx].not_included = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full p-2 bg-bg border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-trust block mb-1">Prazo & Faixa de Valor:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={srv.timeframe}
                        onChange={e => {
                          const updated = [...services];
                          updated[idx].timeframe = e.target.value;
                          setServices(updated);
                        }}
                        placeholder="Ex: 20 dias úteis"
                        className="w-1/2 p-2 bg-bg border border-border rounded"
                      />
                      <input
                        type="text"
                        value={srv.investment_range || ''}
                        onChange={e => {
                          const updated = [...services];
                          updated[idx].investment_range = e.target.value;
                          setServices(updated);
                        }}
                        placeholder="Ex: A partir de R$ 2.500"
                        className="w-1/2 p-2 bg-bg border border-border rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveServices}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Save size={16} />
              <span>Salvar Especialidades</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. ABA: PACOTES */}
      {activeTab === 'pacotes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted">Gerencie os planos comerciais, quantidades e itens inclusos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg, idx) => (
              <div key={pkg.id} className="p-6 bg-surface border border-border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={pkg.level}
                    onChange={e => {
                      const updated = [...packages];
                      updated[idx].level = e.target.value;
                      setPackages(updated);
                    }}
                    className="font-bold text-xl font-display bg-transparent border-b border-transparent focus:border-action focus:outline-none"
                  />
                  <label className="flex items-center gap-1 text-xs font-semibold text-action cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pkg.is_highlighted}
                      onChange={e => {
                        const updated = [...packages];
                        updated[idx].is_highlighted = e.target.checked;
                        setPackages(updated);
                      }}
                    />
                    <span>Destacar (Recomendado)</span>
                  </label>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-muted block mb-1">Papel Comercial:</label>
                    <input
                      type="text"
                      value={pkg.commercial_role}
                      onChange={e => {
                        const updated = [...packages];
                        updated[idx].commercial_role = e.target.value;
                        setPackages(updated);
                      }}
                      className="w-full p-2 bg-bg border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Tipo de Preço:</label>
                    <div className="flex gap-2">
                      <select
                        value={pkg.price_type}
                        onChange={e => {
                          const updated = [...packages];
                          updated[idx].price_type = e.target.value as any;
                          setPackages(updated);
                        }}
                        className="p-2 bg-bg border border-border rounded text-xs"
                      >
                        <option value="starting_at">A partir de</option>
                        <option value="fixed">Valor Fixo</option>
                        <option value="on_request">Sob Consulta</option>
                      </select>

                      {pkg.price_type !== 'on_request' && (
                        <input
                          type="number"
                          value={pkg.price || ''}
                          onChange={e => {
                            const updated = [...packages];
                            updated[idx].price = Number(e.target.value);
                            setPackages(updated);
                          }}
                          placeholder="Valor em R$"
                          className="p-2 bg-bg border border-border rounded text-xs flex-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-muted block mb-1">Prazo:</label>
                      <input
                        type="text"
                        value={pkg.timeframe}
                        onChange={e => {
                          const updated = [...packages];
                          updated[idx].timeframe = e.target.value;
                          setPackages(updated);
                        }}
                        className="w-full p-2 bg-bg border border-border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-muted block mb-1">Revisões:</label>
                      <input
                        type="text"
                        value={pkg.revisions}
                        onChange={e => {
                          const updated = [...packages];
                          updated[idx].revisions = e.target.value;
                          setPackages(updated);
                        }}
                        className="w-full p-2 bg-bg border border-border rounded text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-text">Itens do Pacote (Inclusos e Exclusos)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...packages];
                        if (!updated[idx].items) updated[idx].items = [];
                        updated[idx].items.push({
                          id: crypto.randomUUID(),
                          package_id: pkg.id,
                          title: 'Novo Item',
                          quantity: null,
                          order_index: updated[idx].items.length,
                          is_included: true
                        });
                        setPackages(updated);
                      }}
                      className="text-[10px] bg-action/10 text-action px-2 py-1 rounded font-bold uppercase"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pkg.items?.map((item, itemIdx) => (
                      <div key={item.id} className="flex items-start gap-2 bg-bg p-2 rounded border border-border">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...packages];
                              updated[idx].items[itemIdx].title = e.target.value;
                              setPackages(updated);
                            }}
                            className="w-full px-2 py-1 bg-surface border border-border rounded text-[11px]"
                            placeholder="Nome do Item (Ex: Logo Principal)"
                          />
                          <div className="flex items-center gap-4">
                            <input
                              type="text"
                              value={item.quantity || ''}
                              onChange={(e) => {
                                const updated = [...packages];
                                updated[idx].items[itemIdx].quantity = e.target.value;
                                setPackages(updated);
                              }}
                              className="w-20 px-2 py-1 bg-surface border border-border rounded text-[11px]"
                              placeholder="Qtd"
                            />
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-text cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={item.is_included !== false}
                                onChange={(e) => {
                                  const updated = [...packages];
                                  updated[idx].items[itemIdx].is_included = e.target.checked;
                                  setPackages(updated);
                                }}
                                className="accent-action"
                              />
                              Incluso no pacote?
                            </label>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...packages];
                            updated[idx].items = updated[idx].items.filter((_, i) => i !== itemIdx);
                            setPackages(updated);
                          }}
                          className="text-red-500 p-1 hover:bg-red-500/10 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
    onClick={handleSavePackages}
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
  >
    {success ? <Check size={16} /> : <Save size={16} />}
    <span>{success ? 'Salvo!' : 'Salvar Pacotes'}</span>
  </button>
          </div>
        </div>
      )}

      {/* 4. ABA: FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted">Perguntas e respostas estratégicas que quebram objeções comerciais.</p>
            <button
              onClick={() => {
                const newFaq: FAQ = {
                  id: 'faq-' + Date.now(),
                  question: 'Nova Pergunta?',
                  answer: 'Resposta objetiva e clara...',
                  order_index: faqs.length + 1
                };
                setFaqs([...faqs, newFaq]);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-text text-bg rounded text-xs font-semibold hover:bg-text/90 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              <span>Adicionar Pergunta</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.id} className="p-6 bg-surface border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={e => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full font-bold text-sm bg-transparent border-b border-transparent focus:border-action focus:outline-none"
                  />
                  <button
                    onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))}
                    className="text-muted hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={faq.answer}
                  onChange={e => {
                    const updated = [...faqs];
                    updated[idx].answer = e.target.value;
                    setFaqs(updated);
                  }}
                  className="w-full p-3 bg-bg border border-border rounded text-xs leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveFaqs}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Save size={16} />
              <span>Salvar Perguntas Frequentes</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. ABA: TERMOS & PRIVACIDADE */}
      {activeTab === 'legal' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                Termos de Uso & Prestação de Serviços (Exibido no Modal do Rodapé)
              </label>
              <textarea
                rows={8}
                value={settings.terms_of_use || ''}
                onChange={e => setSettings({ ...settings, terms_of_use: e.target.value })}
                className="w-full p-4 bg-bg border border-border rounded text-xs font-mono leading-relaxed focus:outline-none focus:border-action"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                Política de Privacidade & Conformidade LGPD (Exibido no Modal do Rodapé)
              </label>
              <textarea
                rows={8}
                value={settings.privacy_policy || ''}
                onChange={e => setSettings({ ...settings, privacy_policy: e.target.value })}
                className="w-full p-4 bg-bg border border-border rounded text-xs font-mono leading-relaxed focus:outline-none focus:border-action"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
                Razão Social / Dados Jurídicos do Rodapé
              </label>
              <input
                type="text"
                value={settings.company_info || ''}
                onChange={e => setSettings({ ...settings, company_info: e.target.value })}
                placeholder="Ex: IAMUREL Estúdio Criativo Ltda. CNPJ 00.000.000/0001-00"
                className="w-full px-4 py-2.5 bg-bg border border-border rounded text-sm focus:outline-none focus:border-action"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Save size={16} />
              <span>Salvar Documentos Legais</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
