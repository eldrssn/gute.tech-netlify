import { sendRequest } from '../utils';

import { ApiMethods } from 'constants/types';

import { RegionData, BranchesData } from '../models/regions';

const getRegions = () =>
  sendRequest<RegionData[]>({
    url: `/v1/branches/regions/`,
    method: ApiMethods.GET,
  });

const getBranches = () =>
  sendRequest<BranchesData[]>({
    url: `/v1/branches/`,
    method: ApiMethods.GET,
  });

export { getRegions, getBranches };
