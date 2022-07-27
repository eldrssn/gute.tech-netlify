import { createAction } from '@reduxjs/toolkit';

import {
  getPaymentMethods,
  getProductInfoFromSlug,
  getStatus,
  postOrderingUnAuthorized,
  postOrderingAuthorized,
} from 'api/routes/cart';
import {
  ProductRequestData,
  StatusRequestData,
  ProductResponseData,
  StatusResponseData,
  PaymentMethodResponseData,
  OrderingRequestData,
  OrderingResponseData,
} from 'api/models/cart';
import { createAsyncAction } from 'utility/helpers/store';

import { CartItemQuantity, CartItemSlug } from './types';

const addItemQuantity = createAction<CartItemSlug>('addCartItemQuantity');
const removeItemQuantity = createAction<CartItemSlug>('removeCartItemQuantity');
const removeItemFromCart = createAction<CartItemSlug>('removeCartItemFromCart');
const setItemQuantity = createAction<CartItemQuantity>('setCartItemQuantity');
const removeItemBySlug = createAction<CartItemSlug[]>('removeCartItemBySlug');
const resetOrdinalId = createAction('resetOrdinalId');
const clearCart = createAction('clearCart');
const clearCreateOrdering = createAction('clearCreateOrdering');

const fetchItemFromCart = createAsyncAction<
  ProductResponseData,
  ProductRequestData
>({
  typeAction: 'CartStore/fetchItemFromCart',
  request: getProductInfoFromSlug,
  shouldReturnRequestData: true,
});

//TODO: вынести экшены в отдельный редъюсер, вместе с логикой оформления из корзины

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

const createOrderingUnAuthorized = createAsyncAction<
  OrderingResponseData,
  OrderingRequestData
>({
  typeAction: 'CartStore/postOrdering',
  request: postOrderingUnAuthorized,
  shouldHandleError: true,
});

const createOrderingAuthorized = createAsyncAction<
  OrderingResponseData,
  OrderingRequestData
>({
  typeAction: 'CartStore/postOrdering',
  request: postOrderingAuthorized,
  shouldHandleError: true,
});

export {
  createOrderingUnAuthorized,
  createOrderingAuthorized,
  fetchItemFromCart,
  fetchPaymentMethods,
  fetchStatusPayment,
  resetOrdinalId,
  clearCreateOrdering,
  setItemQuantity,
  addItemQuantity,
  removeItemBySlug,
  removeItemQuantity,
  removeItemFromCart,
  clearCart,
};
