import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { CartResponseData, CartAddItemResponseData } from 'api/models/cart';
import {
  clearCartItems,
  changeChecked,
  setAllChecked,
  clearCheckedItems,
  fetchItemsFromCart,
  fetchCartAuthorized,
  fetchCartUnAuthorized,
  addProductToCartAuthorized,
  addProductToCartUnAuthorized,
  updateCartItemAuthorized,
  updateCartItemUnAuthorized,
} from './actions';
import { initialState } from './constants';

import { CartStore, fetchItemsPayloadData, ErrorAction } from './types';

const handlers = {
  [changeChecked.type]: (
    state: CartStore,
    { payload }: { payload: string },
  ) => {
    const order = state.cartItems.data;
    const itemIndex = order.findIndex(({ slug }) => slug === payload);
    const { isChecked, ...otherItemData } = order[itemIndex];
    const ChangedChecked = !isChecked;
    const newItem = {
      isChecked: ChangedChecked,
      ...otherItemData,
    };
    state.cartItems.data = [
      ...order.slice(0, itemIndex),
      newItem,
      ...order.slice(itemIndex + 1),
    ];
  },

  [setAllChecked.type]: (state: CartStore) => {
    const newCart = state.cartItems.data.map((cartItem) => {
      const { isChecked, ...othedItemData } = cartItem;
      return {
        isChecked: true,
        ...othedItemData,
      };
    });
    state.cartItems.data = newCart;
  },

  [clearCheckedItems.type]: (state: CartStore) => {
    const newCart = state.cartItems.data.map((cartItem) => {
      const { isChecked, ...othedItemData } = cartItem;
      return {
        isChecked: false,
        ...othedItemData,
      };
    });
    state.cartItems.data = newCart;
  },

  [clearCartItems.type]: (state: CartStore) => {
    state.cartItems.data = [];
    state.cartItems.isLoading = false;
  },

  [fetchItemsFromCart.pending.type]: (state: CartStore) => {
    state.cartItems.error = null;
    state.cartItems.isLoading = true;
  },
  [fetchItemsFromCart.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<fetchItemsPayloadData>,
  ) => {
    if (payload.data.length === 0) {
      state.cartItems.data = [];
      return;
    }
    const oldCartItems = state.cartItems.data;
    const { productsOptions } = payload.requestData;
    const newCartItems = payload.data.map((item) => {
      const newItemslug = item.slug;
      const productOptionsIndex = productsOptions.findIndex(
        (productOption) => productOption.productSlug === newItemslug,
      );
      const productOption = productsOptions[productOptionsIndex];
      const oldCartItem = oldCartItems.find(
        (oldItem) => oldItem.slug === item.slug,
      );
      const isChecked = oldCartItem ? oldCartItem.isChecked : true;

      return {
        ...item,
        quantity: productOption.quantity,
        isChecked,
      };
    });
    state.cartItems.isLoading = false;
    state.cartItems.data = newCartItems;
  },
  [fetchItemsFromCart.rejected.type]: (
    state: CartStore,
    { error }: ErrorAction,
  ) => {
    state.cartItems.error = error;
    state.cartItems.isLoading = false;
  },

  [fetchCartAuthorized.pending.type]: (state: CartStore) => {
    state.cartSavedItems.isLoading = true;
    state.cartSavedItems.error = null;
  },
  [fetchCartAuthorized.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<CartResponseData>,
  ) => {
    state.cartSavedItems.isLoading = false;
    state.cartSavedItems.data = payload.results;
    state.cartProductCount = payload.total;
    state.cartTotal = payload.total_price;
  },
  [fetchCartAuthorized.rejected.type]: (
    state: CartStore,
    { error }: ErrorAction,
  ) => {
    state.cartSavedItems.error = error;
    state.cartSavedItems.isLoading = false;
  },

  [fetchCartUnAuthorized.pending.type]: (state: CartStore) => {
    state.cartSavedItems.isLoading = true;
    state.cartSavedItems.error = null;
  },
  [fetchCartUnAuthorized.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<CartResponseData>,
  ) => {
    state.cartSavedItems.isLoading = false;
    state.cartSavedItems.data = payload.results;
    state.cartProductCount = payload.total;
    state.cartTotal = payload.total_price;
  },
  [fetchCartUnAuthorized.rejected.type]: (
    state: CartStore,
    { error }: ErrorAction,
  ) => {
    state.cartSavedItems.error = error;
    state.cartSavedItems.isLoading = false;
  },

  [addProductToCartAuthorized.pending.type]: (state: CartStore) => {
    state.cartUpdated = true;
    state.cartError = false;
  },
  [addProductToCartAuthorized.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<CartAddItemResponseData>,
  ) => {
    state.cartError = false;
    state.cartUpdated = false;
    state.cartTotal = payload.total_price;
    state.cartProductCount = payload.total;
  },
  [addProductToCartAuthorized.rejected.type]: (state: CartStore) => {
    state.cartError = true;
    state.cartUpdated = false;
  },

  [addProductToCartUnAuthorized.pending.type]: (state: CartStore) => {
    state.cartUpdated = true;
    state.cartError = false;
  },
  [addProductToCartUnAuthorized.fulfilled.type]: (
    state: CartStore,
    { payload }: PayloadAction<CartAddItemResponseData>,
  ) => {
    state.cartError = false;
    state.cartUpdated = false;
    state.cartTotal = payload.total_price;
    state.cartProductCount = payload.total;
  },
  [addProductToCartUnAuthorized.rejected.type]: (state: CartStore) => {
    state.cartError = true;
    state.cartUpdated = false;
  },

  [updateCartItemAuthorized.pending.type]: (state: CartStore) => {
    state.cartUpdated = true;
    state.cartError = false;
  },
  [updateCartItemAuthorized.fulfilled.type]: (state: CartStore) => {
    state.cartError = false;
    state.cartUpdated = false;
  },
  [updateCartItemAuthorized.rejected.type]: (state: CartStore) => {
    state.cartError = true;
    state.cartUpdated = false;
  },

  [updateCartItemUnAuthorized.pending.type]: (state: CartStore) => {
    state.cartUpdated = true;
    state.cartError = false;
  },
  [updateCartItemUnAuthorized.fulfilled.type]: (state: CartStore) => {
    state.cartError = false;
    state.cartUpdated = false;
  },
  [updateCartItemUnAuthorized.rejected.type]: (state: CartStore) => {
    state.cartError = true;
    state.cartUpdated = false;
  },
};

const cartReducer = createReducer(initialState, handlers);

export { cartReducer };
