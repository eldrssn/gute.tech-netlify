import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { transportReducer } from './transport';
import { showcaseReducer } from './showcase';
import { catalogReducer } from './catalog';
import { regionReducer } from './regions';
import { pagesReducer } from './pages';
import { userReducer } from './user';
import { authenticationReducer } from './authentication';
import { orderReducer } from './order';
import { paymentReducer } from './payment';
import { modalReducer } from './modal';
import { productReducer } from './product';

const reducers = combineReducers({
  cartStore: cartReducer,
  transportStore: transportReducer,
  showcaseStore: showcaseReducer,
  catalogStore: catalogReducer,
  productStore: productReducer,
  regionStore: regionReducer,
  pagesStore: pagesReducer,
  userStore: userReducer,
  authenticationStore: authenticationReducer,
  orderStore: orderReducer,
  paymentStore: paymentReducer,
  modalStore: modalReducer,
});

export { reducers };
