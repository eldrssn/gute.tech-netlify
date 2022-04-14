import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { transportReducer } from './transport';
import { regionReducer } from './regions';

const reducers = combineReducers({
  cartStore: cartReducer,
  transportStore: transportReducer,
  regionStore: regionReducer,
});

export { reducers };
