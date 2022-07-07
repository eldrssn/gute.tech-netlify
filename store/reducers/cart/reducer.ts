import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  PaymentMethodResponseData,
  OrderingResponseErrorData,
  OrderingResponseData,
} from 'api/models/cart';

import {
  addItemQuantity,
  setItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
  removeItemBySlug,
  fetchPaymentMethods,
  fetchStatusPayment,
  fetchItemFromCart,
  resetOrdinalId,
  clearCart,
  clearCreateOrdering,
  createOrderingUnAuthorized,
} from './actions';
import { initialState } from './constants';

import {
  CartStore,
  CartItemSlug,
  CartItemAdditionalData,
  ErrorAction,
  CartItemQuantity,
  ProductResponseData,
  StatusResponseData,
} from './types';

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
  [clearCart.type]: (state: CartStore) => {
    state.cartItems.data = [];
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
  [clearCreateOrdering.type]: (state: CartStore) => {
    state.createOrderingStatus.data = null;
    state.createOrderingStatus.errorCreateOrdering = null;
    state.createOrderingStatus.isCreateOrdering = false;
    state.createOrderingStatus.loadingCreateOrdering = false;
  },

  [fetchItemFromCart.fulfilled.type]: (
    state: CartStore,
    { payload }: { payload: ProductResponseData & CartItemAdditionalData },
  ) => {
    const {
      slug: slugAddedItem,
      ordinalId: ordinalIdAddedItem,
      count,
    } = payload;
    const currentCount = Number(count) >= 0 ? count : 1;
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === slugAddedItem);
    const ordinalId = ordinalIdAddedItem ? ordinalIdAddedItem : cart.length + 1;

    if (itemIndex >= 0) {
      return;
    }
    state.cartItems.data = [
      ...cart,
      { ...payload, ordinalId, count: currentCount },
    ];
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

  [fetchStatusPayment.pending.type]: (state: CartStore) => {
    state.paymentStatus.isLoading = true;
  },
  [fetchStatusPayment.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<StatusResponseData>,
  ) => {
    state.paymentStatus.data = payload;
    state.paymentStatus.isLoading = false;
    state.paymentStatus.error = null;
  },
  [fetchStatusPayment.rejected.type]: (
    state: CartStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.paymentStatus.isLoading = false;
    state.paymentStatus.error = errorData;
  },

  [createOrderingUnAuthorized.pending.type]: (state: CartStore) => {
    state.createOrderingStatus.loadingCreateOrdering = true;
    state.createOrderingStatus.errorCreateOrdering = null;
  },
  [createOrderingUnAuthorized.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<OrderingResponseData>,
  ) => {
    state.createOrderingStatus.data = payload;
    state.createOrderingStatus.isCreateOrdering = true;
    state.createOrderingStatus.loadingCreateOrdering = false;
    state.createOrderingStatus.errorCreateOrdering = null;
  },
  [createOrderingUnAuthorized.rejected.type]: (
    state: CartStore,
    { payload }: PayloadAction<OrderingResponseErrorData>,
  ) => {
    state.createOrderingStatus.isCreateOrdering = false;
    state.paymentStatus.isLoading = false;
    state.createOrderingStatus.errorCreateOrdering = payload;
  },
};

const cartReducer = createReducer(initialState, handlers);

export { cartReducer };
