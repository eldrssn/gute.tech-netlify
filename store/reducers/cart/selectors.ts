import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectCartStore = createSelector(
  storeSelector,
  ({ cartStore }) => cartStore,
);

const selectCart = createSelector(
  selectCartStore,
  ({ cartItems }) => cartItems.data,
);

const selectCartSavedItems = createSelector(
  selectCartStore,
  ({ cartSavedItems }) => cartSavedItems.data,
);

const selectCartTotal = createSelector(
  selectCartStore,
  ({ cartTotal }) => cartTotal,
);

const selectCartProductTotal = createSelector(
  selectCartStore,
  ({ cartProductCount }) => cartProductCount,
);

const selectCartLoading = createSelector(
  selectCartStore,
  ({ cartItems }) => cartItems.isLoading,
);

const selectCartSavedLoading = createSelector(
  selectCartStore,
  ({ cartSavedItems }) => cartSavedItems.isLoading,
);

const selectCartUpdated = createSelector(
  selectCartStore,
  ({ cartUpdated }) => cartUpdated,
);

const selectCartError = createSelector(
  selectCartStore,
  ({ cartItems }) => cartItems.error,
);

const selectCartSavedError = createSelector(
  selectCartStore,
  ({ cartSavedItems }) => cartSavedItems.error,
);

const selectCartCheckedItemsTotal = createSelector(
  selectCartStore,
  ({ cartItems }) => {
    const checkedItems = cartItems.data.reduce((prev, cur) => {
      if (cur.isChecked) {
        return prev + cur.price * cur.quantity;
      }

      return prev;
    }, 0);

    return checkedItems;
  },
);

export {
  selectCartCheckedItemsTotal,
  selectCartSavedItems,
  selectCartProductTotal,
  selectCartLoading,
  selectCartSavedLoading,
  selectCartUpdated,
  selectCartTotal,
  selectCart,
  selectCartError,
  selectCartSavedError,
};
