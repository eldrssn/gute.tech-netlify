import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectAppStore = createSelector(
  storeSelector,
  ({ cartReducer }) => cartReducer,
);

const selectCart = createSelector(selectAppStore, ({ data }) => data);
const selectOrderTotal = createSelector(selectAppStore, ({ data }) =>
  data.reduce((total, item) => item.count * item.price + total, 0),
);

export { selectCart, selectOrderTotal };
