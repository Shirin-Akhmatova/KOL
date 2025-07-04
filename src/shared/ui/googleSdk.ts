export const initializeGoogleLogin = (
  clientId: string,
  callback: (response: google.accounts.id.CredentialResponse) => void
) => {
  if (typeof window === "undefined" || !window.google?.accounts?.id) {
    console.error("Google Identity Services SDK не загружен.");
    return;
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback,
    ux_mode: "popup",
    login_uri: window.location.href,
  });
};
