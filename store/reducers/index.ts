import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { transportReducer } from './transport';
import { showcaseReducer } from './showcase';
import { catalogReducer } from './catalog';
import { regionReducer } from './regions';
import { pagesReducer } from './pages';
import { userReducer } from './user';
import { authenticationReducer } from './authentication';

const reducers = combineReducers({
  cartStore: cartReducer,
  transportStore: transportReducer,
  showcaseStore: showcaseReducer,
  catalogStore: catalogReducer,
  regionStore: regionReducer,
  pagesStore: pagesReducer,
  userStore: userReducer,
  authenticationStore: authenticationReducer,
});

export { reducers };
