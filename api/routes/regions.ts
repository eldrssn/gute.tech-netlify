import { sendRequest } from '../utils';

import { RegionData, BranchesData } from '../models/regions';

const getRegions = () =>
  sendRequest<RegionData[]>({
    url: `/branches/regions/`,
    method: 'get',
  });

const getBranches = () =>
  sendRequest<BranchesData[]>({
    url: `/branches/`,
    method: 'get',
  });

export { getRegions, getBranches };
