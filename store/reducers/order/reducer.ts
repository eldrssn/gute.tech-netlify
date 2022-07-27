import { createReducer } from '@reduxjs/toolkit';

import {
  clearOrder,
  fetchItemFromOrder,
  addItemQuantity,
  removeItemQuantity,
  setItemQuantity,
} from './actions';
import { initialState } from './constants';
import {
  OrderStore,
  ProductResponseData,
  ErrorAction,
  OrderItemAdditionalData,
  OrderItemQuantity,
} from './types';

const handlers = {
  [addItemQuantity.type]: (
    state: OrderStore,
    { payload }: { payload: string },
  ) => {
    const order = state.orderItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === payload);
    const { count, ...otherItemData } = order[itemIndex];
    const newCount = count + 1;
    const newItem = {
      count: newCount,
      ...otherItemData,
    };
    state.orderItems.data = [
      ...order.slice(0, itemIndex),
      newItem,
      ...order.slice(itemIndex + 1),
    ];
  },
  [setItemQuantity.type]: (
    state: OrderStore,
    { payload }: { payload: OrderItemQuantity },
  ) => {
    const itemIndex = state.orderItems.data.findIndex(
      ({ slug }) => slug === payload.slug,
    );
    state.orderItems.data[itemIndex].count = Number(payload.count);
  },
  [removeItemQuantity.type]: (
    state: OrderStore,
    { payload }: { payload: string },
  ) => {
    const order = state.orderItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === payload);
    const { count, ...otherItemData } = order[itemIndex];
    const newCount = count - 1;
    const newItem = {
      count: newCount,
      ...otherItemData,
    };

    state.orderItems.data = [
      ...order.slice(0, itemIndex),
      newItem,
      ...order.slice(itemIndex + 1),
    ];
  },
  [clearOrder.type]: (state: OrderStore) => {
    state.orderItems.data = [];
  },

  [fetchItemFromOrder.pending.type]: (state: OrderStore) => {
    state.orderItems.isLoading = true;
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
    const order = state.orderItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === slugAddedItem);
    const ordinalId = ordinalIdAddedItem
      ? ordinalIdAddedItem
      : order.length + 1;

    if (itemIndex >= 0) {
      return;
    }
    state.orderItems.data = [{ ...payload, ordinalId, count: currentCount }];
    state.orderItems.isLoading = false;
    state.orderItems.error = null;
  },
  [fetchItemFromOrder.rejected.type]: (
    state: OrderStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.orderItems.isLoading = false;
    state.orderItems.error = errorData;
  },
};

const orderReducer = createReducer(initialState, handlers);

export { orderReducer };
