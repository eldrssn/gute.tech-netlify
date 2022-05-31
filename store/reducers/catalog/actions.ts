import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

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
} from 'api/routes/catalog';

import {
  TransportSearchRequestData,
  CategoriesFiltersListRequestData,
  CategoriesProductsListRequestData,
  CategoriesProductsReadRequestData,
  CategoriesSubcategoriesListRequestData,
  TransportProductListRead,
  CatalogSearchReadRequestData,
} from 'api/models/catalog';

const clearCatalogSearchRead = createAction('clearCatalogSearchRead');
const setIsLoadingCatalogSearchRead = createAction(
  'setIsLoadingCatalogSearchRead',
);

const fetchTransportFilterList = createAsyncThunk(
  'CatalogStore/fetchTransportFiltersList',
  async ({ subcategorySlug, transportId }: TransportProductListRead) => {
    const data = await getTransportFilterList({
      subcategorySlug,
      transportId,
    });

    return data;
  },
);

const fetchTransportReadCategories = createAsyncThunk(
  'CatalogStore/fetchTransportReadCategories',
  async ({ transportId }: TransportSearchRequestData) => {
    const data = await getTransportCategoriesRead({
      transportId,
    });

    return data;
  },
);

const fetchTransportProductList = createAsyncThunk(
  'CatalogStore/fetchSearchProductList',
  async ({
    transportId,
    subcategorySlug,
    page,
    sort,
    order,
    filter,
  }: TransportProductListRead) => {
    const data = await getTransportProductListRead({
      transportId,
      subcategorySlug,
      page,
      sort,
      order,
      filter,
    });

    return data;
  },
);

const fetchCategoriesList = createAsyncThunk(
  'CatalogStore/fetchCategoriesList',
  async () => {
    const data = await getCategoriesList();

    return data;
  },
);

const fetchCategoriesTreeList = createAsyncThunk(
  'CatalogStore/fetchCategoriesTreeList',
  async () => {
    const data = await getCategoriesTreeList();

    return data;
  },
);

const fetchCategoriesFiltersList = createAsyncThunk(
  'CatalogStore/fetchCategoriesFiltersList',
  async ({ subcategorySlug }: CategoriesFiltersListRequestData) => {
    const data = await getCategoriesFiltersList({ subcategorySlug });

    return data;
  },
);

const fetchCategoriesProductsList = createAsyncThunk(
  'CatalogStore/fetchCategoriesProductsList',
  async ({
    subcategorySlug,
    page,
    sort,
    order,
    filter,
  }: CategoriesProductsListRequestData) => {
    const data = await getCategoriesProductsList({
      subcategorySlug,
      page,
      sort,
      order,
      filter,
    });

    return data;
  },
);

const fetchCategoriesProductsRead = createAsyncThunk(
  'CatalogStore/fetchCategoriesProductsRead',
  async ({ categorySlug, productSlug }: CategoriesProductsReadRequestData) => {
    const data = await getCategoriesProductsRead({ categorySlug, productSlug });

    return data;
  },
);

const fetchCategoriesSubcategoriesList = createAsyncThunk(
  'CatalogStore/fetchCategoriesSubcategoriesList',
  async ({ categorySlug }: CategoriesSubcategoriesListRequestData) => {
    const data = await getCategoriesSubcategoriesList({
      categorySlug,
    });

    return data;
  },
);

const fetchCatalogSearchRead = createAsyncThunk(
  'CatalogStore/fetchCatalogSearchRead',
  async ({ searchValue }: CatalogSearchReadRequestData) => {
    const data = await getCatalogSearchRead({
      searchValue,
    });

    return data;
  },
);

export {
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
  fetchTransportProductList,
  fetchTransportFilterList,
};
