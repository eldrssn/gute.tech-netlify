import { StoreState, StoreError, ErrorAction } from 'store/types';

import {
  CategoryResponseData,
  TreeCategoryResponseData,
  CategoriesProductsListResponseData,
  FiltersCategoryResponseData,
} from 'api/models/catalog';
import { ProductWarehouse } from 'api/models/cart';

enum CategoryStoreBlocks {
  SEARCH_READ_CATEGORY = 'searchReadCategory',
  CATEGORIES_LIST = 'categoriesList',
  CATEGORIES_TREE_LIST = 'categoriesTreeList',
  CATEGORIES_FILTERS_LIST = 'categoriesFilterList',
  CATEGORIES_PRODUCT_LIST = 'categoriesProductList',
  CATEGORIES_PRODUCT_READ = 'categoriesProductRead',
  CATEGORIES_SUBCATEGORIES_LIST = 'categoriesSubcategoriesList',
}

type CategoryStoreRootCategory =
  | CategoryStoreBlocks.CATEGORIES_TREE_LIST
  | CategoryStoreBlocks.SEARCH_READ_CATEGORY;

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
};

type SearchReadCategoryState = {
  data: CategoryResponseData[];
} & StoreState;

type CategoriesListState = {
  data: CategoryResponseData[];
} & StoreState;

type CategoriesTreeListState = {
  data: TreeCategoryResponseData[];
} & StoreState;

type CategoriesFilterListState = {
  data: FiltersCategoryResponseData[];
} & StoreState;

type CategoriesProductListState = {
  data: CategoriesProductsListResponseData;
} & StoreState;

type CategoriesProductReadState = {
  data: CategoriesProductsReadData | null;
} & StoreState;

type CategoriesSubcategoriesListState = {
  data: CategoryResponseData[];
} & StoreState;

type CatalogStore = {
  [CategoryStoreBlocks.SEARCH_READ_CATEGORY]: SearchReadCategoryState;
  [CategoryStoreBlocks.CATEGORIES_LIST]: CategoriesListState;
  [CategoryStoreBlocks.CATEGORIES_PRODUCT_LIST]: CategoriesProductListState;
  [CategoryStoreBlocks.CATEGORIES_PRODUCT_READ]: CategoriesProductReadState;
  [CategoryStoreBlocks.CATEGORIES_SUBCATEGORIES_LIST]: CategoriesSubcategoriesListState;
  [CategoryStoreBlocks.CATEGORIES_TREE_LIST]: CategoriesTreeListState;
  [CategoryStoreBlocks.CATEGORIES_FILTERS_LIST]: CategoriesFilterListState;
};

export type {
  ErrorAction,
  StoreError,
  CatalogStore,
  CategoryStoreRootCategory,
};
export { CategoryStoreBlocks };
