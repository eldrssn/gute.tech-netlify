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
    url: `/catalog/categories/search/${brandSlug}/${modelSlug}/${yearSlug}/${engineSlug}/`,
    method: 'get',
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
    url: `/catalog/categories/${categorySlug}/filters/`,
    method: 'get',
  });

const getCategoriesProductsList = ({
  categorySlug,
  page,
}: CategoriesProductsListRequestData) =>
  sendRequest<CategoriesProductsListResponseData>({
    url: `/catalog/categories/${categorySlug}/products/?page=${page}&size=12`,
    method: 'get',
  });

const getCategoriesProductsRead = ({
  categorySlug,
  productSlug,
}: CategoriesProductsReadRequestData) =>
  sendRequest<CategoriesProductReadResponseData>({
    url: `/catalog/categories/${categorySlug}/products/${productSlug}/`,
    method: 'get',
  });

const getCategoriesSubcategoriesList = ({
  categorySlug,
}: CategoriesSubcategoriesListRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/categories/${categorySlug}/subcategories/`,
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
