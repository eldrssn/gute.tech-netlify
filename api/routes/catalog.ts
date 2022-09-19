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
  CategoriesSubcategoriesReadRequestData,
  RecommendedProductsListRequestData,
  RecommendedProductsListResponseData,
} from 'api/models/catalog';
import { ApiMethods } from 'constants/types';
import { makeStringify } from 'utility/helpers';

const getCategoriesList = () =>
  sendRequest<CategoryResponseData[]>({
    url: `/v1/catalog/categories/`,
    method: ApiMethods.GET,
  });

const getTransportCategoriesRead = ({
  transportId,
}: TransportSearchRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/v1/catalog/categories/tree/${transportId}/`,
    method: ApiMethods.GET,
  });

const getTransportFilterList = ({
  categorySlug,
  transportId,
}: TransportProductListRead) =>
  sendRequest<CategoryResponseData[]>({
    url: `/v1/catalog/${categorySlug}/filters/${transportId}/`,
    method: ApiMethods.GET,
  });

const getTransportProductListRead = ({
  transportId,
  categorySlug,
  page,
  sort = 'popular',
  order = 'asc',
  filter = {},
}: TransportProductListRead) =>
  sendRequest<CategoriesProductListResponseData>({
    url: `/v1/catalog/${categorySlug}/products/${transportId}/?page=${page}&size=12&sort=${sort}&order=${order}`,
    method: ApiMethods.POST,
    config: {
      data: { page, sort, order, filter },
    },
  });

const getCategoriesTreeList = () =>
  sendRequest<TreeCategoryResponseData[]>({
    url: `/v1/catalog/categories/tree/`,
    method: ApiMethods.GET,
  });

const getCategoriesFiltersList = ({
  categorySlug,
}: CategoriesFiltersListRequestData) =>
  sendRequest<FiltersCategoryResponseData[]>({
    url: `/v1/catalog/${categorySlug}/filters/`,
    method: ApiMethods.GET,
  });

const getCategoriesProductsList = ({
  categorySlug,
  page,
  sort,
  order,
  filter,
}: CategoriesProductsListRequestData) =>
  sendRequest<CategoriesProductListResponseData>({
    url: `/v1/catalog/${categorySlug}/products/?page=${page}&size=12&sort=${sort}&order=${order}`,
    method: ApiMethods.POST,
    config: {
      data: { page, sort, order, filter },
    },
  });

const getCategoriesProductsRead = ({
  productSlug,
}: CategoriesProductsReadRequestData) =>
  sendRequest<CategoriesProductReadResponseData>({
    url: `/v1/catalog/products/${productSlug}/`,
    method: ApiMethods.GET,
  });

const getCategoriesSubcategoriesList = ({
  categorySlug,
}: CategoriesSubcategoriesListRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/v1/catalog/${categorySlug}/categories/`,
    method: ApiMethods.GET,
  });

const getCategoriesSubcategoriesRead = ({
  categorySlug,
  transportId,
}: CategoriesSubcategoriesReadRequestData) =>
  sendRequest<CategoryResponseData[]>({
    url: `/v1/catalog/${categorySlug}/categories/${transportId}/`,
    method: ApiMethods.GET,
  });

const getCatalogSearchRead = ({ searchValue }: CatalogSearchReadRequestData) =>
  sendRequest<CatalogSearchReadResponseData>({
    url: '/v1/catalog/search/',
    method: ApiMethods.GET,
    config: {
      params: {
        query: searchValue,
      },
    },
  });

const getRecommendedProductsList = ({
  productSlug,
  categorySlug,
  transportId,
}: RecommendedProductsListRequestData) => {
  const category = makeStringify(categorySlug);
  const product = makeStringify(productSlug);
  const transport = transportId ? transportId : undefined;

  return sendRequest<RecommendedProductsListResponseData>({
    url: `/v1/catalog/recommendations/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        category,
        transport,
      },
    },
  });
};

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
  getCategoriesSubcategoriesRead,
  getRecommendedProductsList,
};
