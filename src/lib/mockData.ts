import { SiteSettings, Service, Package, Lead, Showcase, FAQ, AppearanceSettings } from '../types';

export const defaultAppearance: AppearanceSettings = {
  primary_color: '#14171A',
  action_color: '#FF4A1C',
  bg_tone: 'neutral_white',
  border_style: 'minimal',
  motion_level: 'balanced',
  font_pairing: 'contemporary',
  hero_video_url: null,
  hero_image_1_url: null,
  hero_image_2_url: null,
  hero_image_3_url: null,
  enable_3d: true,
  enable_text_banner: true,
  enable_faq: true,
  enable_showcase: true,
  enable_services: true,
  enable_clients: true,
  enable_packages: true,
  enable_contact_form: true,
  enable_three_routes: true,
  enable_fit_check: true,
  enable_monthly_table: true,
  enable_journey_steps: true,
  enable_showcase_disclaimer: true,
};

export const mockSettings: SiteSettings = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'IAMUREL',
  description: 'A IAMUREL combina inteligência artificial, direção criativa e design gráfico para transformar ideias soltas em uma presença de marca clara, consistente e com autoridade real.',
  hero_title: 'Identidade e conteúdo para marcas que precisam se comunicar com autoridade.',
  hero_subtitle: 'Aceleramos a pesquisa e a exploração com inteligência artificial, mas mantemos o contexto, a estratégia e o acabamento visual 100% conduzidos por direção humana. Feito para marcas que se recusam a parecer genéricas.',
  primary_cta_text: 'Iniciar conversa sem compromisso',
  secondary_cta_text: 'Ver demonstrações reais',
  contact_email: 'iamurelbrasil@gmail.com',
  contact_phone: '+55 (48) 99687-7913',
  whatsapp_number: '5548996877913',
  instagram_handle: '@iamurel.studio',
  linkedin_url: 'https://linkedin.com/company/iamurel',
  company_info: 'IAMUREL, Agência de conteúdo AI-First. Santa Catarina - Brasil.',
  terms_of_use: `1. Objeto e Escopo: A IAMUREL presta serviços profissionais de consultoria editorial, design gráfico, identidade visual e direção de conteúdo. Todos os trabalhos entregues respeitam os escopos contratados formalmente entre as partes.
2. Direitos de Propriedade Intelectual: Após a quitação integral dos serviços, todos os direitos patrimoniais de uso dos arquivos finais aprovados são transferidos para o cliente contratante.
3. Rodadas de Refinamento: Cada serviço ou pacote inclui um número pré-definido de rodadas de revisão estruturada. Solicitações adicionais de alteração fora do escopo inicial serão orçadas mediante aprovação prévia.
4. Confidencialidade: Todas as informações comerciais, números internos e dados estratégicos compartilhados durante o projeto são mantidos sob estrito sigilo profissional.`,
  privacy_policy: `1. Coleta de Dados: Coletamos apenas as informações fornecidas voluntariamente através do formulário de contato (nome, e-mail, telefone/WhatsApp, nome do negócio e objetivos de comunicação).
2. Finalidade: Os dados são utilizados unicamente para retorno comercial, envio de propostas e atendimento qualificado. Jamais vendemos, alugamos ou compartilhamos dados com terceiros.
3. Armazenamento e Segurança: Os registros são armazenados em ambiente seguro com controle de acesso criptografado em conformidade com as diretrizes da Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
4. Seus Direitos: O titular pode solicitar a qualquer momento a visualização, retificação ou exclusão permanente dos seus dados de contato enviando mensagem para iamurelbrasil@gmail.com.`,
  // Rotas de Entrada Padrão
  routes_title: 'Qual é o momento atual da sua marca?',
  routes_subtitle: 'Não force a sua empresa em um molde genérico. Escolha a rota exata que resolve o seu gargalo hoje:',
  route_1_title: '1. Identidade Visual & Base de Marca',
  route_1_desc: 'Para empresas sem base sólida, que parecem amadoras no feed e precisam reposicionar a percepção de valor antes de investir em tráfego.',
  route_1_cta: 'Quero criar ou renovar minha marca',
  route_2_title: '2. Conteúdo Mensal & Constância',
  route_2_desc: 'Para quem já tem marca validada e precisa de frequência editorial, carrosséis estratégicos, roteiros e peças prontas todo mês.',
  route_2_cta: 'Quero avaliar o plano mensal',
  route_3_title: '3. Campanhas & Lançamentos',
  route_3_desc: 'Para quem tem uma oferta, produto, evento ou coleção específica e precisa de narrativa, key visuals, páginas e anúncios de alta conversão.',
  route_3_cta: 'Quero estruturar uma campanha',
  // Qualificação / Fit
  fit_title: 'A IAMUREL é o parceiro certo para o seu negócio?',
  fit_subtitle: 'Acreditamos em transparência radical antes de qualquer contratação comercial.',
  fit_included: 'Negócios com produto ou serviço validado e clientes reais\nQuem valoriza acabamento visual autoral e se recusa a usar templates de Canva\nMarcas que entendem que design eleva o valor percebido e permite cobrar mais\nEmpresas que conseguem participar do alinhamento inicial e aprovações',
  fit_excluded: 'Quem procura "artes avulsas de R$ 15" para preencher feed sem estratégia\nQuem espera que posts e logos façam milagre de vendas sem um produto bom\nQuem quer delegar 100% sem enviar informações básicas sobre o negócio\nProjetos de pirâmide, promessas irreais de enriquecimento rápido ou cópias',
  // Jornada Pós-Contato
  journey_title: 'O que acontece após você enviar o formulário?',
  journey_subtitle: 'Sem surpresas, sem ligações chatas de telemarketing. Um processo previsível de diagnóstico:',
  journey_step_1_title: '1. Confirmação & Análise',
  journey_step_1_desc: 'Recebemos suas respostas no CRM e analisamos seu perfil atual, segmento e principais concorrentes.',
  journey_step_2_title: '2. Diagnóstico em até 24h',
  journey_step_2_desc: 'Retornamos pelo WhatsApp comercial com apontamentos sinceros sobre o que a sua marca precisa de fato.',
  journey_step_3_title: '3. Recomendação de Rota',
  journey_step_3_desc: 'Apresentamos a proposta com escopo fechado, prazos e investimento. Você só contrata se fizer sentido.',
  // Conteúdo Mensal Detalhado
  monthly_title: 'Operação de Conteúdo Mensal',
  monthly_subtitle: 'Produção editorial contínua com direção criativa humana e velocidade de inteligência artificial.',
  monthly_price_anchor: 'Sob consulta com diagnóstico prévio',
  monthly_deliverables: '12 a 20 peças finais mensais (carrosséis estruturados 4:5 e peças estáticas)\nCopywriting persuasivo e redação completa de todas as legendas\nDireção de pautas, ganchos magnéticos e roteiros para Reels/Vídeos\nOrganização de pastas na nuvem com arquivos finais em alta resolução',
  monthly_not_included: 'Gravação e filmagem presencial no local do cliente\nInvestimento financeiro nas plataformas de anúncios (Meta Ads / Google Ads)\nRespostas a comentários e direct messages (gestão de SAC/comunidade)',
  monthly_revisions: 'Até 2 rodadas estruturadas de ajustes por lote quinzenal',
};

