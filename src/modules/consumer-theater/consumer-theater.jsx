import React, { useState, useEffect } from 'react';
import ConsumerTheaterPage from './pages/consumer-theater-page.jsx';
import { ConfigProvider, theme, App } from 'antd';
import { useMsal } from '@azure/msal-react';
import { getToken } from '../../util/api.jsx';
import { login } from './api/request.js';

const ConsumerTheater = () => {

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
    }
  }, [email, accessToken]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 500);
  });
  
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
          <ConsumerTheaterPage />
        </App>
      </ConfigProvider>
    </>
  );
};

export default ConsumerTheater;
