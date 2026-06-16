// Lead webhook submitter. Accepts the original fields plus the Phase 2 lead
// attribution fields (service interest, page path, website, and UTM data).
// Unknown/empty fields are simply omitted. Uses no-cors so a webhook failure or
// CORS quirk never throws in a way that breaks the form UX.

export const submitToWebhook = async (data = {}) => {
  const url = import.meta.env.VITE_MAKE_WEBHOOK || "https://hook.us2.make.com/wg4swidwdtqgrgjqn2t1og8yvwhy3vx6";

  const formData = new FormData();

  // Core contact fields (backwards compatible with existing forms).
  formData.append('Name', data.name || '');
  formData.append('Company', data.company || '');
  formData.append('Role', data.role || '');
  formData.append('Phone', data.phone || '');
  formData.append('Email', data.email || '');
  formData.append('Notes', data.notes || data.message || '');

  // Phase 2 — lead attribution + routing (Tasks 6, 7, 8).
  if (data.website) formData.append('Website', data.website);
  if (data.serviceInterest) formData.append('ServiceInterest', data.serviceInterest);
  if (data.pagePath) formData.append('PagePath', data.pagePath);
  if (data.source) formData.append('Source', data.source);

  // Spread any UTM / attribution keys (utm_source, utm_medium, ...).
  const attributionKeys = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'landing_page', 'first_seen_at', 'referrer',
  ];
  for (const key of attributionKeys) {
    if (data[key]) formData.append(key, data[key]);
  }

  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  });
};
