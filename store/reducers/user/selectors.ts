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

const selectEditionUserProfile = createSelector(
  selectUserStore,
  ({ editProfile }) => editProfile,
);

const selectVerifyEmail = createSelector(
  selectUserStore,
  ({ verifyEmail }) => verifyEmail,
);

const selectUserOrders = createSelector(
  selectUserStore,
  ({ orders }) => orders,
);

const selectUserOrder = createSelector(selectUserStore, ({ order }) => order);

const selectOrderTotal = createSelector(selectUserStore, ({ order }) =>
  order.data?.products.reduce((total, item) => {
    return Number(item.quantity * item.price) + total;
  }, 0),
);

export {
  selectUserProfile,
  selectUserOrders,
  selectUserOrder,
  selectEditionUserProfile,
  selectVerifyEmail,
  selectOrderTotal,
};
