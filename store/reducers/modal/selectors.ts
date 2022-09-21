import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectModalStore = createSelector(
  storeSelector,
  ({ modalStore }) => modalStore,
);

const selectShowAuthorizationWarning = createSelector(
  selectModalStore,
  ({ showAuthorizationWarning }) => showAuthorizationWarning,
);

export { selectShowAuthorizationWarning };
