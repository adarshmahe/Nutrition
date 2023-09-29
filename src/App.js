import React, { useEffect, useState } from 'react';
import './styles/main.scss';
import { useMsal } from '@azure/msal-react';
import SignOutMessage from './components/profile/logout-page/logout-page.jsx';
import NavRoutes from './routes/router.jsx';
import { getToken } from '@/util/api.jsx'
import { msalInstance } from '@/index.js';


const azLoginRequest = {
  scopes: [process.env.AZURE_LOGIN_URL],
};

function App () {
  const { instance, accounts } = useMsal();
  const [userName, setUserName] = useState('');


  useEffect(() => {
    const fetchTokenAsync = async () => {
      await getToken();
    };

    if (accounts.length > 0) {
      const account = accounts[0]; // Assuming you are using only one account
      setUserName(account.name);
    }
    fetchTokenAsync();
  }, [accounts, instance]);

  useEffect(() => {
    const currentAccount = msalInstance.getActiveAccount();
    if (!currentAccount) {
      msalInstance.loginRedirect(azLoginRequest).catch((error) => {
        if (error.errorMessage.includes('interaction_in_progress')) {
          getToken();
        } else {
          console.error('Error during loginRedirect:', error);
        }
      });
      return;
    }
  }, []);

  return (
    <>
      {accounts.length > 0 ? (
        <div className="app-container">
          <NavRoutes userName={userName} />
        </div>
      ) : (
        <SignOutMessage />
      )}
    </>
  );
}

export default App;
