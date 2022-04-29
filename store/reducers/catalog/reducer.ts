import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchSearchReadCategory,
  fetchCategoriesList,
  fetchCategoriesTreeList,
  fetchCategoriesFiltersList,
  fetchCategoriesProductsList,
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
} from './actions';

import { CatalogStore, ErrorAction } from './types';
import {
  CategoryResponseData,
  TreeCategoryResponseData,
  FiltersCategoryResponseData,
  CategoriesProductsListResponseData,
  CategoriesProductsReadResponseData,
} from 'api/models/catalog';

const initialState: CatalogStore = {
  searchReadCategory: {
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
};

const handlers = {
  [fetchSearchReadCategory.pending.type]: (state: CatalogStore) => {
    state.searchReadCategory.isLoading = true;
  },
  [fetchSearchReadCategory.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoryResponseData[]>,
  ) => {
    state.searchReadCategory.data = payload;
    state.searchReadCategory.isLoading = false;
    state.searchReadCategory.error = null;
  },
  [fetchSearchReadCategory.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.searchReadCategory.isLoading = false;
    state.searchReadCategory.error = errorData;
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
    { payload }: PayloadAction<CategoriesProductsListResponseData>,
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
    { payload }: PayloadAction<CategoriesProductsReadResponseData>,
  ) => {
    state.categoriesProductRead.data = {
      vendorCode: payload.vendor_code,
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
};

const catalogReducer = createReducer(initialState, handlers);

export { catalogReducer };
