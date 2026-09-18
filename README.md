# 🚀 Dossiê Técnico e Relatório Completo de Desenvolvimento: IAMUREL Studio

Este não é um simples resumo. Este é o **documento técnico oficial e detalhado** da arquitetura, engenharia, desafios e soluções adotadas durante a construção do ecossistema digital da **IAMUREL Studio**. 

O projeto consiste em um sistema "Full-Stack Serverless", dividindo-se entre uma Landing Page de altíssima conversão e um CMS/CRM (Painel Administrativo) robusto, projetado para dar autonomia total ao cliente, conectado a um banco de dados relacional em nuvem.

---

## 🏗️ 1. Arquitetura do Sistema e Stack Tecnológica

A aplicação foi construída com tecnologias modernas visando performance, manutenibilidade e escalabilidade.

### 💻 Frontend (Client-Side)
*   **Core:** React 18+ rodando sobre o *bundler* Vite.
*   **Linguagem:** TypeScript estrito para tipagem de todos os modelos de dados (Leads, Pacotes, Serviços).
*   **Estilização e UI:** Tailwind CSS. Utilizamos uma abordagem purista com classes utilitárias, criando um sistema de injeção de variáveis CSS dinâmicas (ex: `--color-primary`, `--color-action`) direto na raiz do DOM (`<div style={{ ... }}>`) para permitir que o cliente mude as cores da interface em tempo real pelo painel.
*   **Motor de Animação:** `framer-motion`. Utilizado para criar o componente `<ScrollReveal>`, que monitora a intersecção dos elementos na tela (Intersection Observer) e aplica transições de eixo Y, opacidade e filtros de desfoque (blur).
*   **Ícones:** `lucide-react`, escolhido por seu peso leve e consistência visual nos traços (stroke).

### ⚙️ Backend (BaaS) e Persistência
*   **Banco de Dados Oficial:** Supabase (PostgreSQL).
*   **Autenticação:** Gerenciamento local simulado na camada de roteamento, validando o email configurado nas variáveis de ambiente.
*   **Armazenamento de Mídia:** Supabase Storage (Bucket `media`).
*   **Fallback Local:** O sistema possui uma arquitetura de resiliência (Offline-First). Se o Supabase não estiver configurado ou cair, o arquivo `src/lib/data.ts` intercepta as chamadas e faz o espelhamento no `localStorage` do navegador, garantindo que o site nunca fique fora do ar.
*   **Notificações Transacionais:** API Serverless do FormSubmit para despachar emails sem a necessidade de um servidor Node.js/Express rodando `nodemailer`.

---

## 📂 2. Estrutura de Diretórios e Componentização

A arquitetura de pastas foi dividida da seguinte forma:

```text
/src
 ├── /components
 │    ├── /auth         # (AdminLogin) Tela de login protegida
 │    ├── /layout       # (AdminLayout) Sidebar e wrapper do painel
 │    ├── /ui           # Componentes reaproveitáveis (Animações, Botões)
 ├── /lib
 │    ├── data.ts       # O "Coração" dos dados. Faz a ponte entre Supabase <-> LocalStorage
 │    ├── supabase.ts   # Inicialização do cliente Supabase e uploader de arquivos
 │    ├── mockData.ts   # Dados iniciais para quando o banco está vazio
 │    ├── types.ts      # Interfaces TypeScript (SiteSettings, Lead, Service, Package, etc.)
 ├── /pages
 │    ├── /admin        # Telas do CMS: Dashboard, ContentCMS, AppearanceCMS, DatabaseSettings
 │    ├── /public       # Telas do site: Home.tsx
 ├── App.tsx            # Roteador principal e provedor de estado de Autenticação/Temas
 ├── index.css          # Diretrizes base do Tailwind e fontes
```

---

## 🎨 3. Design System "Anti-Slop"

Fugimos das interfaces genéricas. O site adota um padrão de design premium:
1.  **Tipografia Pareada:** Uso de `Plus Jakarta Sans` para textos de interface e `Playfair Display` ou `Instrument Serif` para cabeçalhos editoriais.
2.  **Lógica de Cores Variáveis:** O painel permite alterar a `Action Color` e o tom de fundo (`bg_tone`). O sistema calcula o contraste do texto (claro ou escuro) automaticamente dependendo da cor de fundo escolhida.
3.  **Toggles de Seção:** Todas as seções principais foram isoladas condicionalmente (`{appearance?.enable_showcase && <Section />}`).

