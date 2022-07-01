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

export { selectUserProfile };
