import { sendRequest } from '../utils';

import { RegionData } from '../models/regions';

const getRegions = () =>
  sendRequest<RegionData[]>({
    url: `/branches/regions/`,
    method: 'get',
  });

export { getRegions };