---

## 🗄️ 4. Esquema de Banco de Dados (Supabase PostgreSQL)

Para que o site funcionasse perfeitamente, modelamos 5 tabelas principais e 1 Bucket de Storage. O script de inicialização executado foi:

*   **`iamurel_site_settings`**: Guarda 1 única linha com informações vitais (Textos de Hero, Redes Sociais, WhatsApp).
*   **`iamurel_appearance`**: Guarda os hexadecimais de cores, URLs de imagens Hero, tipografia e booleanos (true/false) de visibilidade das seções.
*   **`iamurel_services`**: Lista os serviços/especialidades.
*   **`iamurel_packages`**: Guarda os planos. Possui uma coluna `items` tipada como `JSONB` (para armazenar arrays de entregáveis dinâmicos dentro da própria tabela relacional) e um status (active/archived).
*   **`iamurel_leads`**: A tabela de CRM. Guarda os contatos que chegam pelo site, status do funil (novo, andamento, fechado) e data do contato.

---

## 🚨 5. O Diário de Bordo: Detalhamento dos Bugs (Perrengues) e Correções

Aqui está o registro técnico e cirúrgico dos maiores obstáculos superados durante o desenvolvimento.

### 🐛 Perrengue #1: O "Efeito Borrado" Fantasma
**O Problema:** A pedido do usuário, implementamos um *Toggle* no painel para desligar o efeito 3D (Scroll). A animação usava a propriedade `initial={{ filter: "blur(10px)", opacity: 0 }}`. Ao desativar o 3D pelo painel, a variável mudava, o componente desativava o `whileInView`, mas ele "congelava" no estado `initial`. O site inteiro ficava borrado para sempre.
**A Causa:** O Framer Motion não reavalia estilos estáticos removidos de uma prop condicional após a primeira montagem, a menos que o `key` do componente mude.
**A Solução Técnica:** Refizemos o componente `<ScrollReveal>`. Adicionamos um *early return* ou uma renderização condicional que ignora completamente a tag `<motion.div>` e renderiza uma `<div>` normal, com os filtros resetados para zero, caso a opção `enable_3d` venha como `false` do banco.

### 💥 Perrengue #2: Tela Branca da Morte no CMS (Colisão de Loops)
**O Problema:** Durante a adição da funcionalidade de colocar "Itens" dentro de um Pacote, ocorreu um *Crash* do React e a tela de Conteúdos ficou totalmente em branco (Render Error).
**A Causa:** O código que mapeava a adição de itens (`pkg.items.map`) foi injetado erroneamente dentro do loop de *Serviços* (`services.map`). Como a interface `Service` não possuía a propriedade `items` (que pertencia a `Package`), o React tentava acessar `undefined.map()`, gerando um "Uncaught TypeError" que derrubava a árvore de componentes.
**A Solução Técnica:**
1. Escrevemos um script Node.js (`patch-items.cjs`) para extrair cirurgicamente o bloco JSX de dentro da `div` de Serviços usando Regex e substituição de strings.
2. Injetamos o bloco no local correto, imediatamente antes do fechamento da `div` do objeto `Package`.
3. Reconstruímos o App (`npm run build`) para validar a limpeza da sintaxe.

### ☁️ Perrengue #3: O "Bucket Not Found" (Bloqueio de Storage RLS)
**O Problema:** No painel de Aparência, ao tentar fazer upload da Imagem Principal (Hero), o console logava `Bucket not found` e o upload falhava silenciosamente.
**A Causa:** O cliente oficial do `@supabase/supabase-js` tentava subir o arquivo para o bucket `media`. Embora o banco estivesse conectado, esse bucket não existia na infraestrutura da nuvem, e por padrão de segurança (RLS - Row Level Security), buckets novos são privados.
**A Solução Técnica:** Em vez de tentar forçar a criação pelo Frontend (o que exige chave de Service Role / Admin), criamos um script SQL definitivo. Adicionamos a aba "Resolução de Problemas" no painel, orientando o usuário a colar o script que faz: `INSERT INTO storage.buckets...` e `CREATE POLICY "Public Access" ON storage.objects`. Após a execução, o upload funcionou instantaneamente.

