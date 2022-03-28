import axios from 'axios';

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

export { api };
