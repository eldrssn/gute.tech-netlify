import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectAppStore = createSelector(
  storeSelector,
  ({ paymentStore }) => paymentStore,
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

export { selectPaymentMethods, selectStatus, selectCreateOrderingStatus };
