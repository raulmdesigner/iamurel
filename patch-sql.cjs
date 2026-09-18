const fs = require('fs');
const sql = fs.readFileSync('sql_init.sql', 'utf8').replace(/`/g, '\\`');
let code = fs.readFileSync('src/pages/admin/DatabaseSettings.tsx', 'utf8');

const sqlHelper = `
      {/* Helper para Banco de Dados e Storage */}
      <div className="p-8 bg-surface border border-border rounded-lg space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Database size={18} className="text-action" />
          <h3 className="text-base font-bold text-text font-display">Resolução de Problemas & Script SQL Oficial</h3>
        </div>
        
        <p className="text-xs text-muted leading-relaxed">
          Se as alterações não estiverem salvando no painel (como Whatsapp, Email ou novos itens) ou se você ver o erro <strong>"Bucket not found"</strong>, é porque as tabelas do seu Supabase ainda não foram criadas. Copie o código abaixo, abra o <strong>SQL Editor</strong> no painel do Supabase, cole tudo e clique em "Run".
        </p>

        <div className="bg-bg border border-border rounded p-4 relative group">
          <button 
            onClick={() => {
              const code = \`${sql}\`;
              navigator.clipboard.writeText(code);
              alert('Código SQL copiado para a área de transferência!');
            }}
            className="absolute top-4 right-4 bg-action text-white px-3 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            COPIAR SQL
          </button>
          <p className="text-xs font-bold text-text mb-2">Execute o comando abaixo no SQL Editor do Supabase:</p>
          <pre className="text-[10px] sm:text-xs text-muted overflow-x-auto p-4 bg-black/5 rounded max-h-96">
{\`${sql}\`}
          </pre>
        </div>
      </div>
`;

// we need to replace the old helper block.
const startMarker = "{/* Helper para Banco de Dados e Storage */}";
const endMarker = "{/* Backup e Exportação */}";

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

if(startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + sqlHelper + '\\n      ' + code.substring(endIdx);
}

fs.writeFileSync('src/pages/admin/DatabaseSettings.tsx', code);
