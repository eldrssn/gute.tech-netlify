import { createAction } from '@reduxjs/toolkit';

import { CartItemData, CartItemId } from './types';

const addItemQuantity = createAction<CartItemId>('addItemQuantity');
const removeItemQuantity = createAction<CartItemId>('removeItemQuantity');
const addItemFromCart = createAction<CartItemData>('addItemFromCart');
const removeItemFromCart = createAction<CartItemId>('removeItemFromCart');

export {
  addItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
  addItemFromCart,
};
