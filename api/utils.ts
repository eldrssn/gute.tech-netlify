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
  path,
  method,
  config,
}: {
  path: string;
  method: 'get' | 'post';
  config?: AxiosRequestConfig;
}) => {
  return api[method]<ResponseType>(path, config).then(
    (response) => response.data,
  );
};

export { sendRequest };
