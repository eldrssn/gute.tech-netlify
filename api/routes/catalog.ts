import { sendRequest } from '../utils';

import {
  CategoryResponseData,
  TreeCategoryResponseData,
  CategoriesFiltersListRequestData,
  CategoriesProductsListRequestData,
  CategoriesProductsReadRequestData,
  CategoriesSubcategoriesListRequestData,
  CategoriesProductListResponseData,
  CategoriesProductReadResponseData,
  FiltersCategoryResponseData,
  TransportProductListRead,
  TransportSearchRequestData,
  CatalogSearchReadRequestData,
  CatalogSearchReadResponseData,
} from 'api/models/catalog';

const getCategoriesList = () =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/categories/`,
    method: 'get',
  });

const getTransportCategoriesRead = ({
  transportId,
}: TransportSearchRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/categories/tree/${transportId}/`,
    method: 'get',
  });

const getTransportFilterList = ({
  subcategorySlug,
  transportId,
}: TransportProductListRead) =>
  sendRequest<CategoryResponseData[]>({
    url: `/catalog/${subcategorySlug}/filters/${transportId}/`,
    method: 'get',
  });

const getTransportProductListRead = ({
  transportId,
  subcategorySlug,
  page,
  sort = 'popular',
  order = 'asc',
  filter = {},
}: TransportProductListRead) =>
  sendRequest<CategoriesProductListResponseData>({
    url: `/catalog/${subcategorySlug}/products/${transportId}/?page=${page}&size=12&sort=${sort}&order=${order}`,
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
  subcategorySlug,
}: CategoriesFiltersListRequestData) =>
  sendRequest<FiltersCategoryResponseData[]>({
    url: `/catalog/${subcategorySlug}/filters/`,
    method: 'get',
  });

const getCategoriesProductsList = ({
  subcategorySlug,
  page,
  sort,
  order,
  filter,
}: CategoriesProductsListRequestData) =>
  sendRequest<CategoriesProductListResponseData>({
    url: `/catalog/${subcategorySlug}/products/?page=${page}&size=12&sort=${sort}&order=${order}`,
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

const getCatalogSearchRead = ({ searchValue }: CatalogSearchReadRequestData) =>
  sendRequest<CatalogSearchReadResponseData>({
    url: '/catalog/search/',
    method: 'get',
    config: {
      params: {
        query: searchValue,
      },
    },
  });

export {
  getCategoriesList,
  getCatalogSearchRead,
  getTransportCategoriesRead,
  getCategoriesTreeList,
  getCategoriesFiltersList,
  getCategoriesProductsList,
  getCategoriesProductsRead,
  getCategoriesSubcategoriesList,
  getTransportProductListRead,
  getTransportFilterList,
};
