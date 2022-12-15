import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectTransportStore = createSelector(
  storeSelector,
  ({ transportStore }) => transportStore,
);

const selectBrands = createSelector(
  selectTransportStore,
  ({ brands }) => brands,
);

const selectModels = createSelector(
  selectTransportStore,
  ({ models }) => models,
);

const selectYears = createSelector(selectTransportStore, ({ years }) => years);

const selectEngines = createSelector(
  selectTransportStore,
  ({ engines }) => engines,
);

const selectTransportInfo = createSelector(
  selectTransportStore,
  ({ transportInfo }) => transportInfo,
);

const selectTransportId = createSelector(
  selectTransportStore,
  ({ transportId }) => transportId,
);

const selectTransportYear = createSelector(
  selectTransportStore,
  ({ transportYear }) => transportYear,
);

export {
  selectTransportStore,
  selectBrands,
  selectModels,
  selectYears,
  selectEngines,
  selectTransportInfo,
  selectTransportId,
  selectTransportYear,
};