### 🕵️ Perrengue #4: A Miragem da Guia Anônima e Cache Persistente
**O Problema:** O usuário alterava e-mails, títulos e cores no painel administrativo e via as mudanças na hora. Porém, ao abrir a página em uma Guia Anônima (ou outro dispositivo), o site mostrava a versão padrão de fábrica (Mock Data).
**A Causa:** Para facilitar o onboarding, o código `supabase.ts` tentava resgatar a chave e a URL do Supabase da `localStorage` do navegador logado do usuário. Em uma guia anônima, a `localStorage` é vazia. Sem credenciais, o `data.ts` executava o bloco `catch` e devolvia os dados do `mockData.ts`.
**A Solução Técnica:** Migração estrita para Variáveis de Ambiente de Servidor. Instruímos o usuário a preencher as *Secrets* (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) diretamente na plataforma de hospedagem/build. O Vite compila essas variáveis e as injeta nativamente na execução, garantindo que qualquer visitante global utilize o Supabase correto.

### 📩 Perrengue #5: Arquitetura Serverless para Emails
**O Problema:** Precisávamos enviar uma notificação para `iamurelbrasil@gmail.com` sempre que um Lead caísse no CRM. Como a aplicação React é puramente Client-Side e roda em ambientes estáticos (Cloud Run / Vercel), usar pacotes como `nodemailer` exigiria criar um servidor backend inteiro (`server.ts` ou rota Serverless) apenas para isso.
**A Solução Técnica:** Implementamos um "Hack Elegante" via Webhook (FormSubmit). 
1. Fomos no arquivo `src/lib/data.ts` na função `submitLead`.
2. Após o código realizar o `upsert` no Supabase, adicionamos um bloco assíncrono:
```javascript
await fetch("https://formsubmit.co/ajax/iamurelbrasil@gmail.com", {
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ Assunto: "Novo Lead", Nome: lead.name, ... })
});
```
3. Resultado: Um disparo silencioso e nativo via API, 100% gratuito, sem precisar configurar SMTP, tokens de app do Google, ou manter um servidor Backend ativo.

---

## 🛠️ 6. Histórico de Alterações Exigidas pelo Cliente (Changelog)

Para chegar na versão de Ouro (Produção), fizemos os seguintes incrementos na interface e na lógica:

1. **Feedback Visual de Salvamento:** Adicionamos um estado `success` atrelado a um `setTimeout` de 3000ms. Agora, botões de submissão (Salvar) mudam a cor e o ícone (Lucide `Check`) para confirmar ao usuário que o Supabase recebeu a query com sucesso.
2. **Lixeira para Pacotes:** Adicionado botão de `Trash2` (exclusão permanente) no array de pacotes na interface CMS.
3. **Visibilidade (Draft Mode) de Pacotes:** Adicionado checkbox "Público (Visível)" atrelado à propriedade `pkg.status`. No Frontend (`Home.tsx`), adicionamos um filtro `.filter(pkg => pkg.status !== 'archived')` para garantir que pacotes rascunhados nunca cheguem ao usuário final.
4. **Toggles de Seção Completos:** Expansão da interface de Aparência para incluir chaves `boolean` individuais para: Faixa Rotativa, Metodologia, Pacotes, FAQ e Formulário de Contato.
5. **Correção dos Links de WhatsApp e Email:** O arquivo `Home.tsx` agora mapeia os botões flutuantes para `settings?.whatsapp_number` e os links de mailto para `settings?.contact_email`.

---

## 📖 7. Manual de Instruções para Exportação e Manutenção

Se você planeja exportar este código para rodar localmente ou em outra VPS:

1. **Dependências:** Execute `npm install`.
2. **Desenvolvimento:** Execute `npm run dev`. O Vite subirá a aplicação.
3. **Variáveis de Ambiente:** Crie um arquivo `.env` na raiz do projeto contendo:
   ```env
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
   VITE_ADMIN_EMAIL=seu_email_admin_aqui
   ```
4. **Build para Produção:** Execute `npm run build`. Os arquivos estáticos otimizados serão gerados na pasta `/dist`.

**Desenvolvido com suor, engenharia reversa e código limpo pela IA do Google AI Studio.**
