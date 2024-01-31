import React, { Suspense, lazy } from 'react';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';import ReactDOM from 'react-dom';


import axios from 'axios';

import AuthProvider from 'globalContext';
import { Spin, Message } from 'components';
import Router from 'routes';
import { routerLinks } from 'utils';
import { keyToken, keyUser, linkApi } from 'variable';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import withClearCache from './clear-cache';
// import { AuthService } from './services/user';

const ClearCacheComponent = withClearCache(Router);

axios.defaults.baseURL = linkApi;
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem(keyToken);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (!!error.response && !!error.response.data.errors && error.response.data.errors === 401) ||
      error.response.status === 401
    ) {
      // if (error.response.config.url !== '/auth/refresh') {
      //   const originalRequest = error.config;
      //   const accessToken = await AuthService.refresh();
      //   if (accessToken) {
      //     originalRequest.headers.Authorization = accessToken;
      //     await axios(originalRequest);
      //     return window.location.reload();
      //   }
      // }
      localStorage.removeItem(keyUser);
      window.location.hash = '#' + routerLinks('Login');
    }

    if (error?.response?.data?.message) {
      Message.error({ text: error?.response?.data?.message });
    }
    return false;
  },
);
i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    whitelist: ['en', 'vi'],
    interpolation: {
      escapeValue: false,
    },
  });
const Styling = lazy(() => import('styling'));
function App() {
  return (
    <Suspense
      fallback={
        <Spin>
          <div className="w-screen h-screen" />
        </Spin>
      }
    >
      <Styling>
        <AuthProvider>
          <ClearCacheComponent />
        </AuthProvider>
      </Styling>
    </Suspense>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
