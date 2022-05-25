import { ErrorAction, StoreState, StoreError } from 'store/types';

import {
  PaymentMethodResponseData,
  StatusResponseData,
  ProductResponseData,
} from 'api/models/cart';

enum CartStoreBlocks {
  CART_ITEMS = 'cartItems',
  PAYMENT_METHODS = 'paymentMethods',
  PAYMENT_STATUS = 'paymentStatus',
}

type orderTotal = number;

type CartItemSlug = string;

type CartItemAdditionalData = {
  count: number;
  ordinalId: number;
};

type CartItemQuantity = {
  count: number;
  slug: string;
};

type CartItemData = ProductResponseData & { count: number; ordinalId: number };

type PaymentMethodsState = {
  data: PaymentMethodResponseData[];
} & StoreState;

type CartItemsState = {
  data: CartItemData[];
} & StoreState;

type PaymentStatus = {
  data: StatusResponseData | null;
} & StoreState;

type CartStore = {
  [CartStoreBlocks.CART_ITEMS]: CartItemsState;
  [CartStoreBlocks.PAYMENT_METHODS]: PaymentMethodsState;
  [CartStoreBlocks.PAYMENT_STATUS]: PaymentStatus;
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
  CartItemAdditionalData,
  StatusResponseData,
};

export { CartStoreBlocks };
