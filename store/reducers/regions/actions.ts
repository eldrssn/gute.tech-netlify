import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getRegions } from 'api/routes/regions';

import { SelectedCity } from './types';

const fetchRegions = createAsyncThunk('region/fetchRegions', async () => {
  const data = await getRegions();

  return data;
});

const selectRegion = createAction<SelectedCity>('selectRegion');

export { fetchRegions, selectRegion };
