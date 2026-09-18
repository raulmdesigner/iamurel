import { supabase, configurationError } from './supabase';
import { mockSettings, defaultAppearance } from './mockData';
import { SiteSettings, Service, Package, Lead, Showcase, FAQ, AppearanceSettings } from '../types';
import { errorMessage } from './errors';

type Result = { success: boolean; error?: string };
function client() {
  if (!supabase) throw new Error(configurationError);
  return supabase;
}
async function checked<T>(query: PromiseLike<{ data: T; error: any }>): Promise<T> {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}
async function save(operation: () => Promise<unknown>): Promise<Result> {
  try { await operation(); return { success: true }; }
  catch (error) { return { success: false, error: errorMessage(error) }; }
}
async function collection<T>(table: string): Promise<T[]> {
  return await checked(client().from(table).select('*').order('order_index')) as T[];
}
async function replaceCollection(table: string, rows: unknown[]): Promise<Result> {
  // One transaction: removals and edits either all succeed or all roll back.
  return save(() => checked(client().rpc('iamurel_replace_collection', { target_table: table, rows })));
}
export const dataLayer = {
  getSettings: async (): Promise<SiteSettings> => {
    const row = await checked(client().from('iamurel_site_settings').select('*').order('id').limit(1).maybeSingle());
    return { ...mockSettings, ...row };
  },
  saveSettings: (settings: SiteSettings): Promise<Result> => save(async () => {
    await checked(client().from('iamurel_site_settings').upsert({ ...settings, updated_at: new Date().toISOString() }).select('id').single());
  }),
  getAppearance: async (): Promise<AppearanceSettings> => {
    const row = await checked(client().from('iamurel_appearance').select('*').order('id').limit(1).maybeSingle());
    return { ...defaultAppearance, ...row };
  },
  saveAppearance: (appearance: AppearanceSettings): Promise<Result> => save(async () => {
    const row = await checked(client().from('iamurel_appearance').select('id').order('id').limit(1).maybeSingle());
    await checked(client().from('iamurel_appearance').upsert({ ...appearance, id: row?.id || '00000000-0000-0000-0000-000000000001', updated_at: new Date().toISOString() }).select('id').single());
  }),
  getServices: () => collection<Service>('iamurel_services'),
  saveServices: (rows: Service[]) => replaceCollection('iamurel_services', rows),
  getPackages: async (): Promise<Package[]> => {
    const rows = await checked(client().from('iamurel_packages').select('*, items:iamurel_package_items(*)').order('order_index'));
    return (rows || []).map(row => ({ ...row, items: (row.items || []).sort((a: any, b: any) => a.order_index - b.order_index) }));
  },
  savePackages: (rows: Package[]) => replaceCollection('iamurel_packages', rows),
  getShowcases: () => collection<Showcase>('iamurel_showcases'),
  saveShowcases: (rows: Showcase[]) => replaceCollection('iamurel_showcases', rows),
  getFaq: () => collection<FAQ>('iamurel_faq'),
  saveFaqs: (rows: FAQ[]) => replaceCollection('iamurel_faq', rows),
  getLeads: async (): Promise<Lead[]> => {
    const rows = await checked(client().from('iamurel_leads').select('*, notes:iamurel_lead_notes(*)').order('created_at', { ascending: false }));
    return (rows || []).map(row => ({ ...row, notes: (row.notes || []).sort((a: any, b: any) => a.created_at.localeCompare(b.created_at)) }));
  },
  submitLead: (input: Partial<Lead>): Promise<Result> => save(async () => {
    if (!input.name?.trim() || !input.phone?.trim()) throw new Error('Preencha seu nome e telefone.');
    if (!input.consent) throw new Error('Autorize o contato para enviar sua solicitação.');
    // Success means the CRM received the lead. Never save personal data locally.
    await checked(client().from('iamurel_leads').insert({
      id: crypto.randomUUID(), name: input.name.trim(), email: input.email || '',
      phone: input.phone.trim(), business_name: input.business_name || '',
      need: input.need || '', objective: input.objective || '', timeframe: input.timeframe || '',
      investment_range: input.investment_range || null, preferred_channel: input.preferred_channel || 'whatsapp',
      message: input.message || null, origin: 'Site IAMUREL', consent: true,
      status: 'novo', priority: 'medium', service_interest: input.service_interest || null,
      package_interest: input.package_interest || null, tags: [],
    }));

    // Notificação imediata para o Gmail da IAMUREL
    try {
      await fetch("https://formsubmit.co/ajax/iamurelbrasil@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Novo Lead no Site: ${input.name.trim()}`,
          Nome: input.name.trim(),
          Email: input.email?.trim() || 'Não informado',
          Telefone: input.phone.trim(),
          Empresa: input.business_name || 'Não informada',
          Necessidade: input.need || 'Não especificada',
          Objetivo: input.objective || 'Não especificado',
          Prazo: input.timeframe || 'Não especificado',
          CanalPreferido: input.preferred_channel || 'whatsapp',
          Mensagem: input.message || 'Sem mensagem adicional',
          InteresseServico: input.service_interest || 'Geral',
          InteressePacote: input.package_interest || 'Geral',
          DataEnvio: new Date().toLocaleString('pt-BR')
        })
      });
    } catch (emailErr) {
      console.warn("Falha ao despachar notificação para Gmail:", emailErr);
    }
  }),
  updateLeadStatus: async (id: string, status: Lead['status']): Promise<boolean> => {
    await checked(client().from('iamurel_leads').update({ status, last_contact_at: new Date().toISOString() }).eq('id', id).select('id').single());
    return true;
  },
  addLeadNote: async (leadId: string, content: string, _author?: string): Promise<boolean> => {
    const { data, error } = await client().auth.getUser();
    if (error || !data.user) throw new Error('Sua sessão expirou. Entre novamente.');
    await checked(client().from('iamurel_lead_notes').insert({ id: crypto.randomUUID(), lead_id: leadId, content, created_by: data.user.id }).select('id').single());
    return true;
  },
  exportBackup: async () => {
    const [settings, appearance, services, packages, showcases, faqs, leads] = await Promise.all([
      dataLayer.getSettings(), dataLayer.getAppearance(), dataLayer.getServices(), dataLayer.getPackages(),
      dataLayer.getShowcases(), dataLayer.getFaq(), dataLayer.getLeads(),
    ]);
    return { version: '3.0', exported_at: new Date().toISOString(), data: { settings, appearance, services, packages, showcases, faqs, leads } };
  },
};
