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

const selectSelectedCitySlug = createSelector(
  selectContentStore,
  ({ selectedCitySlug }) => selectedCitySlug,
);

export { selectRegions, selectSelectedCitySlug, selectBranches };
