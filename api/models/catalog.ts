import { FilterRequest } from 'types';
import { ProductWarehouse } from './cart';

export type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
};

export type CategoriesProductsListRequestData = {
  subcategorySlug: string;
  page?: number;
  sort?: string;
  order?: string;
  filter?: FilterRequest;
};

export type TransportSearchRequestData = {
  transportId: string;
};

export type TransportProductListRead = CategoriesProductsListRequestData &
  TransportSearchRequestData;

export type CategoriesFiltersListRequestData = {
  subcategorySlug: string;
  page?: number;
  sort?: string;
  order?: string;
  filter?: FilterRequest;
};

export type CategoriesProductsReadRequestData = {
  categorySlug: string;
  productSlug: string;
};

export type CategoriesSubcategoriesListRequestData = {
  categorySlug: string;
};

export type CategoriesSubcategoriesReadRequestData = {
  categorySlug: string;
  transportId: string;
};

export type CategoryResponseData = {
  title: string;
  slug: string;
  image: string;
  total: number;
  found: number;
};

export type TreeCategoryResponseData = {
  title: string;
  slug: string;
  image?: string;
  found: number;
  total: number;
  children?: TreeCategoryResponseData[];
};

export type CheckboxValue = {
  title: string;
  value: string;
};

export enum FilterTypes {
  CHECKBOX = 'CHECKBOX',
  RANGE = 'RANGE',
  RADIO = 'RADIO',
}

export type FiltersCategoryResponseData = {
  title: string;
  slug: string;
  type: FilterTypes;
  max?: null | string;
  min?: null | string;
  values?: CheckboxValue[];
};

export type CategoriesProductListResponseData = {
  current: string;
  total: string;
  pages: string;
  results: ProductListData[];
};

export type CategoriesProductReadResponseData = {
  title: string;
  slug: string;
  manufacturer?: string;
  vendor_code: string;
  description?: string;
  price?: string;
  images?: string[];
  properties?: string;
  is_service: boolean;
  warehouses?: ProductWarehouse[];
  faq: Record<string, string>[];
  installation: string;
};

export type CatalogSearchReadRequestData = {
  searchValue: string;
};

export type CatalogSearchReadProductData = {
  title: string;
  slug: string;
  image: string;
  price: number;
  is_service: boolean;
  categories: string[];
};

export type CatalogSearchReadCategoryData = {
  title: string;
  slug: string;
  image: string;
};

export type CatalogSearchReadResponseData = {
  categories: CatalogSearchReadCategoryData[];
  products: CatalogSearchReadProductData[];
};
