import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getPaymentMethods, getProductInfoFromSlug } from 'api/routes/cart';
import { ProductRequestData } from 'api/models/cart';

import { CartItemQuantity, CartItemSlug } from './types';

const addItemQuantity = createAction<CartItemSlug>('addItemQuantity');
const removeItemQuantity = createAction<CartItemSlug>('removeItemQuantity');
const removeItemFromCart = createAction<CartItemSlug>('removeItemFromCart');
const setItemQuantity = createAction<CartItemQuantity>('setItemQuantity');
const removeItemBySlug = createAction<CartItemSlug[]>('removeItemBySlug');
const resetOrdinalId = createAction('resetOrdinalId');

const fetchItemFromCart = createAsyncThunk(
  'CartStore/fetchItemFromCart',
  async ({ productSlug, count, ordinalId }: ProductRequestData) => {
    const data = await getProductInfoFromSlug({ productSlug });

    const currentCount = Number(count) >= 0 ? count : 1;

    return { ...data, count: currentCount, ordinalId };
  },
);

const fetchPaymentMethods = createAsyncThunk(
  'CartStore/fetchPaymentMethods',
  async () => {
    const data = await getPaymentMethods();

    return data;
  },
);

export {
  fetchItemFromCart,
  fetchPaymentMethods,
  resetOrdinalId,
  setItemQuantity,
  addItemQuantity,
  removeItemBySlug,
  removeItemQuantity,
  removeItemFromCart,
};
