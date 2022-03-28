import { createReducer } from '@reduxjs/toolkit';

import {
  addItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
  addItemFromCart,
} from './actions';

import { CartData } from 'mock/CartData';

import { CartStore, CartItemData, CartItemId } from './types';

const initialState: CartStore = {
  data: CartData,
  isLoading: false,
  error: null,
};

const handlers = {
  [addItemQuantity.type]: (
    state: CartStore,
    { payload }: { payload: CartItemId },
  ) => {
    const itemIndex = state.data.findIndex(({ id }) => id === payload);
    state.data[itemIndex].count += 1;
  },
  [removeItemQuantity.type]: (
    state: CartStore,
    { payload }: { payload: CartItemId },
  ) => {
    const cart = state.data;
    const itemIndex = cart.findIndex(({ id }) => id === payload);
    const { name, count, price, imagePath, id } = cart[itemIndex];
    const newCount = count - 1;
    const newItem = { name, count: newCount, price, imagePath, id };

    state.data =
      newItem.count <= 0
        ? [...cart.slice(0, itemIndex), ...cart.slice(itemIndex + 1)]
        : [...cart.slice(0, itemIndex), newItem, ...cart.slice(itemIndex + 1)];
  },
  [addItemFromCart.type]: (
    state: CartStore,
    { payload }: { payload: CartItemData },
  ) => {
    const cart = state.data;
    state.data = [...cart, payload];
  },
  [removeItemFromCart.type]: (
    state: CartStore,
    { payload }: { payload: CartItemId },
  ) => {
    const cart = state.data;
    const itemIndex = cart.findIndex(({ id }) => id === payload);
    state.data = [...cart.slice(0, itemIndex), ...cart.slice(itemIndex + 1)];
  },
};

const cartReducer = createReducer(initialState, handlers);

export { cartReducer };