export const mockServices: Service[] = [
  {
    id: 'srv-01',
    title: 'Identidade Visual & Sistema de Marca',
    problem_solved: 'Sua marca atende clientes de alto valor, mas quem entra na sua página tem a impressão de um negócio improvisado com templates genéricos.',
    deliverables: 'Logotipo com variações vetoriais, sistema de cores com códigos Pantone/HEX/CMYK, hierarquia tipográfica proprietária, manual essencial de uso e biblioteca de elementos gráficos.',
    target_audience: 'Empresas em consolidação, consultorias e profissionais que precisam de um reposicionamento à altura do que cobram.',
    not_included: 'Registro formal de marca junto ao INPI e impressão gráfica física de papelaria.',
    timeframe: '15 a 25 dias úteis',
    investment_range: 'A partir de R$ 2.500',
    image_url: null,
    order_index: 1,
    status: 'active'
  },
  {
    id: 'srv-02',
    title: 'Direção Editorial & Roteiros de Conteúdo',
    problem_solved: 'Você tem repertório técnico e ideias valiosas, mas falta tempo e método para transformar isso em publicações frequentes com gancho, contexto e clareza.',
    deliverables: 'Diagnóstico de canais, matriz mensal de editorias estratégicas, roteiros completos estruturados (gancho, corpo e CTA) e orientação de tom de voz.',
    target_audience: 'Fundadores, especialistas e equipes internas de marketing que produzem conteúdo mas sentem falta de norte editorial.',
    not_included: 'Gravação presencial e edição bruta de vídeo em estúdio.',
    timeframe: 'Acompanhamento contínuo (ciclos mensais)',
    investment_range: 'A partir de R$ 1.800/mês',
    image_url: null,
    order_index: 2,
    status: 'active'
  },
  {
    id: 'srv-03',
    title: 'Design de Peças & Carrosséis Estratégicos',
    problem_solved: 'Cada publicação parece feita por uma pessoa diferente no Canva, gerando poluição visual e baixa retenção de leitura da sua audiência.',
    deliverables: 'Diagramação completa de 12 a 20 peças mensais em alta resolução (carrosséis estruturados e posts únicos) prontas para postar, com curadoria estética e copy persuasiva.',
    target_audience: 'Negócios que precisam de presença digital ativa sem comprometer horas da sua equipe técnica em design.',
    not_included: 'Compra de mídia (tráfego pago) e resposta a comentários ou mensagens privadas.',
    timeframe: 'Ciclos mensais de entrega',
    investment_range: 'A partir de R$ 2.400/mês',
    image_url: null,
    order_index: 3,
    status: 'active'
  },
  {
    id: 'srv-04',
    title: 'Key Visual de Campanhas & Lançamentos',
    problem_solved: 'Você vai lançar um novo produto, serviço ou evento, mas a comunicação visual está espalhada e sem força para criar desejo e percepção de exclusividade.',
    deliverables: 'Conceito visual condutor, key visual máster, kit de criativos de aquecimento e conversão, diagramação de página de captura e apresentações comerciais.',
    target_audience: 'Empresas abrindo inscrições, lançando produtos físicos ou promovendo eventos corporativos.',
    not_included: 'Programação de infraestrutura de servidor ou pagamento de gateways de venda.',
    timeframe: '20 a 30 dias úteis',
    investment_range: 'A partir de R$ 3.800',
    image_url: null,
    order_index: 4,
    status: 'active'
  }
];

