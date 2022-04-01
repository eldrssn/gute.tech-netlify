import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectContentStore = createSelector(
  storeSelector,
  ({ contentStore }) => contentStore,
);

const selectBrands = createSelector(
  selectContentStore,
  ({ brands }) => brands.data,
);

const selectModels = createSelector(selectContentStore, ({ models }) => models);

export { selectBrands, selectModels };
