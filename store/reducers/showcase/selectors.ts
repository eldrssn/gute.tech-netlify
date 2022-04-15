import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectShowcaseStore = createSelector(
  storeSelector,
  ({ showcaseStore }) => showcaseStore,
);

const selectShowcase = createSelector(
  selectShowcaseStore,
  ({ showcase }) => showcase,
);

export { selectShowcase };
