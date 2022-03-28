import { combineReducers } from '@reduxjs/toolkit';

import { testStore } from './TestStore';
import { cartReducer } from './cart';

const reducers = combineReducers({
  testStore,
  cartReducer,
});

export { reducers };
