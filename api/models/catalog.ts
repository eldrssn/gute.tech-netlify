import { FilterRequest } from 'types';
import { ProductWarehouse } from './cart';

export type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
};

export type CategoriesProductsListRequestData = {
  categorySlug: string;
  page?: number;
  sort?: string;
  order?: string;
  filter?: FilterRequest;
};

export type CategoriesSearchReadRequestData = {
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
  engineSlug: string;
};

export type TransportFiltersProductsListRead =
  CategoriesProductsListRequestData & CategoriesSearchReadRequestData;

export type CategoriesFiltersListRequestData = {
  categorySlug: string;
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

export type CategoryResponseData = {
  title: string;
  slug: string;
  image: string;
  found: number;
};

export type TreeCategoryResponseData = {
  title: string;
  slug: string;
  image?: string;
  found: number;
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

export type CategoriesProductsListResponseData = {
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
  warehouses?: ProductWarehouse[];
};
