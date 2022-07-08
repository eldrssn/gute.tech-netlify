import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectUserStore = createSelector(
  storeSelector,
  ({ userStore }) => userStore,
);

const selectUserProfile = createSelector(
  selectUserStore,
  ({ profile }) => profile,
);

const selectUserOrders = createSelector(
  selectUserStore,
  ({ orders }) => orders,
);

const selectUserOrder = createSelector(selectUserStore, ({ order }) => order);

export { selectUserProfile, selectUserOrders, selectUserOrder };
