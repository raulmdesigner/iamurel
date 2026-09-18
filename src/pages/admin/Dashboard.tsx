import { LoadError } from '../../components/ui/LoadError';
import { errorMessage } from '../../lib/errors';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataLayer } from '../../lib/data';
import { Lead } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
  FileText,
  Sliders,
  Database,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function load() {
      setLeads(await dataLayer.getLeads());
      setLoading(false);
    }
    load().catch(error => { setLoadError(errorMessage(error)); setLoading(false); });
  }, []);

  if (loadError) return <LoadError message={loadError} />;
  if (loading) return <div className="p-8 text-sm text-muted">Carregando painel de controle...</div>;

  const newLeadsCount = leads.filter(l => l.status === 'novo').length;
  const inProgressCount = leads.filter(
    l => l.status === 'em_analise' || l.status === 'contatado' || l.status === 'proposta_enviada'
  ).length;
  const wonCount = leads.filter(l => l.status === 'ganho').length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner de Boas-vindas com Indicador Sutil de Armazenamento */}
      <div className="p-6 bg-surface border border-border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-text">Central Administrativa IAMUREL</h2>
          <p className="text-xs text-muted mt-1">
            Governança editorial, monitoramento de contatos qualificados e controle do estúdio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-mono font-medium px-3 py-1.5 bg-bg border border-border rounded">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
            {isSupabaseConfigured ? 'Supabase Conectado' : 'Armazenamento Local Ativo'}
          </span>

          <Link
            to="/admin/database"
            className="text-xs text-action hover:underline font-semibold flex items-center gap-1"
          >
            Gerenciar Banco <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Cards de Métricas Reais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Contatos" value={leads.length} icon={Users} />
        <StatCard title="Novos (Aguardando)" value={newLeadsCount} icon={CheckCircle} color="text-action" />
        <StatCard title="Em Negociação" value={inProgressCount} icon={Clock} color="text-trust" />
        <StatCard title="Projetos Fechados" value={wonCount} icon={TrendingUp} color="text-emerald-700" />
      </div>

      {/* Atalhos Rápidos para Tarefas de Gestão */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/leads"
          className="p-5 bg-surface border border-border rounded-lg hover:border-action transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-text group-hover:text-action">Pipeline de Leads</h4>
            <p className="text-xs text-muted">Acessar CRM Kanban e lista de contatos</p>
          </div>
          <ArrowUpRight size={16} className="text-muted group-hover:text-action" />
        </Link>

        <Link
          to="/admin/conteudo"
          className="p-5 bg-surface border border-border rounded-lg hover:border-action transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-text group-hover:text-action">Editor de Conteúdo (CMS)</h4>
            <p className="text-xs text-muted">Ajustar serviços, pacotes, FAQ e termos</p>
          </div>
          <ArrowUpRight size={16} className="text-muted group-hover:text-action" />
        </Link>

        <Link
          to="/admin/aparencia"
          className="p-5 bg-surface border border-border rounded-lg hover:border-action transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-text group-hover:text-action">Aparência & Identidade</h4>
            <p className="text-xs text-muted">Editar cores, fontes, bordas e movimento</p>
          </div>
          <ArrowUpRight size={16} className="text-muted group-hover:text-action" />
        </Link>
      </div>

      {/* Tabela dos Últimos Contatos Recebidos */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-text font-display">Últimos Contatos Comerciais</h3>
            <p className="text-xs text-muted">Leads recentes recebidos através do formulário do site.</p>
          </div>
          <Link to="/admin/leads" className="text-xs font-semibold text-action hover:underline">
            Ver todos no CRM
          </Link>
        </div>

        {leads.length === 0 ? (
          <p className="text-muted text-xs py-8 text-center">Nenhum contato recebido ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted uppercase font-mono text-[10px]">
                  <th className="pb-3">Data</th>
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">Negócio</th>
                  <th className="pb-3">Desafio</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.slice(0, 5).map(lead => (
                  <tr key={lead.id} className="hover:bg-bg/40 transition-colors">
                    <td className="py-3 font-mono text-muted">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 font-bold text-text">{lead.name}</td>
                    <td className="py-3 font-medium">{lead.business_name}</td>
                    <td className="py-3 text-muted max-w-xs truncate">{lead.need}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-bg border border-border rounded text-[10px] font-bold uppercase">
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link to="/admin/leads" className="text-action hover:underline font-semibold">
                        Abrir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color = 'text-text' }: any) {
  return (
    <div className="p-5 bg-surface border border-border rounded-lg flex items-center gap-4">
      <div className={`p-3 rounded bg-bg border border-border ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-muted uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold font-display text-text">{value}</p>
      </div>
    </div>
  );
}

