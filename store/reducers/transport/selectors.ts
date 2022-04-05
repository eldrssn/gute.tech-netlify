import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectContentStore = createSelector(
  storeSelector,
  ({ transportStore }) => transportStore,
);

const selectBrands = createSelector(selectContentStore, ({ brands }) => brands);

const selectModels = createSelector(selectContentStore, ({ models }) => models);

const selectYears = createSelector(selectContentStore, ({ years }) => years);

const selectEngines = createSelector(
  selectContentStore,
  ({ engines }) => engines,
);

export { selectBrands, selectModels, selectYears, selectEngines };
