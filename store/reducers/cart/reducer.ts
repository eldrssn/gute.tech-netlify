import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  addItemQuantity,
  setItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
  fetchPaymentMethods,
  fetchItemFromCart,
} from './actions';

import { PaymentMethodResponseData } from 'api/models/cart';

import {
  CartStore,
  CartItemSlug,
  CartItemCount,
  ErrorAction,
  CartItemQuantity,
  ProductResponseData,
} from './types';

const initialState: CartStore = {
  cartItems: { data: [], isLoading: false, error: null },
  paymentMethods: { data: [], isLoading: false, error: null },
};

const handlers = {
  [addItemQuantity.type]: (
    state: CartStore,
    { payload }: { payload: CartItemSlug },
  ) => {
    const itemIndex = state.cartItems.data.findIndex(
      ({ slug }) => slug === payload,
    );
    state.cartItems.data[itemIndex].count += 1;
  },
  [setItemQuantity.type]: (
    state: CartStore,
    { payload }: { payload: CartItemQuantity },
  ) => {
    const itemIndex = state.cartItems.data.findIndex(
      ({ slug }) => slug === payload.slug,
    );
    state.cartItems.data[itemIndex].count = payload.count;
  },
  [removeItemQuantity.type]: (
    state: CartStore,
    { payload }: { payload: CartItemSlug },
  ) => {
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === payload);
    const { count, ...otherItemData } = cart[itemIndex];
    const newCount = count - 1;
    const newItem = {
      count: newCount,
      ...otherItemData,
    };

    state.cartItems.data = [
      ...cart.slice(0, itemIndex),
      newItem,
      ...cart.slice(itemIndex + 1),
    ];
  },
  [removeItemFromCart.type]: (
    state: CartStore,
    { payload }: { payload: CartItemSlug },
  ) => {
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === payload);
    state.cartItems.data = [
      ...cart.slice(0, itemIndex),
      ...cart.slice(itemIndex + 1),
    ];
  },

  [fetchItemFromCart.fulfilled.type]: (
    state: CartStore,
    { payload }: { payload: ProductResponseData & CartItemCount },
  ) => {
    const { slug: slugAddedItem } = payload;
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === slugAddedItem);

    if (itemIndex >= 0) {
      const { count, ...otherItemData } = cart[itemIndex];
      const newItem = { count: count + 1, ...otherItemData };
      state.cartItems.data = [
        ...cart.slice(0, itemIndex),
        newItem,
        ...cart.slice(itemIndex + 1),
      ];

      return;
    }
    state.cartItems.data = [...cart, payload];
  },

  [fetchPaymentMethods.pending.type]: (state: CartStore) => {
    state.paymentMethods.isLoading = true;
  },
  [fetchPaymentMethods.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<PaymentMethodResponseData[]>,
  ) => {
    state.paymentMethods.data = payload;
    state.paymentMethods.isLoading = false;
    state.paymentMethods.error = null;
  },
  [fetchPaymentMethods.rejected.type]: (
    state: CartStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.paymentMethods.isLoading = false;
    state.paymentMethods.error = errorData;
  },
};

const cartReducer = createReducer(initialState, handlers);

export { cartReducer };