export const mockPackages: Package[] = [
  {
    id: 'pkg-01',
    level: 'Essencial',
    commercial_role: 'Base visual profissional para quem precisa sair do improviso com solidez.',
    description: 'O núcleo da sua marca: logotipo equilibrado, cores intencionais e tipografia que transmite seriedade desde o primeiro contato.',
    price: 1900,
    price_type: 'starting_at',
    revisions: '1 rodada estruturada de refinamentos',
    timeframe: '15 dias úteis',
    is_highlighted: false,
    order_index: 1,
    status: 'active',
    items: [
      { id: 'i1', package_id: 'pkg-01', title: 'Logotipo Principal, Variação Horizontal e Símbolo', quantity: '3', order_index: 1 },
      { id: 'i2', package_id: 'pkg-01', title: 'Paleta Cromática com Códigos Digitais e Impressos', quantity: null, order_index: 2 },
      { id: 'i3', package_id: 'pkg-01', title: 'Hierarquia Tipográfica (Títulos, Corpo e Destaque)', quantity: null, order_index: 3 },
      { id: 'i4', package_id: 'pkg-01', title: 'Manual Essencial de Aplicação em PDF', quantity: '1', order_index: 4 },
      { id: 'i5', package_id: 'pkg-01', title: 'Arquivos Finais em Vetor (SVG/EPS) e PNG Transparente', quantity: null, order_index: 5 }
    ]
  },
  {
    id: 'pkg-02',
    level: 'Recomendado',
    commercial_role: 'Identidade aplicada e pronta para circulação ativa no cotidiano do seu negócio.',
    description: 'Combina o sistema de marca completo com templates práticos para redes sociais e apresentações de proposta comercial.',
    price: 3400,
    price_type: 'starting_at',
    revisions: '2 rodadas estruturadas de refinamento',
    timeframe: '20 a 25 dias úteis',
    is_highlighted: true,
    order_index: 2,
    status: 'active',
    items: [
      { id: 'i6', package_id: 'pkg-02', title: 'Tudo contido no Pacote Essencial', quantity: null, order_index: 1 },
      { id: 'i7', package_id: 'pkg-02', title: 'Conjunto de Peças Prontas para Postar em Alta Resolução', quantity: '8', order_index: 2 },
      { id: 'i8', package_id: 'pkg-02', title: 'Modelos de Capa e Assinatura de E-mail Comercial', quantity: '2', order_index: 3 },
      { id: 'i9', package_id: 'pkg-02', title: 'Template de Proposta Comercial / Apresentação Institucional', quantity: '1', order_index: 4 },
      { id: 'i10', package_id: 'pkg-02', title: 'Guia de Tom de Voz e Aplicação Editorial', quantity: '1', order_index: 5 }
    ]
  },
  {
    id: 'pkg-03',
    level: 'Profissional',
    commercial_role: 'Direção criativa contínua para negócios estabelecidos em escala.',
    description: 'Acompanhamento editorial e gráfico dedicado. Cuidamos do conceito, dos roteiros e do design das suas peças para você focar na gestão.',
    price: null,
    price_type: 'on_request',
    revisions: 'Acompanhamento semanal com ajustes iterativos',
    timeframe: 'Ciclos mensais contínuos',
    is_highlighted: false,
    order_index: 3,
    status: 'active',
    items: [
      { id: 'i11', package_id: 'pkg-03', title: 'Matriz Editorial Mensal e Calendário Temático', quantity: '1', order_index: 1 },
      { id: 'i12', package_id: 'pkg-03', title: 'Roteiros Estruturados de Conteúdo de Autoridade', quantity: '12', order_index: 2 },
      { id: 'i13', package_id: 'pkg-03', title: 'Peças Gráficas Finalizadas (Carrosséis e Estáticos)', quantity: '16', order_index: 3 },
      { id: 'i14', package_id: 'pkg-03', title: 'Reunião Mensal de Alinhamento Estratégico e Pauta', quantity: '1', order_index: 4 }
    ]
  },
  {
    id: 'pkg-04',
    level: 'Ultra',
    commercial_role: 'Imersão integral em reposicionamento e governança de comunicação.',
    description: 'Diagnóstico profundo de ponta a ponta: redesign integral, direção criativa de campanhas e suporte dedicado ao conselho executivo.',
    price: null,
    price_type: 'on_request',
    revisions: 'Consultoria dedicada contínua',
    timeframe: 'Sob medida',
    is_highlighted: false,
    order_index: 4,
    status: 'active',
    items: [
      { id: 'i15', package_id: 'pkg-04', title: 'Diagnóstico Completo de Percepção de Marca', quantity: null, order_index: 1 },
      { id: 'i16', package_id: 'pkg-04', title: 'Design System Integral para Múltiplos Pontos de Contato', quantity: null, order_index: 2 },
      { id: 'i17', package_id: 'pkg-04', title: 'Direção de Arte para Lançamentos de Alta Conversão', quantity: null, order_index: 3 },
      { id: 'i18', package_id: 'pkg-04', title: 'Canal Direto de Suporte Criativo com os Sócios', quantity: null, order_index: 4 }
    ]
  }
];

