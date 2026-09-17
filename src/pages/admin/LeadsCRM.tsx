import React, { useEffect, useState } from 'react';
import { dataLayer } from '../../lib/data';
import { Lead, LeadStatus } from '../../types';
import {
  Briefcase,
  Calendar,
  MessageSquare,
  AlertCircle,
  Search,
  Download,
  Phone,
  Mail,
  X,
  Plus,
  Send,
  Kanban,
  Table as TableIcon,
  Tag,
  ArrowUpRight
} from 'lucide-react';

const STATUS_COLUMNS: { id: LeadStatus; label: string; badgeBg: string }[] = [
  { id: 'novo', label: 'Novos', badgeBg: 'bg-blue-100 text-blue-900' },
  { id: 'em_analise', label: 'Em Análise', badgeBg: 'bg-amber-100 text-amber-900' },
  { id: 'contatado', label: 'Contatados', badgeBg: 'bg-purple-100 text-purple-900' },
  { id: 'proposta_enviada', label: 'Proposta Enviada', badgeBg: 'bg-indigo-100 text-indigo-900' },
  { id: 'ganho', label: 'Fechados / Ganho', badgeBg: 'bg-emerald-100 text-emerald-900' },
  { id: 'perdido', label: 'Perdidos', badgeBg: 'bg-zinc-200 text-zinc-800' }
];

