import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getTransportProductListRead,
  getCategoriesList,
  getCategoriesTreeList,
  getCategoriesFiltersList,
  getCategoriesProductsList,
  getCategoriesProductsRead,
  getCategoriesSubcategoriesList,
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
} from 'api/models/catalog';

const fetchTransportFilterList = createAsyncThunk(
  'CatalogStore/fetchTransportFiltersList',
  async ({
    categorySlug,
    brandSlug,
    modelSlug,
    yearSlug,
    engineSlug,
  }: TransportProductListRead) => {
    const data = await getTransportFilterList({
      categorySlug,
      brandSlug,
      modelSlug,
      yearSlug,
      engineSlug,
    });

    return data;
  },
);

const fetchTransportReadCategories = createAsyncThunk(
  'CatalogStore/fetchTransportReadCategories',
  async ({
    brandSlug,
    modelSlug,
    yearSlug,
    engineSlug,
  }: TransportSearchRequestData) => {
    const data = await getTransportCategoriesRead({
      brandSlug,
      modelSlug,
      yearSlug,
      engineSlug,
    });

    return data;
  },
);

const fetchTransportProductList = createAsyncThunk(
  'CatalogStore/fetchSearchProductList',
  async ({
    brandSlug,
    modelSlug,
    yearSlug,
    engineSlug,
    categorySlug,
    page,
    sort,
    order,
    filter,
  }: TransportProductListRead) => {
    const data = await getTransportProductListRead({
      brandSlug,
      modelSlug,
      yearSlug,
      engineSlug,
      categorySlug,
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
  async ({ categorySlug }: CategoriesFiltersListRequestData) => {
    const data = await getCategoriesFiltersList({ categorySlug });

    return data;
  },
);

const fetchCategoriesProductsList = createAsyncThunk(
  'CatalogStore/fetchCategoriesProductsList',
  async ({
    categorySlug,
    page,
    sort,
    order,
    filter,
  }: CategoriesProductsListRequestData) => {
    const data = await getCategoriesProductsList({
      categorySlug,
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

export {
  fetchTransportReadCategories,
  fetchCategoriesList,
  fetchCategoriesTreeList,
  fetchCategoriesFiltersList,
  fetchCategoriesProductsList,
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
  fetchTransportProductList,
  fetchTransportFilterList,
};
