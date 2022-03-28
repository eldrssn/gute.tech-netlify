import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectCartStore = createSelector(
  storeSelector,
  ({ cartStore }) => cartStore,
);

const selectCart = createSelector(selectCartStore, ({ data }) => data);
const selectOrderTotal = createSelector(selectCartStore, ({ data }) =>
  data.reduce((total, item) => item.count * item.price + total, 0),
);

export { selectCart, selectOrderTotal };
