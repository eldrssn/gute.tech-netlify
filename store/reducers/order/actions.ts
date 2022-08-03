import { createAction } from '@reduxjs/toolkit';

import { createAsyncAction } from 'utility/helpers/store';
import { getProductInfoFromSlug } from 'api/routes/cart';
import { ProductRequestData, ProductResponseData } from 'api/models/cart';
import { CartItemData } from 'components/base/cart/types';

import { OrderItemQuantity, ItemsSlugs } from './types';

const setItemsSlugs = createAction<ItemsSlugs>('setItemsSlugs');
const setItemsFromOrder = createAction<CartItemData[]>('setItemsFromOrder');
const addItemQuantity = createAction<string>('addOrderItemQuantity');
const setItemQuantity = createAction<OrderItemQuantity>('setOrderItemQuantity');
const removeItemQuantity = createAction<string>('removeOrderItemQuantity');
const clearOrder = createAction('clearOrder');
const clearItemsSlugs = createAction('clearItemsSlugs');

const fetchItemFromOrder = createAsyncAction<
  ProductResponseData,
  ProductRequestData
>({
  typeAction: 'OrderStore/fetchItemFromOrder',
  request: getProductInfoFromSlug,
  shouldReturnRequestData: true,
});

export {
  clearItemsSlugs,
  setItemsSlugs,
  setItemsFromOrder,
  fetchItemFromOrder,
  clearOrder,
  addItemQuantity,
  removeItemQuantity,
  setItemQuantity,
};
