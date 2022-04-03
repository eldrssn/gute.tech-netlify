import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectContentStore = createSelector(
  storeSelector,
  ({ transportStore }) => transportStore,
);

const selectBrands = createSelector(
  selectContentStore,
  ({ brands }) => brands.data,
);

const selectModels = createSelector(
  selectContentStore,
  ({ models }) => models.data,
);

const selectYears = createSelector(
  selectContentStore,
  ({ years }) => years.data,
);

const selectEngines = createSelector(
  selectContentStore,
  ({ engines }) => engines.data,
);

export { selectBrands, selectModels, selectYears, selectEngines };
