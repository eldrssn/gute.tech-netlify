import { createReducer } from '@reduxjs/toolkit';

import { CartItemData } from 'components/base/cart/types';

import {
  clearOrder,
  addItemQuantity,
  setItemsFromOrder,
  removeItemQuantity,
  setItemQuantity,
  fetchItemFromOrder,
} from './actions';
import { initialState, MIN_COUNT_ORDER_ITEM } from './constants';
import {
  OrderStore,
  ErrorAction,
  OrderItemQuantity,
  FetchItemPayloadData,
} from './types';

const handlers = {
  [addItemQuantity.type]: (
    state: OrderStore,
    { payload }: { payload: string },
  ) => {
    const order = state.orderItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === payload);
    const { quantity, ...otherItemData } = order[itemIndex];
    const newCount = quantity + 1;
    const newItem = {
      quantity: newCount,
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
    state.orderItems.data[itemIndex].quantity = Number(payload.count);
  },
  [removeItemQuantity.type]: (
    state: OrderStore,
    { payload }: { payload: string },
  ) => {
    const order = state.orderItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === payload);
    const { quantity, ...otherItemData } = order[itemIndex];
    const newCount = quantity - 1;
    const newItem = {
      quantity: newCount,
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

  [setItemsFromOrder.type]: (
    state: OrderStore,
    { payload }: { payload: CartItemData[] },
  ) => {
    const newOrderItems = payload.map((orderItem) => {
      const { quantity, ...otherOrderItemData } = orderItem;
      const newCount =
        quantity > MIN_COUNT_ORDER_ITEM ? quantity : MIN_COUNT_ORDER_ITEM;
      return { ...otherOrderItemData, quantity: newCount };
    });
    state.orderItems.data = newOrderItems;
  },

  [fetchItemFromOrder.pending.type]: (state: OrderStore) => {
    state.orderItems.isLoading = true;
  },
  [fetchItemFromOrder.fulfilled.type]: (
    state: OrderStore,
    { payload }: { payload: FetchItemPayloadData },
  ) => {
    const { productSlug: slugAddedItem, quantity } = payload.requestData;
    const currentQuantity =
      Number(quantity) > MIN_COUNT_ORDER_ITEM ? quantity : MIN_COUNT_ORDER_ITEM;
    const order = state.orderItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === slugAddedItem);

    if (itemIndex >= 0) {
      return;
    }
    state.orderItems.data = [
      {
        ...payload.data,
        quantity: currentQuantity ? currentQuantity : MIN_COUNT_ORDER_ITEM,
        isChecked: true,
      },
    ];
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
