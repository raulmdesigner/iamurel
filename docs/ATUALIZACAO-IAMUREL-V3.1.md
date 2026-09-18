# Pacote de Atualização v3.1 — IAMUREL

Este pacote resolve **100% dos 3 problemas apontados**, mantendo **total compatibilidade e integridade** com as correções estruturais que o ChatGPT realizou (RLS seguro, funções atômicas `iamurel_replace_collection`, camadas de isolamento e script de rotas estáticas para GitHub Pages).

---

## 1. O que foi corrigido

###  Palavra que fica mudando no Hero (Restaurada e compatível com fontes)
- **Causa:** O ChatGPT havia substituído o componente `<RotatingWordHero />` por um `<h1>` estático padrão em `Home.tsx`. Além disso, ao trocar de fontes no CMS de Aparência, faltava carregar a família tipográfica no `index.html` e a cor estava travada em código hexadecimal.
- **Solução implementada:**
  - Restaurado o `<RotatingWordHero />` no Hero principal de `src/pages/public/Home.tsx`.
  - O componente agora respeita dinamicamente a cor de destaque da marca (`text-action`) configurada no painel.
  - Carregamento da fonte editorial (Playfair Display) adicionado ao `index.html` e mapeamento correto de fontes no `src/lib/appearance.tsx`.
  - Palavras animadas em rotação suave: *profissionais*, *consistentes*, *memoráveis*, *autorais*, *lucrativas*.

### 📧 Notificação de Novos Leads no Gmail (`iamurelbrasil@gmail.com`)
- **Causa:** Na limpeza feita pelo ChatGPT, a chamada externa para o FormSubmit havia sido removida do fluxo de envio de leads em favor apenas da inserção no banco `iamurel_leads`.
- **Solução implementada:**
  - Em `src/lib/data.ts`, a função `submitLead` insere com sucesso o lead no Supabase (com RLS e consentimento) e, em seguida, dispara assincronamente a notificação detalhada para `iamurelbrasil@gmail.com` via FormSubmit.
  - O envio de e-mail conta com bloco de contenção (`try/catch`), garantindo que qualquer oscilação externa nunca trave o site nem dê erro falso para o visitante.

### 🗑️ Apagar e Ocultar Pacotes no CMS do Admin
- **Causa:** No painel do CMS de Pacotes (`ContentCMS.tsx`), os novos pacotes vinham configurados com status `'archived'`, não havia seletor visual de status (Publicado vs Oculto) por pacote, e faltava o botão de lixeira para remover o pacote da lista antes de salvar.
- **Solução implementada:**
  - **Exclusão:** Adicionado botão de lixeira (`Trash2`) com confirmação em cada cartão de pacote. Ao clicar em "Salvar Pacotes", a função atômica `iamurel_replace_collection` do Supabase remove permanentemente do banco todos os pacotes excluídos.
  - **Ocultar / Publicar:** Adicionado menu seletor direto em cada pacote entre **"Publicado (Ativo)"** e **"Oculto (Rascunho)"**. Pacotes ocultos não aparecem no site público.
  - **Novo pacote:** Ao clicar em "Adicionar Pacote", o pacote já é criado como `active` e com valores padrão consistentes.

---

## 2. Arquivos Modificados (Apenas 6 arquivos)

1. `index.html` (Inclusão de Playfair Display no Google Fonts)
2. `src/lib/appearance.tsx` (Mapeamento completo das famílias tipográficas)
3. `src/components/modern/RotatingWordHero.tsx` (Uso de cor dinâmica e animação fluida)
4. `src/pages/public/Home.tsx` (Reconexão do RotatingWordHero no topo da página)
5. `src/lib/data.ts` (Disparo de notificação por e-mail para `iamurelbrasil@gmail.com`)
6. `src/pages/admin/ContentCMS.tsx` (Botão de excluir pacote e seletor de status Ativo/Oculto)

---

## 3. Compatibilidade Garantida
- O arquivo de migração do Supabase (`supabase/migrations/20260918_repair_iamurel.sql`) continua **100% inalterado e compatível**.
- As políticas de segurança (RLS) e permissões de Admin continuam ativas.
- O build de produção (`npm run build`) e geração de rotas estáticas do GitHub Pages continuam funcionando sem qualquer erro.
