import { ErrorAction, StoreState, StoreError } from 'store/types';
import { CartItemData } from 'components/base/cart/types';
import { ProductRequestData, ProductResponseData } from 'api/models/cart';

type OrderItemQuantity = {
  count: number;
  slug: string;
};

type FetchItemPayloadData = {
  requestData: ProductRequestData;
  data: ProductResponseData;
};

type OrderItemsState = {
  data: CartItemData[];
} & StoreState;

type ItemsSlugs = string[];

enum OrderStoreBlocks {
  ORDER_ITEMS = 'orderItems',
}

type OrderStore = {
  [OrderStoreBlocks.ORDER_ITEMS]: OrderItemsState;
};

export type {
  ItemsSlugs,
  FetchItemPayloadData,
  StoreError,
  ErrorAction,
  OrderStore,
  CartItemData,
  ProductResponseData,
  OrderItemQuantity,
};
