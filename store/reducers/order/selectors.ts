import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectOrderStore = createSelector(
  storeSelector,
  ({ orderStore }) => orderStore,
);

const selectOrder = createSelector(selectOrderStore, ({ orderItems }) => {
  const sortedOrder = orderItems?.sort((prev, cur) => {
    return prev.ordinalId - cur.ordinalId;
  });
  return sortedOrder;
});

const selectOrderTotal = createSelector(selectOrderStore, ({ orderItems }) =>
  orderItems?.reduce((total, item) => {
    if (item.is_service) {
      return total;
    }

    return item.count * item.price + total;
  }, 0),
);

export { selectOrderTotal, selectOrder };
