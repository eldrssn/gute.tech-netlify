import { sendRequest } from '../utils';

import { RegionData } from '../models/regions';

const getRegions = () =>
  sendRequest<RegionData[]>({
    path: `/branches/regions/`,
    method: 'get',
  });

export { getRegions };
