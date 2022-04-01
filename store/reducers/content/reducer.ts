import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { fetchBrands, fetchModels } from './actions';

import { ContentStore, CarDetailsItemData, ErrorAction } from './types';

const initialState: ContentStore = {
  brands: {
    data: [],
    isLoading: false,
    error: null,
  },
  models: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const handlers = {
  [fetchBrands.pending.type]: (state: ContentStore) => {
    state.brands.isLoading = true;
  },
  [fetchBrands.fulfilled.type]: (
    state: ContentStore,
    { payload }: PayloadAction<CarDetailsItemData[]>,
  ) => {
    state.brands.data = payload;
    state.brands.isLoading = false;
    state.brands.error = null;
  },
  [fetchBrands.rejected.type]: (
    state: ContentStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.brands.isLoading = false;
    state.brands.error = errorData;
  },

  [fetchModels.pending.type]: (state: ContentStore) => {
    state.models.isLoading = true;
  },
  [fetchModels.fulfilled.type]: (
    state: ContentStore,
    { payload }: PayloadAction<CarDetailsItemData[]>,
  ) => {
    state.models.data = payload;
    state.models.isLoading = false;
    state.models.error = null;
  },
  [fetchModels.rejected.type]: (
    state: ContentStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.models.isLoading = false;
    state.models.error = errorData;
  },
};

const contentReducer = createReducer(initialState, handlers);

export { contentReducer };
