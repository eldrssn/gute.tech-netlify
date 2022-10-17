import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  CategoryResponseData,
  TreeCategoryResponseData,
  FiltersCategoryResponseData,
  CategoriesProductListResponseData,
  CategoriesProductReadResponseData,
  CatalogSearchReadResponseData,
  RecommendedResponceData,
  ProductTransportListResponseData,
} from 'api/models/catalog';

import {
  fetchTransportReadCategories,
  fetchCategoriesList,
  fetchCategoriesTreeList,
  fetchCategoriesFiltersList,
  fetchCategoriesProductsList,
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
  fetchCategoriesSubcategoriesRead,
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
  fetchTransportProductList,
  fetchTransportFilterList,
  setIsLoadingCatalogSearchRead,
  clearCatalog,
  fetchRecommendedProductsList,
  clearRecommendedProductsList,
  fetchProductBrandsList,
  fetchProductModelsList,
  fetchProductYearsList,
  fetchProductTransportsList,
  clearProductInstallationErrorClear,
} from './actions';

import { CatalogStore, ErrorAction } from './types';
import { initialState, initProductList } from './constants';

const handlers = {
  [clearCatalogSearchRead.type]: (state: CatalogStore) => {
    state.catalogSearchRead.data = null;
  },
  [setIsLoadingCatalogSearchRead.type]: (state: CatalogStore) => {
    state.catalogSearchRead.isLoading = true;
  },
  [clearProductInstallationErrorClear.type]: (state: CatalogStore) => {
    state.productTransportList.error = null;
    state.productYearsList.error = null;
    state.productModelsList.error = null;
    state.productBrandsList.error = null;
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

  [fetchCategoriesSubcategoriesRead.pending.type]: (state: CatalogStore) => {
    state.categoriesSubcategoriesRead.isLoading = true;
  },
  [fetchCategoriesSubcategoriesRead.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<CategoryResponseData[]>,
  ) => {
    state.categoriesSubcategoriesRead.data = payload;
    state.categoriesSubcategoriesRead.isLoading = false;
    state.categoriesSubcategoriesRead.error = null;
  },
  [fetchCategoriesSubcategoriesRead.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.categoriesSubcategoriesRead.isLoading = false;
    state.categoriesSubcategoriesRead.error = errorData;
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
  [clearCatalog.type]: (state: CatalogStore) => {
    state.transportProductList.data = initProductList;
    state.transportFilterList.data = [];
    state.categoriesFilterList.data = [];
    state.categoriesProductList.data = initProductList;
    state.categoriesProductList.isLoading = true;
  },

  [fetchRecommendedProductsList.pending.type]: (state: CatalogStore) => {
    state.recommendedProductsList.isLoading = true;
  },
  [fetchRecommendedProductsList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<RecommendedResponceData>,
  ) => {
    state.recommendedProductsList.data = payload;
    state.recommendedProductsList.isLoading = false;
    state.recommendedProductsList.error = null;
  },
  [fetchRecommendedProductsList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.recommendedProductsList.isLoading = false;
    state.recommendedProductsList.error = errorData;
  },

  [clearRecommendedProductsList.type]: (state: CatalogStore) => {
    state.recommendedProductsList.data = null;
  },

  [fetchProductBrandsList.pending.type]: (state: CatalogStore) => {
    state.productBrandsList.isLoading = true;
  },
  [fetchProductBrandsList.fulfilled.type]: (
    state: CatalogStore,
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
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productBrandsList.data = null;
    state.productBrandsList.isLoading = false;
    state.productBrandsList.error = errorData;
  },

  [fetchProductModelsList.pending.type]: (state: CatalogStore) => {
    state.productModelsList.isLoading = true;
  },
  [fetchProductModelsList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productModelsList.data = payload;
    state.productYearsList.data = null;
    state.productTransportList.data = null;
    state.productModelsList.isLoading = false;
    state.productModelsList.error = null;
  },
  [fetchProductModelsList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productModelsList.data = null;
    state.productModelsList.isLoading = false;
    state.productModelsList.error = errorData;
  },

  [fetchProductYearsList.pending.type]: (state: CatalogStore) => {
    state.productYearsList.isLoading = true;
  },
  [fetchProductYearsList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productYearsList.data = payload;
    state.productTransportList.data = null;
    state.productYearsList.isLoading = false;
    state.productYearsList.error = null;
  },
  [fetchProductYearsList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productYearsList.data = null;
    state.productYearsList.isLoading = false;
    state.productYearsList.error = errorData;
  },

  [fetchProductTransportsList.pending.type]: (state: CatalogStore) => {
    state.productTransportList.isLoading = true;
  },
  [fetchProductTransportsList.fulfilled.type]: (
    state: CatalogStore,
    { payload }: PayloadAction<ProductTransportListResponseData[]>,
  ) => {
    state.productTransportList.data = payload;
    state.productTransportList.isLoading = false;
    state.productTransportList.error = null;
  },
  [fetchProductTransportsList.rejected.type]: (
    state: CatalogStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.productTransportList.data = null;
    state.productTransportList.isLoading = false;
    state.productTransportList.error = errorData;
  },
};

const catalogReducer = createReducer(initialState, handlers);

export { catalogReducer };
