# 🚀 Relatório Completo de Desenvolvimento: IAMUREL Studio

Este documento contém o dossiê detalhado da criação do sistema web da **IAMUREL**, descrevendo toda a arquitetura desenvolvida, as funcionalidades implementadas, as customizações feitas e, principalmente, o histórico de desafios ("perrengues") enfrentados e solucionados durante a nossa jornada de desenvolvimento.

---

## 🏗️ 1. Visão Geral e Arquitetura

O projeto foi construído do zero focando em um design "Anti-Slop" (sem clichês de IA, com tipografia premium, cores balanceadas e design focado em conversão e autoridade) atrelado a um sistema robusto de gerenciamento de conteúdo (CMS) e CRM próprio.

**Stack Tecnológica:**
*   **Frontend:** React 18+ com Vite, TypeScript, Tailwind CSS.
*   **Animações:** Motion (Framer Motion) para o ScrollReveal 3D e Transições.
*   **Ícones:** Lucide React.
*   **Backend & Banco de Dados:** Supabase (PostgreSQL) para armazenamento de dados, RLS (Row Level Security) e Storage (Bucket de mídias).
*   **Notificações de Email:** Integração Passiva via FormSubmit API.

---

## 🧩 2. Funcionalidades Implementadas

Criamos um sistema "2 em 1" (Site Público + Painel Admin) integrado e dinâmico:

### 🎨 O Site (Frontend Público)
*   **Design Modular:** Seções de Banner, Metodologia (Como Funciona), Cases reais (Para Quem É), Esteira de Produtos (Pacotes) e Contato.
*   **Toggles de Exibição:** Todo o site pode ser modificado. É possível esconder/mostrar botões do WhatsApp, pacotes, FAQs e até os efeitos de desfoque/3D.
*   **Formulário de Captação Rápida:** Um formulário estratégico que alimenta o CRM diretamente.

### ⚙️ O Painel Administrativo (CMS & CRM)
*   **Dashboard e CRM (Leads):** Gestão visual dos clientes que chegam pelo site (Novo, Em Contato, Negociação, Fechado, Perdido), com sistema de "Anotações" internas por lead.
*   **Aparência:** Controle de cores (Principal/Ação), tipografia e nível de animações.
*   **Conteúdo & Seções:** 
    *   Edição ao vivo dos textos hero, CTA, Links sociais.
    *   Gerenciamento de **Especialidades (Serviços)**, detalhando dores e entregáveis.
    *   Gerenciamento de **Pacotes/Planos**, com itens customizáveis, opção de favoritar um pacote e **ocultá-lo** do público (draft mode).
*   **Configurações de Banco de Dados:** Migração fluida entre o armazenamento Local do Navegador e a Nuvem Oficial (Supabase).

---

## 😅 3. Diário de Bordo: Os Desafios e "Perrengues" Superados

Desenvolver um sistema completo em tempo recorde sempre gera algumas "faíscas". Aqui está o registro dos principais bugs que enfrentamos e como os aniquilamos:

### 🚨 Perrengue #1: O "Efeito Borrado" Eterno (Scroll 3D)
*   **O que aconteceu:** Criamos um efeito maravilhoso de entrada 3D (`ScrollReveal`) que usava *blur* (desfoque) e rotação. O usuário pediu para adicionar um "botão de desligar" o 3D. Porém, ao desligar a opção no painel, o site inteiro travou no estado inicial (borrado), parecendo que o usuário estava sem óculos.
*   **A Solução:** Reescrevi o componente de animação para garantir que, caso a chave `enable3d` estivesse falsa, o CSS forçasse `{ filter: 'blur(0px)', scale: 1, rotateX: 0 }`. Site nítido novamente!

### 🚨 Perrengue #2: A Tela Branca da Morte (Erro de Sintaxe e Colisão de Abas)
*   **O que aconteceu:** Durante a implementação dos **Itens do Pacote** (aquelas caixinhas de check de "incluso" ou "não incluso"), um fragmento de código foi injetado na aba errada (dentro do mapeamento de "Serviços"). Resultado: O React entrou em pânico, estourou um erro de renderização e a aba de serviços ficou 100% branca (vazia). Como bônus, quebramos temporariamente a compilação de produção com chaves `}` sobrando no `Home.tsx`.
*   **A Solução:** Fizemos uma cirurgia no código. Limpei a aba de Serviços, transferi o loop de itens corretamente para a aba de Pacotes (`ContentCMS.tsx`), e rodei scripts no terminal (`fix-home-form.cjs`) para limpar a sintaxe perdida. 

### 🚨 Perrengue #3: O "Bucket Not Found" (Arquivos não subiam)
*   **O que aconteceu:** O cliente tentava fazer upload das imagens no painel, e o sistema cuspia um erro vermelho alertando que o "Bucket" não existia. 
*   **A Solução:** Por segurança, o Supabase não deixa que sistemas externos criem pastas de armazenamento sozinhos. Adicionei no próprio painel Admin uma área de "Resolução de Problemas" com o **Script SQL Oficial** para criar o bucket `media` e dar permissões públicas (RLS de Select e Insert). O cliente só precisou rodar o script no painel do Supabase.

### 🚨 Perrengue #4: A Miragem da Guia Anônima (Nuvem vs Local)
*   **O que aconteceu:** O cliente mudava as coisas no painel, via as atualizações lindas... mas quando abria numa aba anônima (ou outro PC), o site estava cru! 
*   **Por quê?** O site estava salvando as credenciais do banco na `localStorage` do navegador logado, ou seja, a guia anônima não sabia em qual banco procurar, e carregava a versão "Dummy" (fictícia).
*   **A Solução:** Instruí o preenchimento das **Variáveis de Ambiente** (`.env`). Fixando as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` diretamente no servidor, garantimos que todos os visitantes, em qualquer lugar do mundo, batessem no banco de dados oficial.

### 🚨 Perrengue #5: Notificações de Lead sem um Servidor Node
*   **O que aconteceu:** Os leads chegavam e iam direitinho pro CRM do painel, mas o cliente queria ser notificado no email oficial (`iamurelbrasil@gmail.com`). Como somos uma aplicação Serverless/Frontend no Vercel/Run, configurar envio de SMTP puro (Nodemailer) ia exigir um Backend à parte.
*   **A Solução:** Hack elegante. Integramos o **FormSubmit**. Interceptei a função `submitLead`, e após salvar no Supabase, criei um bloco `fetch()` disparando um POST silencioso pro FormSubmit. O cliente só precisou ativar o primeiro e-mail, e pronto: relatórios de leads chegando limpos na caixa de entrada sem precisar de um servidor só pra isso!

---

## 🛠️ 4. Observações e Manutenção Futura

*   **Script de Banco de Dados:** Todo o projeto depende da estrutura do banco. O arquivo `sql_init.sql` (agora dentro do seu painel) contém a "planta baixa" da IAMUREL.
*   **Cores e Design:** O design system foi programado para injetar variáveis de CSS baseadas no painel. Se quiser mexer na raiz do Tailwind (no `index.css`), tome cuidado para não sobrepor o script dinâmico de cores do arquivo `App.tsx`.
*   **Segurança:** A `VITE_SUPABASE_ANON_KEY` é segura para expor no Frontend (por isso chama Anon), porque as políticas de leitura e gravação são travadas no Supabase. Mantenha isso em mente.

---

Foi uma construção incrível! De uma ideia solta até um site com CRM e Backend integrados em questão de horas. 

**Desenvolvido com suor, código (e algumas doses de café virtual) pela IA do Google.** 🚀
