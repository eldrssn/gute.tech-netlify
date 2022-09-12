import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectOrderStore = createSelector(
  storeSelector,
  ({ orderStore }) => orderStore,
);

const selectOrder = createSelector(
  selectOrderStore,
  ({ orderItems }) => orderItems.data,
);

const selectOrderTotal = createSelector(selectOrderStore, ({ orderItems }) =>
  orderItems.data.reduce((total, item) => {
    if (item.is_service) {
      return total;
    }

    return item.quantity * item.price + total;
  }, 0),
);

const selectOrderLoading = createSelector(
  selectOrderStore,
  ({ orderItems }) => orderItems.isLoading,
);

export { selectOrderTotal, selectOrder, selectOrderLoading };
