import { createAction } from '@reduxjs/toolkit';

import { createAsyncAction } from 'utility/helpers/store';
import { getProductInfoFromSlug } from 'api/routes/cart';
import { ProductRequestData, ProductResponseData } from 'api/models/cart';

import { OrderItemQuantity } from './types';

const addItemQuantity = createAction<string>('addOrderItemQuantity');
const setItemQuantity = createAction<OrderItemQuantity>('setOrderItemQuantity');
const removeItemQuantity = createAction<string>('removeOrderItemQuantity');
const clearOrder = createAction('clearOrder');

const fetchItemFromOrder = createAsyncAction<
  ProductResponseData,
  ProductRequestData
>({
  typeAction: 'OrderStore/fetchItemFromOrder',
  request: getProductInfoFromSlug,
  shouldReturnRequestData: true,
});

export {
  fetchItemFromOrder,
  clearOrder,
  addItemQuantity,
  removeItemQuantity,
  setItemQuantity,
};
