import { createAction } from '@reduxjs/toolkit';

import {
  getProductBrandsList,
  getProductModelsList,
  getProductYearsList,
  getProductTransportsList,
  getRecommendedProductsList,
  getProductAnaloguesRead,
  getCategoriesProductsRead,
} from 'api/routes/product';
import {
  ProductTransportListRequestData,
  ProductTransportListResponseData,
  ProductBrandsListRequestData,
  ProductModelsListRequestData,
  ProductYearsListRequestData,
  RecommendedProductsListRequestData,
  ProductReadResponseData,
  ProductAnaloguesResponseData,
  RecommendedResponceData,
  ProductsReadRequestData,
} from 'api/models/product';
import { createAsyncAction } from 'utility/helpers/store';

const clearRecommendedProductsList = createAction(
  'CatalogStore/clearRecommendedProductsList',
);
const clearProductInstallationError = createAction(
  'clearProductInstallationError',
);

const fetchCategoriesProductsRead = createAsyncAction<
  ProductReadResponseData,
  ProductsReadRequestData
>({
  typeAction: 'CatalogStore/fetchCategoriesProductsRead',
  request: getCategoriesProductsRead,
});

const fetchProductAnaloguesRead = createAsyncAction<
  ProductAnaloguesResponseData,
  ProductsReadRequestData
>({
  typeAction: 'CatalogStore/fetchProductAnalogueRead',
  request: getProductAnaloguesRead,
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
  clearProductInstallationError,
  fetchCategoriesProductsRead,
  fetchRecommendedProductsList,
  clearRecommendedProductsList,
  fetchProductBrandsList,
  fetchProductModelsList,
  fetchProductYearsList,
  fetchProductTransportsList,
  fetchProductAnaloguesRead,
};
