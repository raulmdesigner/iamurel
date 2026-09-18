# IAMUREL — correção de acesso e publicação
## O que foi corrigido
- Entradas físicas para /iamurel/admin/ e todas as abas. O GitHub Pages não precisa do 404.html da raiz para essas rotas.
- Uma configuração pública de Supabase para todos os navegadores. O painel não troca mais de banco por localStorage.
- Sessão persistente isolada dos outros sites, tratamento de falhas e autorização específica para IAMUREL.
- Aparência, textos, serviços, perguntas, pacotes e itens gravados no Supabase. Erros não são mostrados como sucesso.
- Exclusões de coleções são transacionais. Listas vazias permanecem vazias.
- IDs UUID para novos registros, autor real nas notas de leads e confirmação de contato somente após gravação.
- Título, subtítulo, serviços, cores e visibilidade de portfólio ligados ao conteúdo configurado.
- Build com verificação de TypeScript, impedindo publicar erros como a variável success inexistente.

## Antes da publicação
1. No projeto bbajcfnvcrgelaynyqdt do Supabase, execute supabase/migrations/20260918_repair_iamurel.sql no SQL Editor.
2. O usuário raul@portfolio.com precisa existir em Authentication > Users. A migração o autoriza apenas no IAMUREL.
3. Não execute novamente os scripts antigos sql_init.sql ou schema.sql em produção: são versões históricas incompatíveis. A migração foi preparada para as tabelas atualmente observadas nesse projeto.
4. A migração mantém os registros existentes, adiciona campos e restringe as tabelas IAMUREL ao administrador indicado. Não altera tabelas de outros sites.
5. Backups de navegador antigos não são enviados automaticamente: podem conter dados diferentes do banco. O painel permite exportar o estado real do Supabase.

## Seu processo de build continua funcionando
Use Node.js 22 ou superior:
```
npm ci
npm test
npm run build
```
Copie TODO o conteúdo de dist para a pasta iamurel do repositório raulmdesigner.github.io.
Isso inclui admin/index.html e as subpastas admin/content, appearance, leads e database.
Não copie a pasta dist como um nível extra.
O domínio da raiz e os outros sites permanecem como estão.
O GitHub Pages pode acrescentar a barra final em /iamurel/admin/.

.env.production contém somente URL e chave PUBLICÁVEL, próprias para frontend.
Nunca inclua senha, chave secret ou service_role no código.
Para usar outro projeto, substitua esses valores antes de gerar o build.
O login usa Supabase Authentication; VITE_ADMIN_EMAIL não concede permissão.

## Validação depois de publicar
- Abra /iamurel/admin/ diretamente e atualize cada aba.
- Entre com seu usuário e salve um texto e uma cor.
- Confira em outra janela sem login.
- Remova um item de pacote, salve e recarregue.
- Envie um contato de teste e confira no CRM; altere o status e adicione uma nota.
- Um usuário de outro site não deve acessar o painel ou ler os contatos IAMUREL.

## Limitações explicitadas
As demonstrações visuais internas do portfólio continuam sendo conteúdo editorial do código; seu toggle de visibilidade funciona. Elas ainda não têm editor no painel.
Notificações por email via FormSubmit foram removidas do envio: o CRM confirma somente o que foi salvo no banco, e não envia os dados a outro serviço. Email automático requer integração de servidor separada.
A restauração local de JSON foi retirada porque não restaurava o banco. Exporte o backup pelo painel; restauração de dados deve ser administrada no Supabase.
Os testes de SQL usam PostgreSQL local em memória (PGlite). A aplicação da migração e uma gravação ponta a ponta no banco real precisam ser confirmadas antes de considerar a publicação concluída.
