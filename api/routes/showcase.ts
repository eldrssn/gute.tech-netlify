import { sendRequest } from '../utils';

import { ShowcaseResponseData } from 'api/models/showcase';

const getShowcase = () =>
  sendRequest<ShowcaseResponseData>({
    path: `/showcase/`,
    method: 'get',
  });

export { getShowcase };
