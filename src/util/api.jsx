import axios from 'axios';
import { msalInstance } from '@/index.js';
import { login as loginJwt } from '@/modules/concept-ai/api/request.js';


export async function getToken () {
  // check if aad-token exists
  const aadToken = sessionStorage.getItem('aad-token');
  if (aadToken) {
    return aadToken;
  }
  // get aad authentation
  const currentAccount = msalInstance.getActiveAccount();
  const accessTokenRequest = {
    scopes: [process.env.AZURE_LOGIN_URL],
  };
  let accessTokenResponse = null;

  if (!currentAccount) {
    console.log('msal authentication has not completed.');
    return;
  }

  accessTokenResponse = await msalInstance
    .acquireTokenSilent(accessTokenRequest)
    .catch((error) => {
      if (error.errorCode === 'interaction_in_progress') {
        getToken();
      } else {
        console.log(error);
      }
    });
  sessionStorage.setItem('aad-token', accessTokenResponse.accessToken);
  await loginJwt({
    username: currentAccount.username,
    adalToken: accessTokenResponse.accessToken,
  })
    .then((res) => {
      sessionStorage.setItem('jwt-access-token', res.access_token);
    })
    .catch((err) => console.log(err));

  return accessTokenResponse.accessToken
    ? accessTokenResponse.accessToken
    : accessTokenResponse;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
api.interceptors.request.use(
  async function (req) {
    const aad_token = await getToken();
    req.headers.Authorization = `Bearer ${aad_token}`;
    // access protected az app resources by adding the` X-ZUMO-AUTH` header to your HTTP requests
    req.headers['X-ZUMO-AUTH'] = aad_token;
    return req;
  },
  function (error) {
    if (error.response.status_code == 401) {
      window.sessionStorage.clear();
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.sessionStorage.clear();
    }
    return Promise.reject(error.response);
  }
);

export default api;
