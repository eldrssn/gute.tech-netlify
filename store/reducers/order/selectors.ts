import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectOrderStore = createSelector(
  storeSelector,
  ({ orderStore }) => orderStore,
);

const selectOrder = createSelector(selectOrderStore, ({ orderItems }) => {
  const arrayForSort = [...orderItems.data];
  const sortedOrder = arrayForSort.sort((prev, cur) => {
    return prev.ordinalId - cur.ordinalId;
  });
  return sortedOrder;
});

const selectOrderItemsSlugs = createSelector(
  selectOrderStore,
  ({ orderItemsSlugs }) => orderItemsSlugs,
);

const selectOrderTotal = createSelector(selectOrderStore, ({ orderItems }) =>
  orderItems.data.reduce((total, item) => {
    if (item.is_service) {
      return total;
    }

    return item.count * item.price + total;
  }, 0),
);

const selectOrderLoading = createSelector(
  selectOrderStore,
  ({ orderItems }) => orderItems.isLoading,
);

export {
  selectOrderTotal,
  selectOrder,
  selectOrderLoading,
  selectOrderItemsSlugs,
};
