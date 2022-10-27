import { FiltersRequest } from 'types';

type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
  categories: string[][];
  manufacturer?: string;
  is_linked_transport?: boolean;
};

type CategoriesProductsListRequestData = {
  categorySlug: string;
  page?: number;
  sort?: string;
  order?: string;
  filter?: FiltersRequest;
};

type TransportSearchRequestData = {
  transportId: string;
};

type TransportProductListRead = CategoriesProductsListRequestData &
  TransportSearchRequestData;

type CategoriesFiltersListRequestData = {
  categorySlug: string;
  page?: number;
  sort?: string;
  order?: string;
  filter?: FiltersRequest;
};

type CategoriesSubcategoriesListRequestData = {
  categorySlug: string;
};

type CategoriesSubcategoriesReadRequestData = {
  categorySlug: string;
  transportId: string;
};

type CategoryResponseData = {
  title: string;
  slug: string;
  image: string;
  total: number;
  found: number;
  category_found: number;
  category_total: number;
};

type TreeCategoryResponseData = {
  title: string;
  slug: string;
  image?: string;
  found: number;
  total: number;
  children?: TreeCategoryResponseData[];
  category_total: number;
  category_found: number;
};

type CheckboxValue = {
  title: string;
  value: string;
};

enum FilterTypes {
  CHECKBOX = 'CHECKBOX',
  RANGE = 'RANGE',
  RADIO = 'RADIO',
}

type FiltersCategoryResponseData = {
  title: string;
  slug: string;
  type: FilterTypes;
  max?: null | string;
  min?: null | string;
  values?: CheckboxValue[];
};

type CategoriesProductListResponseData = {
  current: string;
  total: string;
  pages: string;
  results: ProductListData[];
};

type AnalogueItem = {
  title: string;
  slug: string;
  categories: string[];
  manufacturer: string;
  price: string;
  is_original: boolean;
};

type CatalogSearchReadRequestData = {
  searchValue: string;
};

type CatalogSearchReadProductData = {
  title: string;
  slug: string;
  image: string;
  price: number;
  is_service: boolean;
  categories: string[][];
};

type CatalogSearchReadCategoryData = {
  title: string;
  slug: string;
  image: string;
  categories: string[];
};

type CatalogSearchReadResponseData = {
  categories: CatalogSearchReadCategoryData[];
  products: CatalogSearchReadProductData[];
};

export { FilterTypes };
export type {
  CatalogSearchReadResponseData,
  CatalogSearchReadCategoryData,
  CatalogSearchReadProductData,
  CatalogSearchReadRequestData,
  CategoriesProductListResponseData,
  FiltersCategoryResponseData,
  CheckboxValue,
  TreeCategoryResponseData,
  CategoryResponseData,
  CategoriesSubcategoriesReadRequestData,
  CategoriesSubcategoriesListRequestData,
  CategoriesFiltersListRequestData,
  TransportProductListRead,
  TransportSearchRequestData,
  CategoriesProductsListRequestData,
  ProductListData,
  AnalogueItem,
};
