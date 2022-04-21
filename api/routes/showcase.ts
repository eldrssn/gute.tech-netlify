import { sendRequest } from '../utils';

import { ShowcaseResponseData } from 'api/models/showcase';

const getShowcase = () =>
  sendRequest<ShowcaseResponseData>({
    url: `/showcase/`,
    method: 'get',
  });

export { getShowcase };
