import { createAction } from '@reduxjs/toolkit';

import {
  getProductsInfoFromSlugs,
  getCartAuthorized,
  getCartUnAuthorized,
  postCartItemAuthorized,
  postCartItemUnAuthorized,
  postCartClearAuthorized,
  postCartClearUnAuthorized,
  putCartItemUpdateAuthorized,
  putCartItemUpdateUnAuthorized,
} from 'api/routes/cart';
import {
  ProductResponseData,
  ProductsRequestData,
  CartResponseData,
  CartAddItemRequestData,
  CartAddItemResponseData,
  CartUpdateItemRequestData,
  CartUpdateItemResponeData,
} from 'api/models/cart';
import { createAsyncAction } from 'utility/helpers/store';

const changeChecked = createAction<string>('changeChecked');
const setAllChecked = createAction('setAllChecked');
const clearCheckedItems = createAction('clearCheckedItems');
const setCurrentPage = createAction<number>('setCurrentPage');
const clearCartItems = createAction('clearCartItems');

const fetchCartAuthorized = createAsyncAction<CartResponseData[]>({
  typeAction: 'cartStore/fetchCartAuthorized',
  request: getCartAuthorized,
});

const fetchCartUnAuthorized = createAsyncAction<CartResponseData[]>({
  typeAction: 'cartStore/fetchCartUnAuthorized',
  request: getCartUnAuthorized,
});

const addProductToCartAuthorized = createAsyncAction<
  CartAddItemResponseData,
  CartAddItemRequestData
>({
  typeAction: 'cartStore/addProductToCartAuthorized',
  request: postCartItemAuthorized,
});

const addProductToCartUnAuthorized = createAsyncAction<
  CartAddItemResponseData,
  CartAddItemRequestData
>({
  typeAction: 'cartStore/addProductToCartUnAuthorized',
  request: postCartItemUnAuthorized,
});

const clearCartAuthorized = createAsyncAction({
  typeAction: 'cartStore/clearCartAuthorized',
  request: postCartClearAuthorized,
});

const clearCartUnAuthorized = createAsyncAction({
  typeAction: 'cartStore/clearCartUnAuthorized',
  request: postCartClearUnAuthorized,
});

const updateCartItemAuthorized = createAsyncAction<
  CartUpdateItemResponeData,
  CartUpdateItemRequestData[]
>({
  typeAction: 'cartStore/updateCartItemAuthorized',
  request: putCartItemUpdateAuthorized,
});

const updateCartItemUnAuthorized = createAsyncAction<
  CartUpdateItemResponeData,
  CartUpdateItemRequestData[]
>({
  typeAction: 'cartStore/updateCartItemUnAuthorized',
  request: putCartItemUpdateUnAuthorized,
});

const fetchItemsFromCart = createAsyncAction<
  ProductResponseData[],
  ProductsRequestData
>({
  typeAction: 'CartStore/fetchItemsFromCart',
  request: getProductsInfoFromSlugs,
  shouldReturnRequestData: true,
});

export {
  clearCartItems,
  setCurrentPage,
  clearCheckedItems,
  setAllChecked,
  changeChecked,
  addProductToCartAuthorized,
  addProductToCartUnAuthorized,
  fetchCartUnAuthorized,
  fetchCartAuthorized,
  fetchItemsFromCart,
  clearCartAuthorized,
  clearCartUnAuthorized,
  updateCartItemAuthorized,
  updateCartItemUnAuthorized,
};
