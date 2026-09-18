-- Migration for Manus AI Strategic Recommendations & Customization
-- Safe to execute repeatedly in Supabase SQL Editor

BEGIN;

-- 1. Novas colunas em iamurel_site_settings para textos customizáveis
ALTER TABLE public.iamurel_site_settings
  ADD COLUMN IF NOT EXISTS routes_title text DEFAULT 'Três Caminhos para Começar',
  ADD COLUMN IF NOT EXISTS routes_subtitle text DEFAULT 'Identifique o momento atual da sua marca para escolher o melhor formato.',
  ADD COLUMN IF NOT EXISTS route_1_title text DEFAULT 'Nova Identidade ou Refresh Visual',
  ADD COLUMN IF NOT EXISTS route_1_desc text DEFAULT 'Para marcas que precisam de um reposicionamento visual completo ou refinamento do logotipo existente.',
  ADD COLUMN IF NOT EXISTS route_1_cta text DEFAULT 'Ver Pacote Identidade',
  ADD COLUMN IF NOT EXISTS route_2_title text DEFAULT 'Operação Contínua de Conteúdo',
  ADD COLUMN IF NOT EXISTS route_2_desc text DEFAULT 'Rotina editorial mensal com direção de arte e templates consistentes para manter presença de alto nível.',
  ADD COLUMN IF NOT EXISTS route_2_cta text DEFAULT 'Conhecer Operação Mensal',
  ADD COLUMN IF NOT EXISTS route_3_title text DEFAULT 'Campanha ou Demanda Pontual',
  ADD COLUMN IF NOT EXISTS route_3_desc text DEFAULT 'Lançamentos, apresentações institucionais, eventos ou material de campanha com prazo fechado.',
  ADD COLUMN IF NOT EXISTS route_3_cta text DEFAULT 'Consultar Demanda Pontual',
  ADD COLUMN IF NOT EXISTS fit_title text DEFAULT 'Critério de Fit & Alinhamento',
  ADD COLUMN IF NOT EXISTS fit_subtitle text DEFAULT 'Para garantir resultados consistentes, trabalhamos apenas com projetos onde há clara sinergia.',
  ADD COLUMN IF NOT EXISTS fit_included text,
  ADD COLUMN IF NOT EXISTS fit_excluded text,
  ADD COLUMN IF NOT EXISTS journey_title text DEFAULT 'O Que Acontece Após o Contato',
  ADD COLUMN IF NOT EXISTS journey_subtitle text DEFAULT 'Processo transparente, ágil e sem enrolação desde a primeira mensagem.',
  ADD COLUMN IF NOT EXISTS journey_step_1_title text DEFAULT '1. Resposta Inicial em até 24h',
  ADD COLUMN IF NOT EXISTS journey_step_1_desc text DEFAULT 'Recebemos seu formulário ou mensagem no WhatsApp e fazemos um diagnóstico preliminar do momento da sua marca.',
  ADD COLUMN IF NOT EXISTS journey_step_2_title text DEFAULT '2. Alinhamento de Escopo & Direção',
  ADD COLUMN IF NOT EXISTS journey_step_2_desc text DEFAULT 'Conversamos rapidamente sobre objetivos, prazos e entregáveis específicos para desenhar a solução ideal.',
  ADD COLUMN IF NOT EXISTS journey_step_3_title text DEFAULT '3. Proposta Fechada & Início',
  ADD COLUMN IF NOT EXISTS journey_step_3_desc text DEFAULT 'Você recebe o escopo detalhado com valores, cronograma e termos claros. Aprovado, o projeto entra em produção.',
  ADD COLUMN IF NOT EXISTS monthly_title text DEFAULT 'Operação Contínua de Conteúdo',
  ADD COLUMN IF NOT EXISTS monthly_subtitle text DEFAULT 'Entregas consistentes para marcas que precisam de presença visual de alto nível sem contratar equipe interna inteira.',
  ADD COLUMN IF NOT EXISTS monthly_price_anchor text DEFAULT 'A partir de R$ 1.800/mês para esteira contínua',
  ADD COLUMN IF NOT EXISTS monthly_deliverables text,
  ADD COLUMN IF NOT EXISTS monthly_not_included text,
  ADD COLUMN IF NOT EXISTS monthly_revisions text;

-- 2. Novos toggles em iamurel_appearance para ativar/desativar seções
ALTER TABLE public.iamurel_appearance
  ADD COLUMN IF NOT EXISTS enable_three_routes boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_fit_check boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_monthly_table boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_journey_steps boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_showcase_disclaimer boolean DEFAULT true;

COMMIT;
