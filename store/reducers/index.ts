import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { transportReducer } from './transport';
import { showcaseReducer } from './showcase';
import { catalogReducer } from './catalog';
import { regionReducer } from './regions';
import { pagesReducer } from './pages';

const reducers = combineReducers({
  cartStore: cartReducer,
  transportStore: transportReducer,
  showcaseStore: showcaseReducer,
  catalogStore: catalogReducer,
  regionStore: regionReducer,
  pagesStore: pagesReducer,
});

export { reducers };
