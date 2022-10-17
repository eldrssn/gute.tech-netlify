import { createAction } from '@reduxjs/toolkit';

import {
  getTransportProductListRead,
  getCategoriesList,
  getCategoriesTreeList,
  getCategoriesFiltersList,
  getCategoriesProductsList,
  getCategoriesProductsRead,
  getCategoriesSubcategoriesList,
  getCatalogSearchRead,
  getTransportFilterList,
  getTransportCategoriesRead,
  getCategoriesSubcategoriesRead,
  getRecommendedProductsList,
  getProductBrandsList,
  getProductModelsList,
  getProductYearsList,
  getProductTransportsList,
} from 'api/routes/catalog';
import {
  TransportSearchRequestData,
  CategoriesFiltersListRequestData,
  CategoriesProductsListRequestData,
  CategoriesProductsReadRequestData,
  CategoriesSubcategoriesListRequestData,
  TransportProductListRead,
  CatalogSearchReadRequestData,
  CategoriesSubcategoriesReadRequestData,
  CategoryResponseData,
  CategoriesProductListResponseData,
  TreeCategoryResponseData,
  FiltersCategoryResponseData,
  CategoriesProductReadResponseData,
  CatalogSearchReadResponseData,
  RecommendedProductsListRequestData,
  RecommendedResponceData,
  ProductTransportListResponseData,
  ProductBrandsListRequestData,
  ProductModelsListRequestData,
  ProductYearsListRequestData,
  ProductTransportListRequestData,
} from 'api/models/catalog';
import { createAsyncAction } from 'utility/helpers/store';

const clearCatalogSearchRead = createAction('clearCatalogSearchRead');
const setIsLoadingCatalogSearchRead = createAction(
  'setIsLoadingCatalogSearchRead',
);
const clearCatalog = createAction('CatalogStore/clearCatalog');
const clearRecommendedProductsList = createAction(
  'CatalogStore/clearRecommendedProductsList',
);
const clearProductInstallationError = createAction(
  'clearProductInstallationError',
);

const fetchTransportFilterList = createAsyncAction<
  CategoryResponseData[],
  TransportProductListRead
>({
  typeAction: 'CatalogStore/fetchTransportFiltersList',
  request: getTransportFilterList,
});

const fetchTransportReadCategories = createAsyncAction<
  CategoryResponseData[],
  TransportSearchRequestData
>({
  typeAction: 'CatalogStore/fetchTransportReadCategories',
  request: getTransportCategoriesRead,
});

const fetchTransportProductList = createAsyncAction<
  CategoriesProductListResponseData,
  TransportProductListRead
>({
  typeAction: 'CatalogStore/fetchSearchProductList',
  request: getTransportProductListRead,
});

const fetchCategoriesList = createAsyncAction<CategoryResponseData[]>({
  typeAction: 'CatalogStore/fetchCategoriesList',
  request: getCategoriesList,
});

const fetchCategoriesTreeList = createAsyncAction<TreeCategoryResponseData[]>({
  typeAction: 'CatalogStore/fetchCategoriesTreeList',
  request: getCategoriesTreeList,
});

const fetchCategoriesFiltersList = createAsyncAction<
  FiltersCategoryResponseData[],
  CategoriesFiltersListRequestData
>({
  typeAction: 'CatalogStore/fetchCategoriesFiltersList',
  request: getCategoriesFiltersList,
});

const fetchCategoriesProductsList = createAsyncAction<
  CategoriesProductListResponseData,
  CategoriesProductsListRequestData
>({
  typeAction: 'CatalogStore/fetchCategoriesProductsList',
  request: getCategoriesProductsList,
});

const fetchCategoriesProductsRead = createAsyncAction<
  CategoriesProductReadResponseData,
  CategoriesProductsReadRequestData
>({
  typeAction: 'CatalogStore/fetchCategoriesProductsRead',
  request: getCategoriesProductsRead,
});

const fetchCategoriesSubcategoriesList = createAsyncAction<
  CategoryResponseData[],
  CategoriesSubcategoriesListRequestData
>({
  typeAction: 'CatalogStore/fetchCategoriesSubcategoriesList',
  request: getCategoriesSubcategoriesList,
});

const fetchCatalogSearchRead = createAsyncAction<
  CatalogSearchReadResponseData,
  CatalogSearchReadRequestData
>({
  typeAction: 'CatalogStore/fetchCatalogSearchRead',
  request: getCatalogSearchRead,
});

const fetchCategoriesSubcategoriesRead = createAsyncAction<
  CategoryResponseData[],
  CategoriesSubcategoriesReadRequestData
>({
  typeAction: 'CatalogStore/fetchCategoriesSubcategoriesRead',
  request: getCategoriesSubcategoriesRead,
});

const fetchRecommendedProductsList = createAsyncAction<
  RecommendedResponceData,
  RecommendedProductsListRequestData
>({
  typeAction: 'CatalogStore/fetchRecommendedProductsList',
  request: getRecommendedProductsList,
});

const fetchProductBrandsList = createAsyncAction<
  ProductTransportListResponseData[],
  ProductBrandsListRequestData
>({
  typeAction: 'CatalogStore/fetchProductBrandsList',
  request: getProductBrandsList,
});

const fetchProductModelsList = createAsyncAction<
  ProductTransportListResponseData[],
  ProductModelsListRequestData
>({
  typeAction: 'CatalogStore/fetchProductModelsList',
  request: getProductModelsList,
});

const fetchProductYearsList = createAsyncAction<
  ProductTransportListResponseData[],
  ProductYearsListRequestData
>({
  typeAction: 'CatalogStore/fetchProductYearsList',
  request: getProductYearsList,
});

const fetchProductTransportsList = createAsyncAction<
  ProductTransportListResponseData[],
  ProductTransportListRequestData
>({
  typeAction: 'CatalogStore/fetchProductTransportsList',
  request: getProductTransportsList,
});

export {
  clearCatalog,
  clearProductInstallationError,
  fetchTransportReadCategories,
  fetchCategoriesList,
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
  setIsLoadingCatalogSearchRead,
  fetchCategoriesTreeList,
  fetchCategoriesFiltersList,
  fetchCategoriesProductsList,
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
  fetchCategoriesSubcategoriesRead,
  fetchTransportProductList,
  fetchTransportFilterList,
  fetchRecommendedProductsList,
  clearRecommendedProductsList,
  fetchProductBrandsList,
  fetchProductModelsList,
  fetchProductYearsList,
  fetchProductTransportsList,
};
