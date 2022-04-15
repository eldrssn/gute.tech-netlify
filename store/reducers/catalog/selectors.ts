import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectCatalogStore = createSelector(
  storeSelector,
  ({ catalogStore }) => catalogStore,
);

const selectCategoriesProductRead = createSelector(
  selectCatalogStore,
  ({ categoriesProductRead }) => categoriesProductRead,
);

export { selectCategoriesProductRead };
