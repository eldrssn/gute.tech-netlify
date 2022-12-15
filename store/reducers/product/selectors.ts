import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectCatalogStore = createSelector(
  storeSelector,
  ({ productStore }) => productStore,
);

const selectCategoriesProductRead = createSelector(
  selectCatalogStore,
  ({ productRead }) => productRead,
);

const selectRecommendedProductsList = createSelector(
  selectCatalogStore,
  ({ productsListRecommended }) => productsListRecommended,
);

const selectProductBrandsList = createSelector(
  selectCatalogStore,
  ({ productBrandsList }) => productBrandsList,
);

const selectProductModelsList = createSelector(
  selectCatalogStore,
  ({ productModelsList }) => productModelsList,
);

const selectProductYearsList = createSelector(
  selectCatalogStore,
  ({ productYearsList }) => productYearsList,
);

const selectProductTransportsList = createSelector(
  selectCatalogStore,
  ({ productTransportList }) => productTransportList,
);

const selectProductAnaloguesList = createSelector(
  selectCatalogStore,
  ({ productAnaloguesList }) => productAnaloguesList,
);

const selectProductReviewsList = createSelector(
  selectCatalogStore,
  ({ productReviewsList }) => productReviewsList,
);

const selectInstallationPriceState = createSelector(
  selectCatalogStore,
  ({ productInstallationPrice }) => productInstallationPrice,
);

export {
  selectCategoriesProductRead,
  selectRecommendedProductsList,
  selectProductBrandsList,
  selectProductModelsList,
  selectProductYearsList,
  selectProductTransportsList,
  selectProductAnaloguesList,
  selectProductReviewsList,
  selectInstallationPriceState,
};
