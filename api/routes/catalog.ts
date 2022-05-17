import { sendRequest } from '../utils';

import {
  CategoryResponseData,
  TreeCategoryResponseData,
  CategoriesFiltersListRequestData,
  CategoriesProductsListRequestData,
  CategoriesProductsReadRequestData,
  CategoriesSubcategoriesListRequestData,
  CategoriesSearchReadRequestData,
  CategoriesProductsListResponseData,
  CategoriesProductReadResponseData,
  FiltersCategoryResponseData,
  TransportFiltersProductsListRead,
} from 'api/models/catalog';

const getCategoriesList = () =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/categories/`,
    method: 'get',
  });

const getCategoriesSearchRead = ({
  brandSlug,
  modelSlug,
  yearSlug,
  engineSlug,
}: CategoriesSearchReadRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/categories/tree/${brandSlug}/${modelSlug}/${yearSlug}/${engineSlug}/`,
    method: 'get',
  });

const getTransportFiltersProductsListRead = ({
  brandSlug,
  modelSlug,
  yearSlug,
  engineSlug,
  categorySlug,
  page,
  sort = 'title',
  order = 'asc',
  filter = {},
}: TransportFiltersProductsListRead) =>
  sendRequest<CategoriesProductsListResponseData>({
    url: `/catalog/${categorySlug}/products/${brandSlug}/${modelSlug}/${yearSlug}/${engineSlug}/`,
    method: 'post',
    config: {
      data: { page, sort, order, filter },
    },
  });

const getCategoriesTreeList = () =>
  sendRequest<TreeCategoryResponseData[]>({
    url: `/catalog/categories/tree/`,
    method: 'get',
  });

const getCategoriesFiltersList = ({
  categorySlug,
}: CategoriesFiltersListRequestData) =>
  sendRequest<FiltersCategoryResponseData[]>({
    url: `/catalog/${categorySlug}/filters/`,
    method: 'get',
  });

const getCategoriesProductsList = ({
  categorySlug,
  page,
  sort = 'title',
  order = 'asc',
  filter = {},
}: CategoriesProductsListRequestData) =>
  sendRequest<CategoriesProductsListResponseData>({
    url: `/catalog/${categorySlug}/products/?page=${page}&size=12&sort=${sort}&order=${order}`,
    method: 'post',
    config: {
      data: { page, sort, order, filter },
    },
  });

const getCategoriesProductsRead = ({
  productSlug,
}: CategoriesProductsReadRequestData) =>
  sendRequest<CategoriesProductReadResponseData>({
    url: `/catalog/products/${productSlug}/`,
    method: 'get',
  });

const getCategoriesSubcategoriesList = ({
  categorySlug,
}: CategoriesSubcategoriesListRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/${categorySlug}/categories/`,
    method: 'get',
  });

export {
  getCategoriesList,
  getCategoriesSearchRead,
  getCategoriesTreeList,
  getCategoriesFiltersList,
  getCategoriesProductsList,
  getCategoriesProductsRead,
  getCategoriesSubcategoriesList,
  getTransportFiltersProductsListRead,
};
