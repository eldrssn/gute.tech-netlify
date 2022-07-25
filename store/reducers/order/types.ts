import { CartItemData } from 'components/base/cart/types';
import { ProductResponseData } from 'api/models/cart';

type OrderItemAdditionalData = {
  count: number;
  ordinalId: number;
};

enum OrderStoreBlocks {
  ORDER_ITEMS = 'orderItems',
}

type OrderStore = {
  [OrderStoreBlocks.ORDER_ITEMS]: CartItemData[];
};

export type {
  OrderStore,
  CartItemData,
  ProductResponseData,
  OrderItemAdditionalData,
};
