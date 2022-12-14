import { createAction } from '@reduxjs/toolkit';

import { getRegions, getBranches } from 'api/routes/regions';
import { RegionData, BranchesData } from 'api/models/regions';
import { createAsyncAction } from 'utility/helpers/store';

import { SelectedCitySlug } from './types';

const setCitySlug = createAction<SelectedCitySlug>('setCitySlug');

const fetchRegions = createAsyncAction<RegionData[]>({
  typeAction: 'region/fetchRegions',
  request: getRegions,
});

const fetchBranches = createAsyncAction<BranchesData[]>({
  typeAction: 'region/fetchBranches',
  request: getBranches,
});

export { fetchRegions, fetchBranches, setCitySlug };
