import { createReducer } from '@reduxjs/toolkit';

import {
  addItemQuantity,
  setItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
  removeItemBySlug,
  fetchItemFromCart,
  fetchItemsFromCart,
  resetOrdinalId,
  changeChecked,
  clearCart,
  setAllChecked,
  clearCheckedItems,
} from './actions';
import {
  initialState,
  MIN_COUNT_ADD_ITEM_CART,
  MIN_COUNT_CART_ITEM,
} from './constants';

import {
  CartStore,
  CartItemSlug,
  CartItemQuantity,
  fetchItemsPayloadData,
  fetchItemPayloadData,
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
  [clearCart.type]: (state: CartStore) => {
    state.cartItems.data = [];
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

  [fetchItemFromCart.fulfilled.type]: (
    state: CartStore,
    { payload }: { payload: fetchItemPayloadData },
  ) => {
    const {
      productSlug: slugAddedItem,
      ordinalId: ordinalIdAddedItem,
      count,
    } = payload.requestData;
    const currentCount =
      Number(count) >= MIN_COUNT_CART_ITEM ? count : MIN_COUNT_CART_ITEM;
    const cart = state.cartItems.data;
    const itemIndex = cart.findIndex(({ slug }) => slug === slugAddedItem);
    const ordinalId = ordinalIdAddedItem ? ordinalIdAddedItem : cart.length + 1;

    if (itemIndex >= 0) {
      return;
    }
    state.cartItems.data = [
      ...cart,
      {
        ...payload.data,
        ordinalId,
        count: currentCount ? currentCount : MIN_COUNT_ADD_ITEM_CART,
        isChecked: true,
      },
    ];
  },

  [fetchItemsFromCart.fulfilled.type]: (
    state: CartStore,
    { payload }: { payload: fetchItemsPayloadData },
  ) => {
    const { productsOptions } = payload.requestData;
    const newCartItems = payload.data.map((item) => {
      const newItemslug = item.slug;
      const productOptionsIndex = productsOptions.findIndex(
        (productOption) => productOption.productSlug === newItemslug,
      );
      const productOption = productsOptions[productOptionsIndex];

      return {
        ...item,
        count: productOption.count,
        ordinalId: productOption.ordinalId,
        isChecked: productOption.isChecked,
      };
    });

    state.cartItems.data = newCartItems;
  },
};

const cartReducer = createReducer(initialState, handlers);

export { cartReducer };
