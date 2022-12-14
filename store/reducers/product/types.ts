import { StoreState, StoreError, ErrorAction } from 'store/types';

import {
  RecommendedResponceData,
  ProductTransportListResponseData,
  ProductAnaloguesResponseData,
} from 'api/models/product';
import { ProductWarehouse } from 'api/models/cart';

enum ProductStoreBlocks {
  PRODUCT_READ = 'productRead',
  PRODUCTS_LIST_RECOMENDED = 'productsListRecommended',
  PRODUCT_BRANDS_LIST = 'productBrandsList',
  PRODUCT_MODELS_LIST = 'productModelsList',
  PRODUCT_YEARS_LIST = 'productYearsList',
  PRODUCT_TRANSPORT_LIST = 'productTransportList',
  PRODUCT_ANALOGUES_LIST = 'productAnaloguesList',
}

interface Property {
  title: string;
  value: string;
}

type ProductsReadData = {
  title: string;
  slug: string;
  manufacturer?: string | undefined;
  vendor_code: string;
  description?: string | undefined;
  price?: string | undefined;
  images?: string[] | undefined;
  properties?: Property[] | undefined;
  warehouses?: ProductWarehouse[];
  faq: Record<string, string>[];
  installation: string;
};

type ProductReadState = {
  data: ProductsReadData | null;
} & StoreState;

type RecommenedProductsListState = {
  data: RecommendedResponceData | null;
} & StoreState;

type ProductBrandsListState = {
  data: ProductTransportListResponseData[] | null;
} & StoreState;
type ProductModelsListState = {
  data: ProductTransportListResponseData[] | null;
} & StoreState;
type ProductYearsListState = {
  data: ProductTransportListResponseData[] | null;
} & StoreState;
type ProductTransportsListState = {
  data: ProductTransportListResponseData[] | null;
} & StoreState;
type ProductAnaloguesListState = {
  data: ProductAnaloguesResponseData | null;
} & StoreState;

type ProductStore = {
  [ProductStoreBlocks.PRODUCT_READ]: ProductReadState;
  [ProductStoreBlocks.PRODUCTS_LIST_RECOMENDED]: RecommenedProductsListState;
  [ProductStoreBlocks.PRODUCT_BRANDS_LIST]: ProductBrandsListState;
  [ProductStoreBlocks.PRODUCT_MODELS_LIST]: ProductModelsListState;
  [ProductStoreBlocks.PRODUCT_YEARS_LIST]: ProductYearsListState;
  [ProductStoreBlocks.PRODUCT_TRANSPORT_LIST]: ProductTransportsListState;
  [ProductStoreBlocks.PRODUCT_ANALOGUES_LIST]: ProductAnaloguesListState;
};

export type { ErrorAction, StoreError, ProductStore };
export { ProductStoreBlocks };
