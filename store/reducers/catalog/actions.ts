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
} from 'api/models/catalog';
import { createAsyncAction } from 'utility/helpers/store';

const clearCatalogSearchRead = createAction('clearCatalogSearchRead');
const setIsLoadingCatalogSearchRead = createAction(
  'setIsLoadingCatalogSearchRead',
);
const clearCatalog = createAction('CatalogStore/clearCatalog');

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

export {
  clearCatalog,
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
};

//TODO: удалить после теста со всех редьюсеров

// const fetchTransportFilterList = createAsyncThunk(
//   'CatalogStore/fetchTransportFiltersList',
//   async ({ subcategorySlug, transportId }: TransportProductListRead) => {
//     const data = await getTransportFilterList({
//       subcategorySlug,
//       transportId,
//     });

//     return data;
//   },
// );

// const fetchTransportReadCategories = createAsyncThunk(
//   'CatalogStore/fetchTransportReadCategories',
//   async ({ transportId }: TransportSearchRequestData) => {
//     const data = await getTransportCategoriesRead({
//       transportId,
//     });

//     return data;
//   },
// );

// const fetchTransportProductList = createAsyncThunk(
//   'CatalogStore/fetchSearchProductList',
//   async ({
//     transportId,
//     subcategorySlug,
//     page,
//     sort,
//     order,
//     filter,
//   }: TransportProductListRead) => {
//     const data = await getTransportProductListRead({
//       transportId,
//       subcategorySlug,
//       page,
//       sort,
//       order,
//       filter,
//     });

//     return data;
//   },
// );

// const fetchCategoriesList = createAsyncThunk(
//   'CatalogStore/fetchCategoriesList',
//   async () => {
//     const data = await getCategoriesList();

//     return data;
//   },
// );

// const fetchCategoriesTreeList = createAsyncThunk(
//   'CatalogStore/fetchCategoriesTreeList',
//   async () => {
//     const data = await getCategoriesTreeList();

//     return data;
//   },
// );

// const fetchCategoriesFiltersList = createAsyncThunk(
//   'CatalogStore/fetchCategoriesFiltersList',
//   async ({ subcategorySlug }: CategoriesFiltersListRequestData) => {
//     const data = await getCategoriesFiltersList({ subcategorySlug });

//     return data;
//   },
// );

// const fetchCategoriesProductsList = createAsyncThunk(
//   'CatalogStore/fetchCategoriesProductsList',
//   async ({
//     subcategorySlug,
//     page,
//     sort,
//     order,
//     filter,
//   }: CategoriesProductsListRequestData) => {
//     const data = await getCategoriesProductsList({
//       subcategorySlug,
//       page,
//       sort,
//       order,
//       filter,
//     });

//     return data;
//   },
// );

// const fetchCategoriesProductsRead = createAsyncThunk(
//   'CatalogStore/fetchCategoriesProductsRead',
//   async ({ categorySlug, productSlug }: CategoriesProductsReadRequestData) => {
//     const data = await getCategoriesProductsRead({ categorySlug, productSlug });

//     return data;
//   },
// );

// const fetchCategoriesSubcategoriesList = createAsyncThunk(
//   'CatalogStore/fetchCategoriesSubcategoriesList',
//   async ({ categorySlug }: CategoriesSubcategoriesListRequestData) => {
//     const data = await getCategoriesSubcategoriesList({
//       categorySlug,
//     });

//     return data;
//   },
// );

// const fetchCatalogSearchRead = createAsyncThunk(
//   'CatalogStore/fetchCatalogSearchRead',
//   async ({ searchValue }: CatalogSearchReadRequestData) => {
//     const data = await getCatalogSearchRead({
//       searchValue,
//     });

//     return data;
//   },
// );

// const fetchCategoriesSubcategoriesRead = createAsyncThunk(
//   'CatalogStore/fetchCategoriesSubcategoriesRead',
//   async ({
//     categorySlug,
//     transportId,
//   }: CategoriesSubcategoriesReadRequestData) => {
//     const data = await getCategoriesSubcategoriesRead({
//       categorySlug,
//       transportId,
//     });

//     return data;
//   },
// );
