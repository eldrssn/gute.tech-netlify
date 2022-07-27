import { ErrorAction, StoreState, StoreError } from 'store/types';
import { CartItemData } from 'components/base/cart/types';
import { ProductResponseData } from 'api/models/cart';

type OrderItemAdditionalData = {
  count: number;
  ordinalId: number;
};

type OrderItemQuantity = {
  count: number;
  slug: string;
};

type OrderItemsState = {
  data: CartItemData[];
} & StoreState;

enum OrderStoreBlocks {
  ORDER_ITEMS = 'orderItems',
}

type OrderStore = {
  [OrderStoreBlocks.ORDER_ITEMS]: OrderItemsState;
};

export type {
  StoreError,
  ErrorAction,
  OrderStore,
  CartItemData,
  ProductResponseData,
  OrderItemAdditionalData,
  OrderItemQuantity,
};
