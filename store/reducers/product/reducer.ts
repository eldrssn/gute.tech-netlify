import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  ProductReadResponseData,
  RecommendedResponceData,
  ProductTransportListResponseData,
  ProductAnaloguesResponseData,
} from 'api/models/product';

import {
  fetchCategoriesProductsRead,
  fetchRecommendedProductsList,
  clearRecommendedProductsList,
  fetchProductBrandsList,
  fetchProductModelsList,
  fetchProductYearsList,
  fetchProductTransportsList,
  clearProductInstallationError,
  fetchProductAnaloguesRead,
} from './actions';

import { ProductStore, ErrorAction } from './types';
import { initialState } from './constants';

const handlers = {
  [clearProductInstallationError.type]: (state: ProductStore) => {
    state.productTransportList.error = null;
    state.productYearsList.error = null;
    state.productModelsList.error = null;
    state.productBrandsList.error = null;
  },

  [fetchCategoriesProductsRead.pending.type]: (state: ProductStore) => {
    state.productRead.isLoading = true;
  },
  [fetchCategoriesProductsRead.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<ProductReadResponseData>,
  ) => {
    state.productRead.data = {
      ...payload,
    };
    state.productRead.isLoading = false;
    state.productRead.error = null;
  },
  [fetchCategoriesProductsRead.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productRead.isLoading = false;
    state.productRead.error = errorData;
  },

  [fetchRecommendedProductsList.pending.type]: (state: ProductStore) => {
    state.productsListRecommended.isLoading = true;
  },
  [fetchRecommendedProductsList.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<RecommendedResponceData>,
  ) => {
    state.productsListRecommended.data = payload;
    state.productsListRecommended.isLoading = false;
    state.productsListRecommended.error = null;
  },
  [fetchRecommendedProductsList.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productsListRecommended.isLoading = false;
    state.productsListRecommended.error = errorData;
  },

  [clearRecommendedProductsList.type]: (state: ProductStore) => {
    state.productsListRecommended.data = null;
  },

  [fetchProductBrandsList.pending.type]: (state: ProductStore) => {
    state.productBrandsList.isLoading = true;
  },
  [fetchProductBrandsList.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productBrandsList.data = payload;
    state.productModelsList.data = null;
    state.productYearsList.data = null;
    state.productTransportList.data = null;
    state.productBrandsList.isLoading = false;
    state.productBrandsList.error = null;
  },
  [fetchProductBrandsList.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productBrandsList.data = null;
    state.productBrandsList.isLoading = false;
    state.productBrandsList.error = errorData;
  },

  [fetchProductModelsList.pending.type]: (state: ProductStore) => {
    state.productModelsList.isLoading = true;
  },
  [fetchProductModelsList.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productModelsList.data = payload;
    state.productYearsList.data = null;
    state.productTransportList.data = null;
    state.productModelsList.isLoading = false;
    state.productModelsList.error = null;
  },
  [fetchProductModelsList.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productModelsList.data = null;
    state.productModelsList.isLoading = false;
    state.productModelsList.error = errorData;
  },

  [fetchProductYearsList.pending.type]: (state: ProductStore) => {
    state.productYearsList.isLoading = true;
  },
  [fetchProductYearsList.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productYearsList.data = payload;
    state.productTransportList.data = null;
    state.productYearsList.isLoading = false;
    state.productYearsList.error = null;
  },
  [fetchProductYearsList.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productYearsList.data = null;
    state.productYearsList.isLoading = false;
    state.productYearsList.error = errorData;
  },

  [fetchProductTransportsList.pending.type]: (state: ProductStore) => {
    state.productTransportList.isLoading = true;
  },
  [fetchProductTransportsList.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productTransportList.data = payload;
    state.productTransportList.isLoading = false;
    state.productTransportList.error = null;
  },
  [fetchProductTransportsList.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productTransportList.data = null;
    state.productTransportList.isLoading = false;
    state.productTransportList.error = errorData;
  },

  [fetchProductAnaloguesRead.pending.type]: (state: ProductStore) => {
    state.productAnaloguesList.isLoading = true;
  },
  [fetchProductAnaloguesRead.fulfilled.type]: (
    state: ProductStore,
    { payload }: PayloadAction<ProductAnaloguesResponseData>,
  ) => {
    state.productAnaloguesList.data = payload;
    state.productAnaloguesList.isLoading = false;
    state.productAnaloguesList.error = null;
  },
  [fetchProductAnaloguesRead.rejected.type]: (
    state: ProductStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productAnaloguesList.data = null;
    state.productAnaloguesList.isLoading = false;
    state.productAnaloguesList.error = errorData;
  },
};

const productReducer = createReducer(initialState, handlers);

export { productReducer };
