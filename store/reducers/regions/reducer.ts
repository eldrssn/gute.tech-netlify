import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
  fetchRegions,
  setBranchId,
  fetchBranches,
  setCitySlug,
} from './actions';
import { initialState } from './constants';

import {
  RegionsStore,
  ErrorAction,
  RegionData,
  SelectedBranchId,
  SelectedCitySlug,
  BranchesData,
} from './types';

const handlers = {
  [HYDRATE]: (state: RegionsStore, action: AnyAction) => {
    state.regions = action.payload.regionStore.regions;
    state.branches = action.payload.regionStore.branches;
  },

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

  [fetchBranches.pending.type]: (state: RegionsStore) => {
    state.branches.isLoading = true;
  },
  [fetchBranches.fulfilled.type]: (
    state: RegionsStore,
    { payload }: PayloadAction<BranchesData[]>,
  ) => {
    state.branches.data = payload;
    state.branches.isLoading = false;
    state.branches.error = null;
  },
  [fetchBranches.rejected.type]: (
    state: RegionsStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.branches.isLoading = false;
    state.branches.error = errorData;
  },

  [setBranchId.type]: (
    state: RegionsStore,
    { payload }: PayloadAction<SelectedBranchId>,
  ) => {
    state.selectedBranchId = payload;
  },
  [setCitySlug.type]: (
    state: RegionsStore,
    { payload }: PayloadAction<SelectedCitySlug>,
  ) => {
    state.selectedCitySlug = payload;
  },
};

const regionReducer = createReducer(initialState, handlers);

export { regionReducer };
