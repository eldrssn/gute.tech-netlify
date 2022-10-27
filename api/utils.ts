import axios, { AxiosRequestConfig } from 'axios';

import { getCookie } from 'utility/helpers';
import { CookieKey, ApiMethods } from 'constants/types';
import { DEV_HOST } from 'constants/variables';

const apiАuthentication = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/json',
    'X-Client-Host':
      process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
        ? window.location.hostname
        : DEV_HOST,
  },
});

apiАuthentication.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {};
  }
  const access = getCookie(CookieKey.ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${access}`;
  return config;
});

const sendRequestАuthentication = <ResponseType>({
  url,
  method,
  config,
}: {
  url: string;
  method: ApiMethods;
  config?: AxiosRequestConfig;
}) => {
  return apiАuthentication
    .request({
      method,
      url,
      ...config,
    })
    .then<ResponseType>((response) => response.data);
};

const apiNotAuthorized = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/json',
    'X-Client-Host':
      process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
        ? window.location.hostname
        : DEV_HOST,
  },
});

apiNotAuthorized.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {};
  }
  const notAuthorizedToken = getCookie(CookieKey.NOT_AUTHORIZED_TOKEN);
  config.headers.Authorization = `${notAuthorizedToken}`;
  return config;
});

const sendRequestNotAuthorized = <ResponseType>({
  url,
  method,
  config,
}: {
  url: string;
  method: ApiMethods;
  config?: AxiosRequestConfig;
}) => {
  return apiNotAuthorized
    .request({
      method,
      url,
      ...config,
    })
    .then<ResponseType>((response) => response.data);
};

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'https://api-stage.gute.tech/api',
  // api-stage.gute.tech/api
  headers: {
    // origin: 'https://parts.gute.tech',
    // referer: 'https://parts.gute.tech/',

    'content-type': 'application/json',
    // 'X-Client-Host':
    //   process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    //     ? window.location  .hostname
    //     : DEV_HOST,
    'X-Client-Host': 'dev.gute.tech',
  },
});

const sendRequest = <ResponseType>({
  url,
  method,
  config,
}: {
  url: string;
  method: ApiMethods;
  config?: AxiosRequestConfig;
}) => {
  return api
    .request({
      method,
      url,
      ...config,
    })
    .then<ResponseType>((response) => response.data);
};

export {
  sendRequest,
  sendRequestАuthentication,
  apiАuthentication,
  sendRequestNotAuthorized,
};
