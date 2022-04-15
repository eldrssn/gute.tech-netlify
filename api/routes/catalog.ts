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
  CategoriesProductsReadResponseData,
  FiltersCategoryResponseData,
} from 'api/models/catalog';

const getCategoriesList = () =>
  sendRequest<CategoryResponseData[]>({
    path: `/catalog/categories/`,
    method: 'get',
  });

const getCategoriesSearchRead = ({
  brandSlug,
  modelSlug,
  yearSlug,
  engineSlug,
}: CategoriesSearchReadRequestData) =>
  sendRequest<CategoryResponseData[]>({
    path: `/catalog/categories/search/${brandSlug}/${modelSlug}/${yearSlug}/${engineSlug}/`,
    method: 'get',
  });

const getCategoriesTreeList = () =>
  sendRequest<TreeCategoryResponseData[]>({
    path: `/сatalog/categories/tree/`,
    method: 'get',
  });

const getCategoriesFiltersList = ({
  categorySlug,
}: CategoriesFiltersListRequestData) =>
  sendRequest<FiltersCategoryResponseData[]>({
    path: `/catalog/categories/${categorySlug}/filters/`,
    method: 'get',
  });

const getCategoriesProductsList = ({
  categorySlug,
}: CategoriesProductsListRequestData) =>
  sendRequest<CategoriesProductsListResponseData>({
    path: `/catalog/categories/${categorySlug}/products/`,
    method: 'get',
  });

const getCategoriesProductsRead = ({
  categorySlug,
  productSlug,
}: CategoriesProductsReadRequestData) =>
  sendRequest<CategoriesProductsReadResponseData>({
    path: `/catalog/categories/${categorySlug}/products/${productSlug}/`,
    method: 'get',
  });

const getCategoriesSubcategoriesList = ({
  categorySlug,
}: CategoriesSubcategoriesListRequestData) =>
  sendRequest<CategoryResponseData[]>({
    path: `/catalog/categories/${categorySlug}/subcategories/`,
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
};
