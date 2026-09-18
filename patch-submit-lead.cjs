const fs = require('fs');
let code = fs.readFileSync('src/lib/data.ts', 'utf8');

const replacement = `
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
`;

code = code.replace(
  /    \/\/ Always update local list\s+const current = readLocal<Lead\[\]>\(STORAGE_KEYS\.LEADS, mockLeads\);\s+const updated = \[newLead, \.\.\.current\];\s+writeLocal\(STORAGE_KEYS\.LEADS, updated\);/,
  replacement
);

fs.writeFileSync('src/lib/data.ts', code);