export const mockShowcases: Showcase[] = [
  {
    id: 'shw-01',
    title: 'Estrutura de Carrossel Editorial de Alta Retenção',
    label: 'demonstration',
    context: 'Demonstração prática de como transformar um tópico técnico em uma narrativa com ritmo, sem parecer um slide chato de PowerPoint.',
    decision: 'Quebra de padrão na capa, alternância entre frases curtas e diagramas conceituais, e fechamento com pergunta que gera comentários qualificados.',
    deliverable: 'Carrossel 4:5 finalizado em alta resolução com copy validada, espaçamentos matemáticos e respiro visual.',
    image_url: null,
    order_index: 1,
    type: 'carousel',
    slides: [
      {
        title: 'Capa: Quebra de Objeção',
        body: 'O erro de achar que ter mais seguidores é sinônimo de ter mais faturamento.',
        note: 'Hierarquia editorial pesada: tipografia serifada com contraste e subtítulo direto.'
      },
      {
        title: 'Slide 2: O Problema Real',
        body: 'Audiência passiva não compra. Quem te segue por memes raramente contrata seu serviço de R$ 4.000.',
        note: 'Bloco de respiro centralizado. Apenas um pensamento forte por slide.'
      },
      {
        title: 'Slide 3: O Contraste Estratégico',
        body: 'Conteúdo de Autoridade vs. Conteúdo de Volume: O primeiro qualifica e filtra; o segundo apenas alimenta vaidade.',
        note: 'Diagrama visual limpo com paleta sóbria marfim e carvão.'
      },
      {
        title: 'Slide 4: A Conclusão Intencional',
        body: 'Sua presença digital deve afastar os curiosos e fazer o cliente ideal pensar: "Essa empresa entende meu problema melhor do que eu".',
        note: 'Chamada de fechamento sem pedir likes vazios.'
      }
    ]
  },
  {
    id: 'shw-02',
    title: 'Sistema de Identidade Visual Tátil & Atemporal',
    label: 'author_study',
    context: 'Estudo autoral demonstrando a composição de uma paleta sóbria com foco em legibilidade, contraste e sofisticação editorial.',
    decision: 'Eliminação de gradientes aleatórios. Adoção de tons minerais: marfim pergaminho (#FDFDFB), carvão mineral (#242422), verde-petróleo profundo (#1A5F6A) e acento coral (#D95B43).',
    deliverable: 'Manual com regras de proporção cromática 60-30-10 e espécime tipográfico.',
    image_url: null,
    order_index: 2,
    type: 'identity',
    specimens: {
      colors: [
        { name: 'Carvão Mineral', hex: '#242422', role: 'Corpo de texto e autoridade principal' },
        { name: 'Marfim Pergaminho', hex: '#FDFDFB', role: 'Fundo suave de alta leitura' },
        { name: 'Verde Petróleo', hex: '#1A5F6A', role: 'Institucional, solidez e confiança' },
        { name: 'Coral Queimado', hex: '#D95B43', role: 'Ponto focal e ação comercial' }
      ],
      fonts: [
        { name: 'Playfair Display', style: 'Títulos editoriais com peso e refinamento' },
        { name: 'Plus Jakarta Sans', style: 'Texto corrido com clareza em telas pequenas' }
      ]
    }
  },
  {
    id: 'shw-03',
    title: 'Anatomia de um Roteiro de Conversão em 4 Atos',
    label: 'process_example',
    context: 'Exemplo prático de como a IAMUREL estrutura a comunicação em roteiros executáveis para o dia a dia.',
    decision: 'Substituição de discursos vagos por uma progressão lógica: Diagnóstico da dor -> Desmistificação -> Metodologia prática -> Convite respeitoso.',
    deliverable: 'Planilha de roteirização com tempo estimado de fala e notas de apoio visual para a equipe.',
    image_url: null,
    order_index: 3,
    type: 'script'
  }
];

