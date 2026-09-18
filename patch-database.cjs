const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/DatabaseSettings.tsx', 'utf8');

const sqlHelper = `
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
{\`-- 1. Cria o bucket público 'media'
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
WITH CHECK ( bucket_id = 'media' );\`}
          </pre>
        </div>
      </div>
`;

code = code.replace(
  "{/* Backup e Exportação */}",
  sqlHelper + '\n      {/* Backup e Exportação */}'
);

fs.writeFileSync('src/pages/admin/DatabaseSettings.tsx', code);
