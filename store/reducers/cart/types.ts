import { StoreState, ErrorAction } from 'store/types';

import {
  ProductResponseData,
  CartItemResponseData,
  ProductsRequestData,
} from 'api/models/cart';

enum CartStoreBlocks {
  CART_ITEMS = 'cartItems',
  CART_SAVED_ITEMS = 'cartSavedItems',
  CART_TOTAL = 'cartTotal',
  CART_PRODUCT_COUNT = 'cartProductCount',
  CART_UPDATED = 'cartUpdated',
  CART_ERROR = 'cartError',
}

type fetchItemsPayloadData = {
  requestData: ProductsRequestData;
  data: ProductResponseData[];
};

type CartItemData = {
  isChecked: boolean;
  quantity: number;
} & ProductResponseData;

type CartItemsState = {
  data: CartItemData[];
} & StoreState;

type CartSavedItemsState = {
  data: CartItemResponseData[];
} & StoreState;

type CartStore = {
  [CartStoreBlocks.CART_ITEMS]: CartItemsState;
  [CartStoreBlocks.CART_SAVED_ITEMS]: CartSavedItemsState;
  [CartStoreBlocks.CART_TOTAL]: number;
  [CartStoreBlocks.CART_PRODUCT_COUNT]: number;
  [CartStoreBlocks.CART_ERROR]: boolean;
  [CartStoreBlocks.CART_UPDATED]: boolean;
};

export type {
  CartStore,
  ErrorAction,
  ProductResponseData,
  CartItemData,
  fetchItemsPayloadData,
};

export { CartStoreBlocks };
