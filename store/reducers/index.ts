import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { transportReducer } from './transport';

const reducers = combineReducers({
  cartStore: cartReducer,
  transportStore: transportReducer,
});

export { reducers };
