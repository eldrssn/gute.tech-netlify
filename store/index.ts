import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';

import { reducers } from './reducers';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => [
    thunkMiddleware,
    ...getDefaultMiddleware({
      immutableCheck: false,
      listenerMiddleware: true,
      serializableCheck: true,
    }),
  ],
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });
