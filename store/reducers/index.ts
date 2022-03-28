import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { contentReducer } from './content';

const reducers = combineReducers({
  cartStore: cartReducer,
  contentStore: contentReducer,
});

export { reducers };
