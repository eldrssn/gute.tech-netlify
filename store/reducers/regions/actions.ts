import { createAction } from '@reduxjs/toolkit';

import { getRegions, getBranches } from 'api/routes/regions';
import { RegionData, BranchesData } from 'api/models/regions';
import { createAsyncAction } from 'utility/helpers/store';

import { SelectedCity } from './types';

const selectRegion = createAction<SelectedCity>('selectRegion');

const fetchRegions = createAsyncAction<RegionData[]>({
  typeAction: 'region/fetchRegions',
  request: getRegions,
});

const fetchBranches = createAsyncAction<BranchesData[]>({
  typeAction: 'region/fetchBranches',
  request: getBranches,
});

export { fetchRegions, fetchBranches, selectRegion };

//TODO: удалить после теста со всех редьюсеров

// const fetchRegions = createAsyncThunk('region/fetchRegions', async () => {
//   const data = await getRegions();

//   return data;
// });

// const fetchBranches = createAsyncThunk('region/fetchBranches', async () => {
//   const data = await getBranches();

//   return data;
// });
