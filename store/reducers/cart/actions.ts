import { createAction } from '@reduxjs/toolkit';

import {
  getProductInfoFromSlug,
  getProductsInfoFromSlugs,
} from 'api/routes/cart';
import {
  ProductRequestData,
  ProductResponseData,
  ProductsRequestData,
} from 'api/models/cart';
import { createAsyncAction } from 'utility/helpers/store';

import { CartItemQuantity, CartItemSlug } from './types';

const addItemQuantity = createAction<CartItemSlug>('addCartItemQuantity');
const removeItemQuantity = createAction<CartItemSlug>('removeCartItemQuantity');
const removeItemFromCart = createAction<CartItemSlug>('removeCartItemFromCart');
const setItemQuantity = createAction<CartItemQuantity>('setCartItemQuantity');
const removeItemBySlug = createAction<CartItemSlug[]>('removeCartItemBySlug');
const changeChecked = createAction<string>('changeChecked');
const setAllChecked = createAction('setAllChecked');
const clearCheckedItems = createAction('clearCheckedItems');
const resetOrdinalId = createAction('resetOrdinalId');
const clearCart = createAction('clearCart');

const fetchItemsFromCart = createAsyncAction<
  ProductResponseData[],
  ProductsRequestData
>({
  typeAction: 'CartStore/fetchItemsFromCart',
  request: getProductsInfoFromSlugs,
  shouldReturnRequestData: true,
});

const fetchItemFromCart = createAsyncAction<
  ProductResponseData,
  ProductRequestData
>({
  typeAction: 'CartStore/fetchItemFromCart',
  request: getProductInfoFromSlug,
  shouldReturnRequestData: true,
});

export {
  setAllChecked,
  clearCheckedItems,
  changeChecked,
  fetchItemsFromCart,
  fetchItemFromCart,
  resetOrdinalId,
  setItemQuantity,
  addItemQuantity,
  removeItemBySlug,
  removeItemQuantity,
  removeItemFromCart,
  clearCart,
};
