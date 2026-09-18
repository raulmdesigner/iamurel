export interface SiteSettings {
  id: string;
  name: string;
  description: string;
  hero_title: string;
  hero_subtitle: string;
  primary_cta_text: string;
  secondary_cta_text: string;
  contact_email: string;
  contact_phone?: string;
  whatsapp_number?: string;
  instagram_handle?: string;
  linkedin_url?: string;
  company_info?: string;
  terms_of_use?: string;
  privacy_policy?: string;
  // Customização de Rotas de Entrada (Diagnóstico Manus)
  routes_title?: string;
  routes_subtitle?: string;
  route_1_title?: string;
  route_1_desc?: string;
  route_1_cta?: string;
  route_2_title?: string;
  route_2_desc?: string;
  route_2_cta?: string;
  route_3_title?: string;
  route_3_desc?: string;
  route_3_cta?: string;
  // Customização de Fit / Qualificação
  fit_title?: string;
  fit_subtitle?: string;
  fit_included?: string;
  fit_excluded?: string;
  // Customização da Jornada Pós-Contato
  journey_title?: string;
  journey_subtitle?: string;
  journey_step_1_title?: string;
  journey_step_1_desc?: string;
  journey_step_2_title?: string;
  journey_step_2_desc?: string;
  journey_step_3_title?: string;
  journey_step_3_desc?: string;
  // Customização da Tabela de Conteúdo Mensal
  monthly_title?: string;
  monthly_subtitle?: string;
  monthly_price_anchor?: string;
  monthly_deliverables?: string;
  monthly_not_included?: string;
  monthly_revisions?: string;
}

export interface AppearanceSettings {
  primary_color: string;
  action_color: string;
  bg_tone: 'cream' | 'neutral_white' | 'pure_minimal';
  border_style: 'sharp' | 'minimal' | 'rounded';
  motion_level: 'reduced' | 'balanced' | 'expressive';
  font_pairing: 'editorial' | 'contemporary' | 'grotesk';
  hero_video_url?: string | null;
  hero_image_1_url?: string | null;
  hero_image_2_url?: string | null;
  hero_image_3_url?: string | null;
  enable_3d?: boolean;
  enable_text_banner?: boolean;
  enable_faq?: boolean;
  enable_showcase?: boolean;
  enable_services?: boolean;
  enable_clients?: boolean;
  enable_packages?: boolean;
  enable_contact_form?: boolean;
  // Novos toggles modulares (Diagnóstico Manus)
  enable_three_routes?: boolean;
  enable_fit_check?: boolean;
  enable_monthly_table?: boolean;
  enable_journey_steps?: boolean;
  enable_showcase_disclaimer?: boolean;
}

export interface Section {
  id: string;
  section_key: string;
  title: string;
  content: string;
  is_published: boolean;
  order_index: number;
}

export interface Service {
  id: string;
  title: string;
  problem_solved: string;
  deliverables: string;
  target_audience: string;
  not_included: string;
  timeframe: string;
  investment_range: string | null;
  image_url: string | null;
  order_index: number;
  status: 'active' | 'archived';
}

export interface Package {
  id: string;
  level: 'Essencial' | 'Recomendado' | 'Profissional' | 'Ultra' | string;
  commercial_role: string;
  description: string;
  price: number | null;
  price_type: 'fixed' | 'starting_at' | 'on_request' | 'hidden';
  revisions: string;
  timeframe: string;
  is_highlighted: boolean;
  order_index: number;
  status: 'active' | 'archived';
  items?: PackageItem[];
}

export interface PackageItem {
  id: string;
  package_id: string;
  title: string;
  quantity: string | null;
  is_included?: boolean;
  order_index: number;
}

export interface Showcase {
  id: string;
  title: string;
  label: 'demonstration' | 'author_study' | 'process_example';
  context: string;
  decision: string;
  deliverable: string;
  image_url: string | null;
  order_index: number;
  type?: 'carousel' | 'identity' | 'script';
  slides?: Array<{ title: string; body: string; note: string }>;
  specimens?: {
    colors: Array<{ name: string; hex: string; role: string }>;
    fonts: Array<{ name: string; style: string }>;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
}

export type LeadStatus = 'novo' | 'em_analise' | 'contatado' | 'proposta_enviada' | 'ganho' | 'perdido' | 'arquivado';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string;
  need: string;
  objective: string;
  timeframe: string;
  investment_range: string | null;
  preferred_channel: string;
  message: string | null;
  origin: string | null;
  consent: boolean;
  status: LeadStatus;
  priority: 'low' | 'medium' | 'high';
  service_interest: string | null;
  package_interest: string | null;
  last_contact_at: string | null;
  next_follow_up_at: string | null;
  assigned_to: string | null;
  tags: string[];
  created_at: string;
  notes?: LeadNote[];
}

export interface LeadNote {
  id: string;
  lead_id: string;
  content: string;
  created_by: string;
  created_at: string;
}

export interface Task {
  id: string;
  lead_id: string;
  title: string;
  due_date: string;
  status: 'pending' | 'completed';
  created_at: string;
}

