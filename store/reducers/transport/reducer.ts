import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  ListOptionsItemData,
  ListOptionsYearData,
  TransportInfoResponseData,
} from 'api/models/transport';

import {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  fetchTransportInfo,
  resetOptionsWhenEditFilter,
  resetTransportInfo,
  resetEngines,
  resetBrands,
  resetModels,
  resetYears,
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
  setTransportId,
  clearTransportId,
} from './actions';
import { initialState } from './constants';

import { TransportStore, ErrorAction, TransportIdData } from './types';

const handlers = {
  [setTransportId.type]: (
    state: TransportStore,
    { payload }: PayloadAction<TransportIdData>,
  ) => {
    state.transportId = payload;
  },
  [clearTransportId.type]: (state: TransportStore) => {
    state.transportId = '';
  },

  [fetchTransportInfo.pending.type]: (state: TransportStore) => {
    state.transportInfo.isLoading = true;
  },
  [fetchTransportInfo.fulfilled.type]: (
    state: TransportStore,
    { payload }: PayloadAction<TransportInfoResponseData>,
  ) => {
    state.transportInfo.data = payload;
    state.transportInfo.isLoading = false;
    state.transportInfo.error = null;
  },
  [fetchTransportInfo.rejected.type]: (
    state: TransportStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.transportInfo.isLoading = false;
    state.transportInfo.error = errorData;
  },

  [fetchBrands.pending.type]: (state: TransportStore) => {
    state.brands.isLoading = true;
  },
  [fetchBrands.fulfilled.type]: (
    state: TransportStore,
    { payload }: PayloadAction<ListOptionsItemData[]>,
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
    { payload }: PayloadAction<ListOptionsItemData[]>,
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
    { payload }: PayloadAction<ListOptionsYearData[]>,
  ) => {
    const newData = payload.map((item) => {
      const title = item;
      const slug = item;

      return { title, slug };
    });
    const sortNewData = newData.sort((a, b) => {
      const previous = Number(a.slug);
      const current = Number(b.slug);

      return current - previous;
    });
    state.years.data = sortNewData;
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
    { payload }: PayloadAction<ListOptionsItemData[]>,
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

  [resetOptionsWhenEditFilter.type]: (state: TransportStore) => {
    state.brands.data = [];
    state.models.data = [];
    state.engines.data = [];
    state.years.data = [];
  },

  [resetTransportInfo.type]: (state: TransportStore) => {
    state.transportInfo.data = null;
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

  [resetOptionsDataInBrandStep.type]: (state: TransportStore) => {
    state.models.data = [];
    state.engines.data = [];
  },
  [resetOptionsDataInModelStep.type]: (state: TransportStore) => {
    state.engines.data = [];
  },
  [resetOptionsDataInYearStep.type]: (state: TransportStore) => {
    state.brands.data = [];
    state.models.data = [];
    state.engines.data = [];
  },
};

const transportReducer = createReducer(initialState, handlers);

export { transportReducer };
