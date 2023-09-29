let msalConfig = [];

msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority:
      'https://login.microsoftonline.com/f66fae02-5d36-495b-bfe0-78a6ff9f8e6e',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
};

export default msalConfig;
