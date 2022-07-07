import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectAppStore = createSelector(
  storeSelector,
  ({ cartStore }) => cartStore,
);

const selectCart = createSelector(selectAppStore, ({ cartItems }) => {
  const cartForSort = [...cartItems.data];
  const sortedCart = cartForSort.sort((prev, cur) => {
    return prev.ordinalId - cur.ordinalId;
  });
  return sortedCart;
});

const selectOrderTotal = createSelector(selectAppStore, ({ cartItems }) =>
  cartItems.data.reduce((total, item) => {
    if (item.is_service) {
      return total;
    }

    return item.count * item.price + total;
  }, 0),
);

const selectPaymentMethods = createSelector(
  selectAppStore,
  ({ paymentMethods }) => paymentMethods.data,
);

const selectStatus = createSelector(
  selectAppStore,
  ({ paymentStatus }) => paymentStatus,
);

const selectCreateOrderingStatus = createSelector(
  selectAppStore,
  ({ createOrderingStatus }) => createOrderingStatus,
);

export {
  selectCart,
  selectOrderTotal,
  selectPaymentMethods,
  selectStatus,
  selectCreateOrderingStatus,
};
