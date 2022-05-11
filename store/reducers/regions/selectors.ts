import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectContentStore = createSelector(
  storeSelector,
  ({ regionStore }) => regionStore,
);

const selectRegions = createSelector(
  selectContentStore,
  ({ regions }) => regions,
);

const selectBranches = createSelector(
  selectContentStore,
  ({ branches }) => branches,
);

const selectCity = createSelector(
  selectContentStore,
  ({ selectedCity }) => selectedCity,
);

export { selectRegions, selectCity, selectBranches };
