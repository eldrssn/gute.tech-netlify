import { ErrorAction, StoreState, StoreError } from 'store/types';

import {
  PaymentMethodResponseData,
  ProductResponseData,
} from 'api/models/cart';

enum CartStoreBlocks {
  CARTITEMS = 'cartItems',
  ORDERTOTAL = 'orderTotal',
  PAYMENTMETHODS = 'paymentMethods',
}

type orderTotal = number;

type CartItemSlug = string;

type CartItemCount = {
  count: number;
};

type CartItemQuantity = {
  count: number;
  slug: string;
};

type CartItemData = ProductResponseData & { count: number };

type PaymentMethodsState = {
  data: PaymentMethodResponseData[];
} & StoreState;

type CartItemsState = {
  data: CartItemData[];
} & StoreState;

type CartStore = {
  [CartStoreBlocks.CARTITEMS]: CartItemsState;
  [CartStoreBlocks.PAYMENTMETHODS]: PaymentMethodsState;
};

export type {
  CartItemQuantity,
  ErrorAction,
  StoreError,
  CartStore,
  orderTotal,
  CartItemSlug,
  ProductResponseData,
  CartItemData,
  CartItemCount,
};

export { CartStoreBlocks };
