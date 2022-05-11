import axios, { AxiosRequestConfig } from 'axios';

import { DEV_HOST } from 'constants/variables';

const api = axios.create({
  baseURL: 'https://api.gute.tech/api/v1',
  headers: {
    'content-type': 'application/json',
    'X-Client-Host':
      process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
        ? window.location.hostname
        : DEV_HOST,
  },
});

const sendRequest = <ResponseType>({
  url,
  method,
  config,
}: {
  url: string;
  method: 'get' | 'post';
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

export { sendRequest };
