import { isSupabaseConfigured, supabase } from './supabase';
import {
  mockSettings,
  mockServices,
  mockPackages,
  mockLeads,
  mockShowcases,
  mockFaq,
  defaultAppearance
} from './mockData';
import { SiteSettings, Service, Package, Lead, Showcase, FAQ, AppearanceSettings, LeadNote } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'iamurel_data_settings',
  APPEARANCE: 'iamurel_data_appearance',
  SERVICES: 'iamurel_data_services',
  PACKAGES: 'iamurel_data_packages',
  SHOWCASES: 'iamurel_data_showcases',
  FAQS: 'iamurel_data_faqs',
  LEADS: 'iamurel_data_leads'
};

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
}

export const dataLayer = {
  // --- Site Settings ---
  getSettings: async (): Promise<SiteSettings> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('iamurel_site_settings').select('*').limit(1).single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase getSettings error, falling back to local storage:', e);
      }
    }
    return readLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, mockSettings);
  },

  saveSettings: async (settings: SiteSettings): Promise<{ success: boolean; error?: string }> => {
    writeLocal(STORAGE_KEYS.SETTINGS, settings);
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('iamurel_site_settings').upsert({
          ...settings,
          updated_at: new Date().toISOString()
        });
        if (error) return { success: false, error: error.message };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    }
    return { success: true };
  },

  // --- Appearance Settings ---
  getAppearance: async (): Promise<AppearanceSettings> => {
    return readLocal<AppearanceSettings>(STORAGE_KEYS.APPEARANCE, defaultAppearance);
  },

  saveAppearance: async (appearance: AppearanceSettings): Promise<void> => {
    writeLocal(STORAGE_KEYS.APPEARANCE, appearance);
    // Apply dynamic visual variables if running in browser
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--color-action', appearance.action_color);
      document.documentElement.style.setProperty('--color-text', appearance.primary_color);
    }
  },

  // --- Services ---
  getServices: async (): Promise<Service[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('iamurel_services').select('*').order('order_index');
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase getServices error, falling back to local storage:', e);
      }
    }
    return readLocal<Service[]>(STORAGE_KEYS.SERVICES, mockServices);
  },

  saveServices: async (services: Service[]): Promise<{ success: boolean }> => {
    writeLocal(STORAGE_KEYS.SERVICES, services);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('iamurel_services').upsert(services);
      } catch (e) {
        console.warn('Supabase upsert services error:', e);
      }
    }
    return { success: true };
  },

  // --- Packages ---
  getPackages: async (): Promise<Package[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('iamurel_packages')
          .select('*, items:iamurel_package_items(*)')
          .order('order_index');
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase getPackages error, falling back to local storage:', e);
      }
    }
    return readLocal<Package[]>(STORAGE_KEYS.PACKAGES, mockPackages);
  },

  savePackages: async (packages: Package[]): Promise<{ success: boolean }> => {
    writeLocal(STORAGE_KEYS.PACKAGES, packages);
    if (isSupabaseConfigured && supabase) {
      try {
        for (const pkg of packages) {
          const { items, ...pkgData } = pkg;
          await supabase.from('iamurel_packages').upsert(pkgData);
          if (items && items.length > 0) {
            await supabase.from('iamurel_package_items').upsert(items);
          }
        }
      } catch (e) {
        console.warn('Supabase upsert packages error:', e);
      }
    }
    return { success: true };
  },

  // --- Showcases ---
  getShowcases: async (): Promise<Showcase[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('iamurel_showcases').select('*').order('order_index');
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase getShowcases error, falling back to local storage:', e);
      }
    }
    return readLocal<Showcase[]>(STORAGE_KEYS.SHOWCASES, mockShowcases);
  },

  saveShowcases: async (showcases: Showcase[]): Promise<{ success: boolean }> => {
    writeLocal(STORAGE_KEYS.SHOWCASES, showcases);
    return { success: true };
  },

  // --- FAQ ---
  getFaq: async (): Promise<FAQ[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('iamurel_faq').select('*').order('order_index');
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase getFaq error, falling back to local storage:', e);
      }
    }
    return readLocal<FAQ[]>(STORAGE_KEYS.FAQS, mockFaq);
  },

  saveFaqs: async (faqs: FAQ[]): Promise<{ success: boolean }> => {
    writeLocal(STORAGE_KEYS.FAQS, faqs);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('iamurel_faq').upsert(faqs);
      } catch (e) {
        console.warn('Supabase upsert FAQ error:', e);
      }
    }
    return { success: true };
  },

  // --- Leads CRM ---
  getLeads: async (): Promise<Lead[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('iamurel_leads')
          .select('*, notes:iamurel_lead_notes(*)')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase getLeads error, falling back to local storage:', e);
      }
    }
    return readLocal<Lead[]>(STORAGE_KEYS.LEADS, mockLeads);
  },

  submitLead: async (leadData: Partial<Lead>): Promise<{ success: boolean; error?: string }> => {
    const newLead: Lead = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'ld-' + Date.now(),
      name: leadData.name || '',
      email: leadData.email || '',
      phone: leadData.phone || null,
      business_name: leadData.business_name || '',
      need: leadData.need || '',
      objective: leadData.objective || '',
      timeframe: leadData.timeframe || 'Imediato',
      investment_range: leadData.investment_range || null,
      preferred_channel: leadData.preferred_channel || 'whatsapp',
      message: leadData.message || null,
      origin: leadData.origin || 'Site Institucional',
      consent: true,
      status: 'novo',
      priority: 'medium',
      service_interest: leadData.service_interest || null,
      package_interest: leadData.package_interest || null,
      last_contact_at: null,
      next_follow_up_at: null,
      assigned_to: null,
      tags: ['Novo Lead'],
      created_at: new Date().toISOString(),
      notes: []
    };


    // Always update local list
    const current = readLocal<Lead[]>(STORAGE_KEYS.LEADS, mockLeads);
    const updated = [newLead, ...current];
    writeLocal(STORAGE_KEYS.LEADS, updated);

    // Enviar email via FormSubmit
    try {
      await fetch("https://formsubmit.co/ajax/iamurelbrasil@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Assunto: "Novo Lead via Site: " + newLead.name,
            Nome: newLead.name,
            Email: newLead.email,
            Telefone: newLead.phone || 'Não informado',
            Empresa: newLead.business_name || 'Não informado',
            Necessidade: newLead.need || 'Não informado',
            Objetivo: newLead.objective || 'Não informado',
            CanalPreferido: newLead.preferred_channel || 'Não informado',
            MensagemAdicional: newLead.message || 'Sem mensagem',
            InteresseDeServico: newLead.service_interest || 'Não informado',
            InteresseDePacote: newLead.package_interest || 'Não informado',
            Momento: newLead.timeframe || 'Não informado',
        })
      });
    } catch (err) {
      console.warn("Erro ao enviar email de notificação:", err);
    }


    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { notes, ...dbPayload } = newLead;
        const { error } = await supabase.from('iamurel_leads').insert([dbPayload]);
        if (error) console.warn('Supabase insert lead error (fallback saved locally):', error.message);
      } catch (e) {
        console.warn('Supabase insert lead failed:', e);
      }
    }

    return { success: true };
  },

  updateLeadStatus: async (leadId: string, status: Lead['status']): Promise<boolean> => {
    const current = readLocal<Lead[]>(STORAGE_KEYS.LEADS, mockLeads);
    const updated = current.map(l => (l.id === leadId ? { ...l, status, last_contact_at: new Date().toISOString() } : l));
    writeLocal(STORAGE_KEYS.LEADS, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('iamurel_leads')
          .update({ status, last_contact_at: new Date().toISOString() })
          .eq('id', leadId);
      } catch (e) {
        console.warn('Supabase update status failed:', e);
      }
    }
    return true;
  },

  addLeadNote: async (leadId: string, content: string, author: string = 'Equipe IAMUREL'): Promise<boolean> => {
    const newNote: LeadNote = {
      id: 'nt-' + Date.now(),
      lead_id: leadId,
      content,
      created_by: author,
      created_at: new Date().toISOString()
    };

    const current = readLocal<Lead[]>(STORAGE_KEYS.LEADS, mockLeads);
    const updated = current.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          notes: [...(l.notes || []), newNote]
        };
      }
      return l;
    });
    writeLocal(STORAGE_KEYS.LEADS, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('iamurel_lead_notes').insert([newNote]);
      } catch (e) {
        console.warn('Supabase add note failed:', e);
      }
    }
    return true;
  },

  // --- Backup & Restore ---
  exportBackup: async () => {
    const [settings, appearance, services, packages, showcases, faqs, leads] = await Promise.all([
      dataLayer.getSettings(),
      dataLayer.getAppearance(),
      dataLayer.getServices(),
      dataLayer.getPackages(),
      dataLayer.getShowcases(),
      dataLayer.getFaq(),
      dataLayer.getLeads()
    ]);

    return {
      version: '2.0',
      exported_at: new Date().toISOString(),
      data: {
        settings,
        appearance,
        services,
        packages,
        showcases,
        faqs,
        leads
      }
    };
  },

  importBackup: async (backup: any): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!backup || !backup.data) return { success: false, error: 'Arquivo de backup inválido' };
      const { settings, appearance, services, packages, showcases, faqs, leads } = backup.data;
      if (settings) writeLocal(STORAGE_KEYS.SETTINGS, settings);
      if (appearance) writeLocal(STORAGE_KEYS.APPEARANCE, appearance);
      if (services) writeLocal(STORAGE_KEYS.SERVICES, services);
      if (packages) writeLocal(STORAGE_KEYS.PACKAGES, packages);
      if (showcases) writeLocal(STORAGE_KEYS.SHOWCASES, showcases);
      if (faqs) writeLocal(STORAGE_KEYS.FAQS, faqs);
      if (leads) writeLocal(STORAGE_KEYS.LEADS, leads);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Erro ao restaurar dados' };
    }
  }
};
