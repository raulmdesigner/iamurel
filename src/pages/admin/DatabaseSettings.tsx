import { useState } from 'react';
import { dataLayer } from '../../lib/data';
import { getActiveSupabaseConfig } from '../../lib/supabase';
import { errorMessage } from '../../lib/errors';

export default function DatabaseSettings() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const config = getActiveSupabaseConfig();
  async function exportBackup() {
    setBusy(true); setMessage('');
    try {
      const backup = await dataLayer.exportBackup();
      const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url;
      a.download = 'iamurel-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage('Backup do banco exportado.');
    } catch (error) { setMessage(errorMessage(error)); }
    finally { setBusy(false); }
  }
  return <div className="max-w-3xl space-y-6">
    <h1 className="text-2xl font-bold">Banco e backups</h1>
    <section className="p-6 bg-surface border rounded space-y-3">
      <h2 className="font-bold">Conexão do site</h2>
      <p className="break-all">{config.url || 'Não configurada'}</p>
      <p>O painel e todos os visitantes usam a mesma conexão, definida no arquivo .env antes de gerar o site.</p>
      <p>Para trocar de projeto, atualize a configuração e publique um novo build.</p>
    </section>
    <section className="p-6 bg-surface border rounded space-y-3">
      <h2 className="font-bold">Exportar dados</h2>
      <p>Baixe os textos, aparência, serviços, pacotes, portfólio, perguntas e contatos armazenados no Supabase.</p>
      <button disabled={busy} onClick={exportBackup} className="bg-action text-white px-5 py-3 rounded disabled:opacity-50">{busy ? 'Exportando...' : 'Baixar backup JSON'}</button>
      <p>A restauração deve ser feita no banco. Arquivos antigos salvos apenas no navegador não restauram o site público.</p>
      {message && <p role="status">{message}</p>}
    </section>
  </div>;
}
