import { StoreState, StoreError, ErrorAction } from 'store/types';

import {
  CategoryResponseData,
  TreeCategoryResponseData,
  CategoriesProductsListResponseData,
  FiltersCategoryResponseData,
} from 'api/models/catalog';
import { ProductWarehouse } from 'api/models/cart';

enum CategoryStoreBlocks {
  SEARCHREADCATEGORY = 'searchReadCategory',
  CATEGORIESLIST = 'categoriesList',
  CATEGORIESTREELIST = 'categoriesTreeList',
  CATEGORIESFILTERSLIST = 'categoriesFilterList',
  CATEGORIESPRODUCTLIST = 'categoriesProductList',
  CATEGORIESPRODUCTREAD = 'categoriesProductRead',
  CATEGORIESSUBCATEGORIESLIST = 'categoriesSubcategoriesList',
}

type CategoryStoreRootCategory =
  | CategoryStoreBlocks.CATEGORIESTREELIST
  | CategoryStoreBlocks.SEARCHREADCATEGORY;

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
  [CategoryStoreBlocks.SEARCHREADCATEGORY]: SearchReadCategoryState;
  [CategoryStoreBlocks.CATEGORIESLIST]: CategoriesListState;
  [CategoryStoreBlocks.CATEGORIESPRODUCTLIST]: CategoriesProductListState;
  [CategoryStoreBlocks.CATEGORIESPRODUCTREAD]: CategoriesProductReadState;
  [CategoryStoreBlocks.CATEGORIESSUBCATEGORIESLIST]: CategoriesSubcategoriesListState;
  [CategoryStoreBlocks.CATEGORIESTREELIST]: CategoriesTreeListState;
  [CategoryStoreBlocks.CATEGORIESFILTERSLIST]: CategoriesFilterListState;
};

export type {
  ErrorAction,
  StoreError,
  CatalogStore,
  CategoryStoreRootCategory,
};
export { CategoryStoreBlocks };
