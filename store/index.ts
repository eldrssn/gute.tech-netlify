import { configureStore } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';

import { reducers } from './reducers';

const makeStore = () =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => [
      thunkMiddleware,
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: true,
      }),
    ],
  });

export const wrapper = createWrapper(makeStore, { debug: true });
