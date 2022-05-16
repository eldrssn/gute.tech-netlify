import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  addItemQuantity,
  setItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
  removeItemBySlug,
  fetchPaymentMethods,
  fetchItemFromCart,
  resetOrdinalId,
} from './actions';

import { PaymentMethodResponseData } from 'api/models/cart';

import {
  CartStore,
  CartItemSlug,
  CartItemAdditionalData,
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
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === payload);
    const { count, ...otherItemData } = cart[itemIndex];
    const newCount = count + 1;
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
  [setItemQuantity.type]: (
    state: CartStore,
    { payload }: { payload: CartItemQuantity },
  ) => {
    const itemIndex = state.cartItems.data.findIndex(
      ({ slug }) => slug === payload.slug,
    );
    state.cartItems.data[itemIndex].count = Number(payload.count);
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
  [removeItemBySlug.type]: (
    state: CartStore,
    { payload }: { payload: CartItemSlug[] },
  ) => {
    const cart = state.cartItems.data;
    const newCart = cart.filter(
      (cartItem) => payload.findIndex((slug) => slug === cartItem.slug) < 0,
    );
    state.cartItems.data = newCart;
  },
  [resetOrdinalId.type]: (state: CartStore) => {
    const newCart = state.cartItems.data.map((cartItem, index) => {
      const { ordinalId, ...othedItemData } = cartItem;
      return {
        ordinalId: index + 1,
        ...othedItemData,
      };
    });
    state.cartItems.data = newCart;
  },

  [fetchItemFromCart.fulfilled.type]: (
    state: CartStore,
    { payload }: { payload: ProductResponseData & CartItemAdditionalData },
  ) => {
    const { slug: slugAddedItem, ordinalId: ordinalIdAddedItem } = payload;
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === slugAddedItem);
    const ordinalId = ordinalIdAddedItem ? ordinalIdAddedItem : cart.length + 1;

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
    state.cartItems.data = [...cart, { ...payload, ordinalId }];
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
