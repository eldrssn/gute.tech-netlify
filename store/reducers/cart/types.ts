import { ErrorAction, StoreState, StoreError } from 'store/types';

enum ContentStoreBlocks {
  CART = 'cart',
  ORDERTOTAL = 'orderTotal',
}

type orderTotal = number;

type CartItemData = {
  name: string;
  count: number;
  price: number;
  imagePath: string;
  id: number;
};

type CartItemId = number;

type CartStore = {
  data: CartItemData[];
} & StoreState;

export type {
  ErrorAction,
  StoreError,
  CartStore,
  CartItemData,
  orderTotal,
  CartItemId,
};

export { ContentStoreBlocks };