export const mockFaq: FAQ[] = [
  {
    id: 'faq-01',
    question: 'Como a Inteligência Artificial é realmente utilizada nos projetos da IAMUREL?',
    answer: 'A IA entra onde o computador é imbatível: processar dezenas de referências em segundos, mapear concorrentes, estruturar dados brutos e gerar variações preliminares de teste. A curadoria, o tom de voz, a hierarquia tipográfica, a sensibilidade humana e a responsabilidade criativa são 100% conduzidas por nossos diretores de arte e redatores.',
    order_index: 1
  },
  {
    id: 'faq-02',
    question: 'Qual é o risco de contratar uma agência tradicional vs. o modelo da IAMUREL?',
    answer: 'Agências tradicionais costumam cobrar mensalidades altas para manter estruturas lentas, delegando seu projeto a estagiários que utilizam templates prontos. Na IAMUREL, o fluxo é ágil, enxuto e sem burocracia: você fala diretamente com quem planeja e desenha o seu material.',
    order_index: 2
  },
  {
    id: 'faq-03',
    question: 'Eu já possuo uma logo existente. Vocês trabalham apenas com a parte de conteúdo e design de redes?',
    answer: 'Sim, com frequência. Analisamos a identidade que você já possui e criamos um sistema de comunicação completo (peças finalizadas em alta resolução, roteiros de postagem e calendário mensal) para valorizar e dar consistência ao que sua marca já construiu.',
    order_index: 3
  },
  {
    id: 'faq-04',
    question: 'Como funciona o processo após o envio do formulário de contato?',
    answer: 'Recebemos seus dados em nossa central interna de atendimento. Analisamos seu segmento e em até 1 dia útil entramos em contato pelo canal de sua preferência (WhatsApp ou e-mail) com um diagnóstico inicial e uma recomendação de formato sem compromisso.',
    order_index: 4
  },
  {
    id: 'faq-05',
    question: 'Como funcionam os prazos de entrega e rodadas de revisão?',
    answer: 'Previsibilidade é inegociável. Cada pacote possui prazo estipulado em dias úteis e um número fechado de rodadas de refinamento estruturado. Você sabe exatamente quando vai receber e o que esperar de cada entrega antes de assinar o contrato.',
    order_index: 5
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Carolina Mendes',
    email: 'carolina.mendes@advocacia.com.br',
    phone: '+55 11 99887-1122',
    business_name: 'Mendes & Associados Direito Corporativo',
    need: 'Reposicionamento completo de marca e linha editorial',
    objective: 'Transmitir autoridade no LinkedIn e Instagram para atrair clientes corporativos de maior porte.',
    timeframe: 'Próximos 30 dias',
    investment_range: 'R$ 3.000 a R$ 6.000',
    preferred_channel: 'whatsapp',
    message: 'Nossa comunicação atual parece amadora perto da complexidade dos casos que atendemos. Queremos algo sóbrio e elegante.',
    origin: 'Site Institucional',
    consent: true,
    status: 'novo',
    priority: 'high',
    service_interest: 'Identidade Visual & Sistema de Marca',
    package_interest: 'Recomendado',
    last_contact_at: null,
    next_follow_up_at: new Date(Date.now() + 86400000).toISOString(),
    assigned_to: null,
    tags: ['Jurídico', 'Alto Valor', 'Prioridade'],
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: [
      {
        id: 'n1',
        lead_id: 'lead-1',
        content: 'Lead qualificado. Escritório com 12 advogados em SP.',
        created_by: 'Raul Miranda',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ]
  },
  {
    id: 'lead-2',
    name: 'Roberto Valente',
    email: 'roberto@valenteconsultoria.com',
    phone: '+55 21 98111-4455',
    business_name: 'Valente Finanças Estratégicas',
    need: 'Direção de Conteúdo e Roteiros Mensais',
    objective: 'Publicar 3x por semana no Instagram e LinkedIn sem perder tempo redigindo do zero.',
    timeframe: 'Imediato',
    investment_range: 'R$ 2.000 a R$ 4.000/mês',
    preferred_channel: 'email',
    message: 'Tenho muito conhecimento prático mas travo na hora de diagramar posts e criar ganchos.',
    origin: 'Site Institucional',
    consent: true,
    status: 'em_analise',
    priority: 'medium',
    service_interest: 'Direção Editorial & Roteiros de Conteúdo',
    package_interest: 'Profissional',
    last_contact_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    next_follow_up_at: new Date(Date.now() + 86400000 * 2).toISOString(),
    assigned_to: null,
    tags: ['Financeiro', 'Conteúdo Recorrente'],
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];
