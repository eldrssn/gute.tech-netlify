import { createAction } from '@reduxjs/toolkit';

import {
  getPaymentMethods,
  getProductInfoFromSlug,
  getStatus,
} from 'api/routes/cart';
import {
  ProductRequestData,
  StatusRequestData,
  ProductResponseData,
  StatusResponseData,
  PaymentMethodResponseData,
} from 'api/models/cart';
import { createAsyncAction } from 'utility/helpers/store';

import { CartItemQuantity, CartItemSlug } from './types';

const addItemQuantity = createAction<CartItemSlug>('addItemQuantity');
const removeItemQuantity = createAction<CartItemSlug>('removeItemQuantity');
const removeItemFromCart = createAction<CartItemSlug>('removeItemFromCart');
const setItemQuantity = createAction<CartItemQuantity>('setItemQuantity');
const removeItemBySlug = createAction<CartItemSlug[]>('removeItemBySlug');
const resetOrdinalId = createAction('resetOrdinalId');
const clearCart = createAction('clearCart');

const fetchItemFromCart = createAsyncAction<
  ProductResponseData,
  ProductRequestData
>({
  typeAction: 'CartStore/fetchItemFromCart',
  request: getProductInfoFromSlug,
  shouldReturnRequestData: true,
});

const fetchPaymentMethods = createAsyncAction<PaymentMethodResponseData[]>({
  typeAction: 'CartStore/fetchPaymentMethods',
  request: getPaymentMethods,
});

const fetchStatusPayment = createAsyncAction<
  StatusResponseData,
  StatusRequestData
>({
  typeAction: 'CartStore/fetchStatusPayment',
  request: getStatus,
});

export {
  fetchItemFromCart,
  fetchPaymentMethods,
  fetchStatusPayment,
  resetOrdinalId,
  setItemQuantity,
  addItemQuantity,
  removeItemBySlug,
  removeItemQuantity,
  removeItemFromCart,
  clearCart,
};

//TODO: удалить после теста со всех редьюсеров

// const fetchItemFromCart = createAsyncThunk(
//   'CartStore/fetchItemFromCart',
//   async ({ productSlug, count, ordinalId }: ProductRequestData) => {
//     const data = await getProductInfoFromSlug({ productSlug });

//     return { ...data, count, ordinalId };
//   },
// );

// const fetchPaymentMethods = createAsyncThunk(
//   'CartStore/fetchPaymentMethods',
//   async () => {
//     const data = await getPaymentMethods();

//     return data;
//   },
// );

// const fetchStatusPayment = createAsyncThunk(
//   'CartStore/fetchStatusPayment',
//   async ({ orderId }: StatusRequestData) => {
//     const data = await getStatus({ orderId });

//     return data;
//   },
// );
