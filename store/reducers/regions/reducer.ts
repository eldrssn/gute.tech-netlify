import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { fetchRegions, selectRegion } from './actions';

import { RegionsStore, ErrorAction, RegionData, SelectedCity } from './types';

const initialState: RegionsStore = {
  regions: {
    data: [],
    isLoading: false,
    error: null,
  },
  selectedCity: '',
};

const handlers = {
  [fetchRegions.pending.type]: (state: RegionsStore) => {
    state.regions.isLoading = true;
  },
  [fetchRegions.fulfilled.type]: (
    state: RegionsStore,
    { payload }: PayloadAction<RegionData[]>,
  ) => {
    state.regions.data = payload;
    state.regions.isLoading = false;
    state.regions.error = null;
  },
  [fetchRegions.rejected.type]: (
    state: RegionsStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.regions.isLoading = false;
    state.regions.error = errorData;
  },

  [selectRegion.type]: (
    state: RegionsStore,
    { payload }: PayloadAction<SelectedCity>,
  ) => {
    state.selectedCity = payload;
  },
};

const regionReducer = createReducer(initialState, handlers);

export { regionReducer };
