import { configureStore } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';

import { reducers } from './reducers';

const makeStore = () =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: true,
      }),
    ],
  });

export const wrapper = createWrapper(makeStore, { debug: true });
