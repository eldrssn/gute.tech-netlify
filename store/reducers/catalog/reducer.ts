import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchTransportReadCategories,
  fetchCategoriesList,
  fetchCategoriesTreeList,
  fetchCategoriesFiltersList,
  fetchCategoriesProductsList,
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
  fetchTransportProductList,
  fetchTransportFilterList,
} from './actions';

import { CatalogStore, ErrorAction } from './types';
import {
  CategoryResponseData,
  TreeCategoryResponseData,
  FiltersCategoryResponseData,
  CategoriesProductListResponseData,
  CategoriesProductReadResponseData,
  CatalogSearchReadResponseData,
} from 'api/models/catalog';

const initialState: CatalogStore = {
  transportReadCategories: {
    data: [],
    isLoading: false,
    error: null,
  },
  transportProductList: {
    data: { current: '', total: '', pages: '', results: [] },
    isLoading: false,
    error: null,
  },
  transportFilterList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesTreeList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesFilterList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesProductList: {
    data: { current: '', total: '', pages: '', results: [] },
    isLoading: false,
    error: null,
  },
  categoriesProductRead: {
    data: null,
    isLoading: false,
    error: null,
  },
  categoriesSubcategoriesList: {
    data: [],
    isLoading: false,
    error: null,
  },
  catalogSearchRead: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const handlers = {
  [clearCatalogSearchRead.type]: (state: CatalogStore) => {
    state.catalogSearchRead.data = null;
  },

  [fetchTransportProductList.pending.type]: (state: CatalogStore) => {
    state.transportProductList.isLoading = true;
  },
  [fetchTransportProductList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoriesProductListResponseData>,
  ) => {
    state.transportProductList.data = payload;
    state.transportProductList.isLoading = false;
    state.transportProductList.error = null;
  },
  [fetchTransportProductList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.transportProductList.isLoading = false;
    state.transportProductList.error = errorData;
  },

  [fetchTransportReadCategories.pending.type]: (state: CatalogStore) => {
    state.transportReadCategories.isLoading = true;
  },
  [fetchTransportReadCategories.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoryResponseData[]>,
  ) => {
    state.transportReadCategories.data = payload;
    state.transportReadCategories.isLoading = false;
    state.transportReadCategories.error = null;
  },
  [fetchTransportReadCategories.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.transportReadCategories.isLoading = false;
    state.transportReadCategories.error = errorData;
  },

  [fetchCategoriesList.pending.type]: (state: CatalogStore) => {
    state.categoriesList.isLoading = true;
  },
  [fetchCategoriesList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoryResponseData[]>,
  ) => {
    state.categoriesList.data = payload;
    state.categoriesList.isLoading = false;
    state.categoriesList.error = null;
  },
  [fetchCategoriesList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesList.isLoading = false;
    state.categoriesList.error = errorData;
  },

  [fetchCategoriesTreeList.pending.type]: (state: CatalogStore) => {
    state.categoriesTreeList.isLoading = true;
  },
  [fetchCategoriesTreeList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<TreeCategoryResponseData[]>,
  ) => {
    state.categoriesTreeList.data = payload;
    state.categoriesTreeList.isLoading = false;
    state.categoriesTreeList.error = null;
  },
  [fetchCategoriesTreeList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesTreeList.isLoading = false;
    state.categoriesTreeList.error = errorData;
  },

  [fetchTransportFilterList.pending.type]: (state: CatalogStore) => {
    state.transportFilterList.isLoading = true;
  },
  [fetchTransportFilterList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<FiltersCategoryResponseData[]>,
  ) => {
    state.transportFilterList.data = payload;
    state.transportFilterList.isLoading = false;
    state.transportFilterList.error = null;
  },
  [fetchTransportFilterList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.transportFilterList.isLoading = false;
    state.transportFilterList.error = errorData;
  },

  [fetchCategoriesFiltersList.pending.type]: (state: CatalogStore) => {
    state.categoriesFilterList.isLoading = true;
  },
  [fetchCategoriesFiltersList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<FiltersCategoryResponseData[]>,
  ) => {
    state.categoriesFilterList.data = payload;
    state.categoriesFilterList.isLoading = false;
    state.categoriesFilterList.error = null;
  },
  [fetchCategoriesFiltersList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesFilterList.isLoading = false;
    state.categoriesFilterList.error = errorData;
  },

  [fetchCategoriesProductsList.pending.type]: (state: CatalogStore) => {
    state.categoriesProductList.isLoading = true;
  },
  [fetchCategoriesProductsList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoriesProductListResponseData>,
  ) => {
    state.categoriesProductList.data = payload;
    state.categoriesProductList.isLoading = false;
    state.categoriesProductList.error = null;
  },
  [fetchCategoriesProductsList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesProductList.isLoading = false;
    state.categoriesProductList.error = errorData;
  },

  [fetchCategoriesProductsRead.pending.type]: (state: CatalogStore) => {
    state.categoriesProductRead.isLoading = true;
  },
  [fetchCategoriesProductsRead.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoriesProductReadResponseData>,
  ) => {
    state.categoriesProductRead.data = {
      ...payload,
    };
    state.categoriesProductRead.isLoading = false;
    state.categoriesProductRead.error = null;
  },
  [fetchCategoriesProductsRead.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesProductRead.isLoading = false;
    state.categoriesProductRead.error = errorData;
  },

  [fetchCategoriesSubcategoriesList.pending.type]: (state: CatalogStore) => {
    state.categoriesSubcategoriesList.isLoading = true;
  },
  [fetchCategoriesSubcategoriesList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoryResponseData[]>,
  ) => {
    state.categoriesSubcategoriesList.data = payload;
    state.categoriesSubcategoriesList.isLoading = false;
    state.categoriesSubcategoriesList.error = null;
  },
  [fetchCategoriesSubcategoriesList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesSubcategoriesList.isLoading = false;
    state.categoriesSubcategoriesList.error = errorData;
  },

  [fetchCatalogSearchRead.pending.type]: (state: CatalogStore) => {
    state.catalogSearchRead.isLoading = true;
  },
  [fetchCatalogSearchRead.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CatalogSearchReadResponseData>,
  ) => {
    state.catalogSearchRead.data = payload;
    state.catalogSearchRead.isLoading = false;
    state.catalogSearchRead.error = null;
  },
  [fetchCatalogSearchRead.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.catalogSearchRead.isLoading = false;
    state.catalogSearchRead.error = errorData;
  },
};

const catalogReducer = createReducer(initialState, handlers);

export { catalogReducer };
