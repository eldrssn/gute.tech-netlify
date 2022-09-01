import { FilterRequest, Slug } from 'types';
import { ProductWarehouse } from './cart';

type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
};

type CategoriesProductsListRequestData = {
  categorySlug: string;
  page?: number;
  sort?: string;
  order?: string;
  filter?: FilterRequest;
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
  filter?: FilterRequest;
};

type CategoriesProductsReadRequestData = {
  productSlug: string;
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

type CategoriesProductReadResponseData = {
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

type CatalogSearchReadRequestData = {
  searchValue: string;
};

type CatalogSearchReadProductData = {
  title: string;
  slug: string;
  image: string;
  price: number;
  is_service: boolean;
  categories: string[];
};

type CatalogSearchReadCategoryData = {
  title: string;
  slug: string;
  image: string;
};

type CatalogSearchReadResponseData = {
  categories: CatalogSearchReadCategoryData[];
  products: CatalogSearchReadProductData[];
};

type RecommendedProductsListRequestData = TransportSearchRequestData & {
  productSlug: Slug;
  categorySlug: Slug;
};

type RecommendedProductsListResponseData = CategoriesProductListResponseData;

export { FilterTypes };
export type {
  CatalogSearchReadResponseData,
  CatalogSearchReadCategoryData,
  CatalogSearchReadProductData,
  CatalogSearchReadRequestData,
  CategoriesProductReadResponseData,
  CategoriesProductListResponseData,
  FiltersCategoryResponseData,
  CheckboxValue,
  TreeCategoryResponseData,
  CategoryResponseData,
  CategoriesSubcategoriesReadRequestData,
  CategoriesSubcategoriesListRequestData,
  CategoriesProductsReadRequestData,
  CategoriesFiltersListRequestData,
  TransportProductListRead,
  TransportSearchRequestData,
  CategoriesProductsListRequestData,
  ProductListData,
  RecommendedProductsListRequestData,
  RecommendedProductsListResponseData,
};