export default function LeadsCRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');

  async function loadLeads() {
    setLoading(true);
    const data = await dataLayer.getLeads();
    setLeads(data);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l)));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => (prev ? { ...prev, status: newStatus } : null));
    }
    await dataLayer.updateLeadStatus(leadId, newStatus);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    await dataLayer.addLeadNote(selectedLead.id, newNote.trim(), 'Gestor Comercial');
    setNewNote('');
    // Refresh leads
    const updated = await dataLayer.getLeads();
    setLeads(updated);
    const refreshed = updated.find(l => l.id === selectedLead.id);
    if (refreshed) setSelectedLead(refreshed);
  };

  const exportCsv = () => {
    if (!leads.length) return;
    const headers = ['Data', 'Nome', 'Negócio', 'Email', 'Telefone', 'Status', 'Necessidade', 'Canal Preferido', 'Mensagem'];
    const rows = leads.map(l => [
      new Date(l.created_at).toLocaleString('pt-BR'),
      `"${l.name}"`,
      `"${l.business_name}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.status}"`,
      `"${l.need}"`,
      `"${l.preferred_channel}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `iamurel_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    const q = searchQuery.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.business_name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.need && l.need.toLowerCase().includes(q))
    );
  });

  if (loading) return <div className="p-8 text-sm text-muted">Carregando CRM de Leads...</div>;

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
      {/* Top Bar: Busca, Modo de Visualização e Exportação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-text">Gestão & Pipeline de Leads</h2>
          <p className="text-xs text-muted">Acompanhe e qualifique contatos recebidos com histórico e anotações.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar por nome ou empresa..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-surface border border-border rounded text-xs focus:outline-none focus:border-action w-56"
            />
          </div>

          <div className="flex bg-surface border border-border rounded p-0.5 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'kanban' ? 'bg-bg text-text shadow-xs' : 'text-muted'}`}
              title="Visualização em Kanban"
            >
              <Kanban size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'table' ? 'bg-bg text-text shadow-xs' : 'text-muted'}`}
              title="Visualização em Lista / Tabela"
            >
              <TableIcon size={16} />
            </button>
          </div>

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border hover:border-text text-text rounded text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Visualização KANBAN */}
      {viewMode === 'kanban' ? (
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map(column => {
            const columnLeads = filteredLeads.filter(l => l.status === column.id);
            return (
              <div
                key={column.id}
                className="min-w-[300px] w-[300px] bg-surface border border-border rounded-lg flex flex-col max-h-full"
              >
                <div className="p-3 border-b border-border bg-bg/50 rounded-t-lg flex items-center justify-between">
                  <span className="font-semibold text-xs text-text">{column.label}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${column.badgeBg}`}>
                    {columnLeads.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {columnLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-bg border border-border rounded p-4 shadow-xs hover:border-action/60 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-text group-hover:text-action transition-colors truncate pr-2">
                          {lead.name}
                        </h4>
                        {lead.priority === 'high' && <AlertCircle size={14} className="text-action shrink-0" />}
                      </div>

                      <p className="text-[11px] font-medium text-text/80 truncate">
                        {lead.business_name}
                      </p>

                      <div className="text-[11px] text-muted space-y-1 pt-1">
                        <p className="truncate">🎯 {lead.need}</p>
                        <p className="text-[10px] font-mono text-muted/80">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      {lead.notes && lead.notes.length > 0 && (
                        <div className="pt-2 border-t border-border flex items-center gap-1 text-[10px] text-muted">
                          <MessageSquare size={12} />
                          <span>{lead.notes.length} nota(s) interna(s)</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {columnLeads.length === 0 && (
                    <div className="p-6 text-center text-xs text-muted/60">
                      Nenhum lead nesta etapa.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Visualização TABELA */
        <div className="flex-1 overflow-auto bg-surface border border-border rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg/60 text-muted uppercase font-mono text-[10px]">
                <th className="p-3">Data</th>
                <th className="p-3">Nome / Contato</th>
                <th className="p-3">Negócio</th>
                <th className="p-3">Desafio / Necessidade</th>
                <th className="p-3">Canal</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.map(lead => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-bg/40 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono text-muted whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-text">{lead.name}</p>
                    <p className="text-muted text-[11px]">{lead.email}</p>
                  </td>
                  <td className="p-3 font-medium text-text">{lead.business_name}</td>
                  <td className="p-3 text-muted max-w-xs truncate">{lead.need}</td>
                  <td className="p-3 capitalize font-mono text-[11px]">{lead.preferred_channel}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bg border border-border uppercase">
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(lead);
                      }}
                      className="text-action hover:underline font-semibold"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DRAWER / MODAL LATERAL DE DETALHES DO LEAD */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-surface h-full border-l border-border shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Header da Gaveta */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-action font-semibold">
                  Ficha do Lead
                </span>
                <h3 className="text-xl font-bold font-display text-text">{selectedLead.name}</h3>
                <p className="text-xs text-muted">{selectedLead.business_name}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded hover:bg-border text-muted hover:text-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Corpo da Gaveta */}
            <div className="p-6 space-y-6 flex-1 text-xs">
              {/* Status do Lead */}
              <div>
                <label className="text-[10px] font-bold uppercase font-mono text-muted block mb-1">
                  Mudar Etapa do Pipeline
                </label>
                <select
                  value={selectedLead.status}
                  onChange={e => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full p-2.5 bg-bg border border-border rounded text-xs font-semibold focus:outline-none focus:border-action"
                >
                  {STATUS_COLUMNS.map(col => (
                    <option key={col.id} value={col.id}>{col.label}</option>
                  ))}
                </select>
              </div>

              {/* Informações de Contato */}
              <div className="p-4 bg-bg border border-border rounded space-y-3">
                <p className="text-[10px] uppercase font-mono font-bold text-muted">Contatos Diretos</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted flex items-center gap-1.5"><Mail size={13} /> {selectedLead.email}</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-action hover:underline font-semibold">Enviar E-mail</a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <span className="text-muted flex items-center gap-1.5"><Phone size={13} /> {selectedLead.phone}</span>
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=Ol%C3%A1%20${encodeURIComponent(selectedLead.name)}%2C%20aqui%20%C3%A9%20da%20equipe%20IAMUREL.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
                    >
                      Abrir WhatsApp <ArrowUpRight size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* Desafio e Mensagem */}
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted block">Desafio Selecionado:</span>
                  <p className="font-semibold text-text text-sm">{selectedLead.need}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted block">Prazo Desejado:</span>
                  <p className="text-text">{selectedLead.timeframe}</p>
                </div>
                {selectedLead.message && (
                  <div className="p-3 bg-bg border border-border rounded">
                    <span className="text-[10px] font-mono uppercase text-muted block mb-1">Mensagem do Lead:</span>
                    <p className="text-text/90 leading-relaxed italic">"{selectedLead.message}"</p>
                  </div>
                )}
              </div>

              {/* Anotações Internas */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-muted">Anotações Internas da Equipe</span>
                  <span className="text-[10px] text-muted">{selectedLead.notes?.length || 0} registro(s)</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedLead.notes?.map(note => (
                    <div key={note.id} className="p-2.5 bg-bg border border-border rounded text-[11px] space-y-1">
                      <p className="text-text">{note.content}</p>
                      <div className="flex justify-between text-[9px] text-muted font-mono">
                        <span>{note.created_by}</span>
                        <span>{new Date(note.created_at).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                  {(!selectedLead.notes || selectedLead.notes.length === 0) && (
                    <p className="text-muted/60 italic text-[11px]">Nenhuma anotação registrada ainda.</p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Adicionar nota interna..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 bg-bg border border-border rounded text-xs focus:outline-none focus:border-action"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-text text-bg rounded font-semibold hover:bg-text/90 transition-colors shrink-0"
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </div>

            {/* Footer da Gaveta */}
            <div className="p-4 border-t border-border bg-bg flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-surface border border-border text-text rounded text-xs font-semibold hover:border-text transition-colors"
              >
                Fechar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
