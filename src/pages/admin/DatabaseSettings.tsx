import React, { useState, useEffect } from 'react';
import { isSupabaseConfigured, getActiveSupabaseConfig, reconfigureSupabase } from '../../lib/supabase';
import { dataLayer } from '../../lib/data';
import { Database, Download, Upload, Check, AlertCircle, RefreshCw, Key, Shield } from 'lucide-react';

export default function DatabaseSettings() {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [currentConfig, setCurrentConfig] = useState(getActiveSupabaseConfig());
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  useEffect(() => {
    const active = getActiveSupabaseConfig();
    setCurrentConfig(active);
    setSupabaseUrl(active.url);
    setSupabaseKey(active.key);
  }, []);

  function handleSaveConnection(e: React.FormEvent) {
    e.preventDefault();
    setTestResult(null);

    const result = reconfigureSupabase(supabaseUrl.trim(), supabaseKey.trim());
    if (result.success) {
      setCurrentConfig(getActiveSupabaseConfig());
      setTestResult({
        success: true,
        msg: supabaseUrl
          ? 'Conexão com o Supabase configurada com sucesso! Os dados agora são sincronizados diretamente na nuvem.'
          : 'Configuração redefinida para Armazenamento Local no Navegador.'
      });
    } else {
      setTestResult({
        success: false,
        msg: result.error || 'Erro ao validar credenciais do Supabase.'
      });
    }
  }

  async function handleExportBackup() {
    try {
      const backup = await dataLayer.exportBackup();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `iamurel_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupMessage('Backup exportado com sucesso em arquivo JSON!');
      setTimeout(() => setBackupMessage(null), 4000);
    } catch (err: any) {
      setBackupMessage('Erro ao gerar backup: ' + err.message);
    }
  }

  async function handleImportBackup(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const res = await dataLayer.importBackup(json);
      if (res.success) {
        setBackupMessage('Dados restaurados com sucesso a partir do arquivo JSON!');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setBackupMessage('Falha ao importar: ' + res.error);
      }
    } catch (err: any) {
      setBackupMessage('Erro ao ler arquivo: ' + err.message);
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-border">
        <h2 className="text-2xl font-bold font-display text-text">Conexão & Armazenamento de Dados</h2>
        <p className="text-sm text-muted">
          Gerencie o destino de persistência dos leads, configurações do site e backups do sistema.
        </p>
      </div>

      {/* Status da Conexão Atual */}
      <div className="p-6 bg-surface border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isSupabaseConfigured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
            <Database size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-text text-base">Status do Armazenamento:</h3>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isSupabaseConfigured ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
              }`}>
                {isSupabaseConfigured ? 'Supabase Nuvem Ativo' : 'Armazenamento Local (Navegador)'}
              </span>
            </div>
            <p className="text-xs text-muted mt-1">
              {isSupabaseConfigured
                ? `Conectado via ${currentConfig.source === 'env' ? 'Variáveis de Ambiente (.env)' : 'Configuração do Painel (localStorage)'}.`
                : 'Todas as alterações são salvas com persistência garantida no navegador. Você pode conectar ao Supabase abaixo a qualquer momento.'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulário de Configuração Supabase */}
      <form onSubmit={handleSaveConnection} className="p-8 bg-surface border border-border rounded-lg space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Key size={18} className="text-action" />
          <h3 className="text-base font-bold text-text font-display">Credenciais do Supabase</h3>
        </div>

        {testResult && (
          <div className={`p-4 rounded text-xs flex items-center gap-2 border ${
            testResult.success
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {testResult.success ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{testResult.msg}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
              Project URL do Supabase
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={e => setSupabaseUrl(e.target.value)}
              placeholder="https://sua-id-de-projeto.supabase.co"
              className="w-full px-4 py-2.5 bg-bg border border-border rounded text-xs font-mono focus:outline-none focus:border-action"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1">
              Anon Public Key do Supabase
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={e => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2.5 bg-bg border border-border rounded text-xs font-mono focus:outline-none focus:border-action"
            />
            <p className="text-[11px] text-muted mt-1">
              A chave anon é pública e segura para uso no frontend com Row Level Security (RLS).
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => {
              setSupabaseUrl('');
              setSupabaseKey('');
              reconfigureSupabase('', '');
              setCurrentConfig(getActiveSupabaseConfig());
              setTestResult({ success: true, msg: 'Modo local ativado.' });
            }}
            className="text-xs text-muted hover:text-text underline cursor-pointer"
          >
            Desconectar & Usar Modo Local
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-action hover:bg-action-hover text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Check size={16} />
            <span>Salvar e Conectar Supabase</span>
          </button>
        </div>
      </form>

      
      {/* Helper para Banco de Dados e Storage */}
      <div className="p-8 bg-surface border border-border rounded-lg space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Database size={18} className="text-action" />
          <h3 className="text-base font-bold text-text font-display">Resolução de Problemas (SQL / Storage)</h3>
        </div>
        
        <p className="text-xs text-muted leading-relaxed">
          Se você estiver enfrentando o erro <strong>"Bucket not found"</strong> ao fazer upload de imagens no painel de Aparência, significa que a pasta de armazenamento <code>media</code> não foi criada ou não possui as permissões públicas necessárias no Supabase.
        </p>

        <div className="bg-bg border border-border rounded p-4">
          <p className="text-xs font-bold text-text mb-2">Execute o seguinte comando no SQL Editor do seu painel do Supabase:</p>
          <pre className="text-[10px] sm:text-xs text-muted overflow-x-auto p-4 bg-black/5 rounded">
{`-- 1. Cria o bucket público 'media'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Permite que qualquer pessoa veja os arquivos (Leitura Pública)
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'media' );

-- 3. Permite uploads para o bucket
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'media' );`}
          </pre>
        </div>
      </div>

      {/* Backup e Exportação */}
      <div className="p-8 bg-surface border border-border rounded-lg space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Shield size={18} className="text-trust" />
          <h3 className="text-base font-bold text-text font-display">Backup & Portabilidade Completa</h3>
        </div>

        {backupMessage && (
          <div className="p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs">
            {backupMessage}
          </div>
        )}

        <p className="text-xs text-muted leading-relaxed">
          Você tem total controle sobre os seus dados. Pode baixar um arquivo JSON com todas as configurações, serviços, pacotes e leads a qualquer momento, ou carregar um backup prévio.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg border border-border hover:border-text text-text rounded text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download size={16} />
            <span>Exportar Backup (JSON)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg border border-border hover:border-text text-text rounded text-xs font-semibold transition-colors cursor-pointer">
            <Upload size={16} />
            <span>Importar Backup (JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="sr-only"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
