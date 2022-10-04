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

const selectMetrics = createSelector(
  selectShowcaseStore,
  ({ showcase }) => showcase.data.metrics,
);

const selectShowcaseData = createSelector(selectShowcase, ({ data }) => data);

export { selectShowcase, selectShowcaseData, selectMetrics };
