import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store.js';
import ConceptAiPage from './pages/main.jsx';
import { ConfigProvider, theme, App } from 'antd';
import { useMsal } from '@azure/msal-react';
import { getToken } from '../../util/api.jsx';
import { login } from './api/request.js';

const conceptAi = () => {
  const { accounts } = useMsal();
  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('jwt-access-token'));

  useEffect(() => {
    getToken().then(res => {
      setAccessToken(res);
    });
    if (accounts.length > 0) {
      const account = accounts[0];
      setEmail(account.username);
    }
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem('jwt-access-token') && email && accessToken) {
      login({
        username: email,
        adalToken: accessToken
      })
        .then(res => {
          setToken(res.access_token);
          sessionStorage.setItem('jwt-access-token', res.access_token);
        })
        .catch(err => console.log(err));
    } else {
      console.log(999)
    }
  }, [email, accessToken]);

  if (!token) {
    return null;
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00a32e',
            colorError: '#eb0000',
            colorSuccess: '#06ca3d',
            fontFamily: 'unilever-shilling-regular'
          },
          algorithm: theme.darkAlgorithm
        }}
      >
        <App>
          <Provider store={store}>
            <ConceptAiPage />
          </Provider>
        </App>
      </ConfigProvider>
    </>
  );
};

export default conceptAi;
