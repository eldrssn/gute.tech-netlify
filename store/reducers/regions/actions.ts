import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getRegions, getBranches } from 'api/routes/regions';

import { SelectedCity } from './types';

const fetchRegions = createAsyncThunk('region/fetchRegions', async () => {
  const data = await getRegions();

  return data;
});

const fetchBranches = createAsyncThunk('region/fetchBranches', async () => {
  const data = await getBranches();

  return data;
});

const selectRegion = createAction<SelectedCity>('selectRegion');

export { fetchRegions, fetchBranches, selectRegion };
