import { ErrorAction, StoreState, StoreError } from 'store/types';

import {
  ProductResponseData,
  ProductsRequestData,
  ProductRequestData,
} from 'api/models/cart';

enum CartStoreBlocks {
  CART_ITEMS = 'cartItems',
}

type cartTotal = number;

type orderTotal = number;

type CartItemSlug = string;

type CartItemQuantity = {
  count: number;
  slug: string;
};

type fetchItemsPayloadData = {
  requestData: ProductsRequestData;
  data: ProductResponseData[];
};

type fetchItemPayloadData = {
  requestData: ProductRequestData;
  data: ProductResponseData;
};

type CartItemData = ProductResponseData & {
  count: number;
  ordinalId: number;
  isChecked: boolean;
};

type CartItemsState = {
  data: CartItemData[];
} & StoreState;

type CartStore = {
  [CartStoreBlocks.CART_ITEMS]: CartItemsState;
};

export type {
  orderTotal,
  fetchItemsPayloadData,
  fetchItemPayloadData,
  CartItemQuantity,
  ErrorAction,
  StoreError,
  CartStore,
  cartTotal,
  CartItemSlug,
  ProductResponseData,
  CartItemData,
};

export { CartStoreBlocks };
