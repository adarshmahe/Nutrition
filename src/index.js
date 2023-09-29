import React from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import msalConfig from './authConfig';

export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.addEventCallback((event) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS) &&
    event.payload &&
    event.payload.account
  ) {
    msalInstance.setActiveAccount(event.payload.account);
    console.log('msal callback: login success');
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </>
);