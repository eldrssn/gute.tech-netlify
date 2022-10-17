import { FiltersRequest, Slug } from 'types';
import { ProductWarehouse } from './cart';

type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
  categories: string[][];
  manufacturer?: string;
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

type RecommendedResponceData = ProductListData[];

interface Property {
  title: string;
  value: string;
}

type CategoriesProductReadResponseData = {
  title: string;
  slug: string;
  manufacturer?: string;
  vendor_code: string;
  description?: string;
  price?: string;
  images?: string[];
  properties?: Property[];
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

type RecommendedProductsListRequestData = TransportSearchRequestData & {
  productSlug: Slug;
  categorySlug: Slug;
};

type InfoBlock = {
  title: string;
  slug: string;
};

type ProductTransportListResponseData = {
  id: number;
  title: string;
  count: number;
  slug: string;
  years_string?: string;
  brand: InfoBlock;
  engine: InfoBlock;
  model: InfoBlock;
  years: number[];
};

type ProductBrandsListRequestData = {
  productSlug: string;
};

type ProductModelsListRequestData = {
  productSlug: string;
  brandSlug: string;
};

type ProductYearsListRequestData = {
  productSlug: string;
  brandSlug: string;
  modelSlug: string;
};

type ProductTransportListRequestData = {
  productSlug: string;
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
};

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
  RecommendedResponceData,
  ProductTransportListResponseData,
  ProductBrandsListRequestData,
  ProductModelsListRequestData,
  ProductYearsListRequestData,
  ProductTransportListRequestData,
};
