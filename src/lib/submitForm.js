export const submitToGoogleAppsScript = async (data) => {
  const url = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/a/macros/tageasy.org/s/AKfycbxLy7qod1AtgJJgf_BsmtBQR5hUIVN5I6KpW6FbKPEq9lExUNbr-5b0YEaM2P0ggeU4lw/exec";
  
  const formData = new FormData();
  formData.append('Name', data.Name || '');
  formData.append('Email', data.Email || '');
  formData.append('Phone', data.Phone || '');
  formData.append('Message', data.Message || '');

  // Using no-cors mode works well with Google Apps Script Web Apps when you only need to POST data
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  });
};
