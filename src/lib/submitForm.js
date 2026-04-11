export const submitToWebhook = async (data) => {
  const url = import.meta.env.Make_Webhook || import.meta.env.VITE_MAKE_WEBHOOK || "https://hook.us2.make.com/wg4swidwdtqgrgjqn2t1og8yvwhy3vx6";
  
  const formData = new FormData();
  formData.append('Name', data.name || '');
  formData.append('Company', data.company || '');
  formData.append('Role', data.role || '');
  formData.append('Phone', data.phone || '');
  formData.append('Email', data.email || '');
  formData.append('Notes', data.notes || '');

  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  });
};
