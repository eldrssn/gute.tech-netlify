import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  resetEngines,
  resetBrands,
  resetModels,
  resetYears,
} from './actions';

import { TransportStore, CarDetailsItemData, ErrorAction } from './types';

const initialState: TransportStore = {
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
  years: {
    data: [],
    isLoading: false,
    error: null,
  },
  engines: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const handlers = {
  [fetchBrands.pending.type]: (state: TransportStore) => {
    state.brands.isLoading = true;
  },
  [fetchBrands.fulfilled.type]: (
    state: TransportStore,
    { payload }: PayloadAction<CarDetailsItemData[]>,
  ) => {
    state.brands.data = payload;
    state.brands.isLoading = false;
    state.brands.error = null;
  },
  [fetchBrands.rejected.type]: (
    state: TransportStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.brands.isLoading = false;
    state.brands.error = errorData;
  },

  [fetchModels.pending.type]: (state: TransportStore) => {
    state.models.isLoading = true;
  },
  [fetchModels.fulfilled.type]: (
    state: TransportStore,
    { payload }: PayloadAction<CarDetailsItemData[]>,
  ) => {
    state.models.data = payload;
    state.models.isLoading = false;
    state.models.error = null;
  },
  [fetchModels.rejected.type]: (
    state: TransportStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.models.isLoading = false;
    state.models.error = errorData;
  },

  [fetchYears.pending.type]: (state: TransportStore) => {
    state.years.isLoading = true;
  },
  [fetchYears.fulfilled.type]: (
    state: TransportStore,
    { payload }: PayloadAction<string[]>,
  ) => {
    const newPayload = payload.map((item) => {
      const title = item;
      const slug = item;

      return { title, slug };
    });
    state.years.data = newPayload;
    state.years.isLoading = false;
    state.years.error = null;
  },
  [fetchYears.rejected.type]: (
    state: TransportStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.years.isLoading = false;
    state.years.error = errorData;
  },

  [fetchEngines.pending.type]: (state: TransportStore) => {
    state.engines.isLoading = true;
  },
  [fetchEngines.fulfilled.type]: (
    state: TransportStore,
    { payload }: PayloadAction<CarDetailsItemData[]>,
  ) => {
    state.engines.data = payload;
    state.engines.isLoading = false;
    state.engines.error = null;
  },
  [fetchEngines.rejected.type]: (
    state: TransportStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.engines.isLoading = false;
    state.engines.error = errorData;
  },

  [resetBrands.type]: (state: TransportStore) => {
    state.brands.data = [];
  },
  [resetModels.type]: (state: TransportStore) => {
    state.models.data = [];
  },
  [resetYears.type]: (state: TransportStore) => {
    state.years.data = [];
  },
  [resetEngines.type]: (state: TransportStore) => {
    state.engines.data = [];
  },
};

const transportReducer = createReducer(initialState, handlers);

export { transportReducer };
