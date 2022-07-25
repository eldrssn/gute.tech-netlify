import { createReducer } from '@reduxjs/toolkit';

import { addItemsFromOrder, clearOrder, fetchItemFromOrder } from './actions';
import { initialState } from './constants';
import {
  CartItemData,
  OrderStore,
  ProductResponseData,
  OrderItemAdditionalData,
} from './types';

const handlers = {
  [addItemsFromOrder.type]: (
    state: OrderStore,
    { payload }: { payload: CartItemData[] },
  ) => {
    state.orderItems = payload;
  },
  [clearOrder.type]: (state: OrderStore) => {
    state.orderItems = [];
  },

  [fetchItemFromOrder.fulfilled.type]: (
    state: OrderStore,
    { payload }: { payload: ProductResponseData & OrderItemAdditionalData },
  ) => {
    const {
      slug: slugAddedItem,
      ordinalId: ordinalIdAddedItem,
      count,
    } = payload;
    const currentCount = Number(count) >= 0 ? count : 1;
    const order = state.orderItems;
    const itemIndex = order.findIndex(({ slug }) => slug === slugAddedItem);
    const ordinalId = ordinalIdAddedItem
      ? ordinalIdAddedItem
      : order.length + 1;

    if (itemIndex >= 0) {
      return;
    }
    state.orderItems = [
      ...order,
      { ...payload, ordinalId, count: currentCount },
    ];
  },
};

const orderReducer = createReducer(initialState, handlers);

export { orderReducer };
