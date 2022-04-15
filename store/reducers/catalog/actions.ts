import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCategoriesSearchRead,
  getCategoriesList,
  getCategoriesTreeList,
  getCategoriesFiltersList,
  getCategoriesProductsList,
  getCategoriesProductsRead,
  getCategoriesSubcategoriesList,
} from 'api/routes/catalog';

import {
  CategoriesSearchReadRequestData,
  CategoriesFiltersListRequestData,
  CategoriesProductsListRequestData,
  CategoriesProductsReadRequestData,
  CategoriesSubcategoriesListRequestData,
} from 'api/models/catalog';

const fetchSearchReadCategory = createAsyncThunk(
  'CatalogStore/fetchSearchReadCategory',
  async ({
    brandSlug,
    modelSlug,
    yearSlug,
    engineSlug,
  }: CategoriesSearchReadRequestData) => {
    const data = await getCategoriesSearchRead({
      brandSlug,
      modelSlug,
      yearSlug,
      engineSlug,
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
  async ({ categorySlug }: CategoriesProductsListRequestData) => {
    const data = await getCategoriesProductsList({ categorySlug });

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
  fetchSearchReadCategory,
  fetchCategoriesList,
  fetchCategoriesTreeList,
  fetchCategoriesFiltersList,
  fetchCategoriesProductsList,
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
};
