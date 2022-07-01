import { sendRequest } from '../utils';

import { ApiMethods } from 'constants/types';

import { RegionData, BranchesData } from '../models/regions';

const getRegions = () =>
  sendRequest<RegionData[]>({
    url: `/branches/regions/`,
    method: ApiMethods.GET,
  });

const getBranches = () =>
  sendRequest<BranchesData[]>({
    url: `/branches/`,
    method: ApiMethods.GET,
  });

export { getRegions, getBranches };
