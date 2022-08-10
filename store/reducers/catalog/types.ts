import { StoreState, StoreError, ErrorAction } from 'store/types';

import {
  CategoryResponseData,
  TreeCategoryResponseData,
  CategoriesProductListResponseData,
  FiltersCategoryResponseData,
  CatalogSearchReadResponseData,
  RecommendedProductsListResponseData,
} from 'api/models/catalog';
import { ProductWarehouse } from 'api/models/cart';

enum CategoryStoreBlocks {
  TRANSPORT_READ_CATEGORY = 'transportReadCategories',
  TRANSPORT_PRODUCT_LIST = 'transportProductList',
  TRANSPORT_FILTER_LIST = 'transportFilterList',
  CATEGORIES_LIST = 'categoriesList',
  CATEGORIES_TREE_LIST = 'categoriesTreeList',
  CATEGORIES_FILTERS_LIST = 'categoriesFilterList',
  CATEGORIES_PRODUCT_LIST = 'categoriesProductList',
  CATEGORIES_PRODUCT_READ = 'categoriesProductRead',
  CATEGORIES_SUBCATEGORIES_LIST = 'categoriesSubcategoriesList',
  CATEGORIES_SUBCATEGORIES_READ = 'categoriesSubcategoriesRead',
  CATALOG_SEARCH_READ = 'catalogSearchRead',
  CLEAR_CATALOG = 'clearCatalog',
  RECOMMENDED_PRODUCTS_LIST = 'recommendedProductsList',
}

type CategoriesProductsReadData = {
  title: string;
  slug: string;
  manufacturer?: string | undefined;
  vendor_code: string;
  description?: string | undefined;
  price?: string | undefined;
  images?: string[] | undefined;
  properties?: string | undefined;
  warehouses?: ProductWarehouse[];
  faq: Record<string, string>[];
  installation: string;
};

type CategoriesListState = {
  data: CategoryResponseData[];
} & StoreState;

type CategoriesTreeListState = {
  data: TreeCategoryResponseData[];
} & StoreState;

type CategoriesFilterListState = {
  data: FiltersCategoryResponseData[];
} & StoreState;

type CatalogSearchReadState = {
  data: CatalogSearchReadResponseData | null;
} & StoreState;

type CategoriesProductListState = {
  data: CategoriesProductListResponseData | null;
} & StoreState;

type CategoriesProductReadState = {
  data: CategoriesProductsReadData | null;
} & StoreState;

type CategoriesSubcategoriesListState = {
  data: CategoryResponseData[];
} & StoreState;

type CategoriesSubcategoriesReadState = {
  data: CategoryResponseData[];
} & StoreState;

type RecommenedProductsListState = {
  data: RecommendedProductsListResponseData | null;
} & StoreState;

type CatalogStore = {
  [CategoryStoreBlocks.TRANSPORT_READ_CATEGORY]: CategoriesTreeListState;
  [CategoryStoreBlocks.TRANSPORT_PRODUCT_LIST]: CategoriesProductListState;
  [CategoryStoreBlocks.TRANSPORT_FILTER_LIST]: CategoriesFilterListState;
  [CategoryStoreBlocks.CATEGORIES_LIST]: CategoriesListState;
  [CategoryStoreBlocks.CATEGORIES_PRODUCT_LIST]: CategoriesProductListState;
  [CategoryStoreBlocks.CATEGORIES_PRODUCT_READ]: CategoriesProductReadState;
  [CategoryStoreBlocks.CATEGORIES_SUBCATEGORIES_LIST]: CategoriesSubcategoriesListState;
  [CategoryStoreBlocks.CATEGORIES_SUBCATEGORIES_READ]: CategoriesSubcategoriesReadState;
  [CategoryStoreBlocks.CATEGORIES_TREE_LIST]: CategoriesTreeListState;
  [CategoryStoreBlocks.CATEGORIES_FILTERS_LIST]: CategoriesFilterListState;
  [CategoryStoreBlocks.CATALOG_SEARCH_READ]: CatalogSearchReadState;
  [CategoryStoreBlocks.RECOMMENDED_PRODUCTS_LIST]: RecommenedProductsListState;
};

export type { ErrorAction, StoreError, CatalogStore };
export { CategoryStoreBlocks };
