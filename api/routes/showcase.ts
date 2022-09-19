import { sendRequest } from '../utils';

import { ApiMethods } from 'constants/types';

import { ShowcaseResponseData } from 'api/models/showcase';

const getShowcase = () =>
  sendRequest<ShowcaseResponseData>({
    url: `/v1/showcase/`,
    method: ApiMethods.GET,
  });

export { getShowcase };
