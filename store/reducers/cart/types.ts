import { ErrorAction, StoreState, StoreError } from 'store/types';

import {
  PaymentMethodResponseData,
  StatusResponseData,
  ProductResponseData,
  OrderingResponseData,
  OrderingResponseErrorData,
} from 'api/models/cart';

enum CartStoreBlocks {
  CART_ITEMS = 'cartItems',
  PAYMENT_METHODS = 'paymentMethods',
  PAYMENT_STATUS = 'paymentStatus',
  CREATE_ORDERING_STATUS = 'createOrderingStatus',
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

type PaymentStatusState = {
  data: StatusResponseData | null;
} & StoreState;

type CreateOrderingState = {
  data: OrderingResponseData | null;
  isCreateOrdering: boolean;
  loadingCreateOrdering: boolean;
  errorCreateOrdering: OrderingResponseErrorData | null;
};

type CartStore = {
  [CartStoreBlocks.CART_ITEMS]: CartItemsState;
  [CartStoreBlocks.PAYMENT_METHODS]: PaymentMethodsState;
  [CartStoreBlocks.PAYMENT_STATUS]: PaymentStatusState;
  [CartStoreBlocks.CREATE_ORDERING_STATUS]: CreateOrderingState;
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
