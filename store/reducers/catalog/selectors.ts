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

const selectCategoriesTreeList = createSelector(
  selectCatalogStore,
  ({ categoriesTreeList }) => categoriesTreeList.data,
);

const selectCategoriesProductList = createSelector(
  selectCatalogStore,
  ({ categoriesProductList }) => categoriesProductList,
);

const selectCategoriesFilterList = createSelector(
  selectCatalogStore,
  ({ categoriesFilterList }) => categoriesFilterList,
);

export {
  selectCategoriesProductRead,
  selectCategoriesTreeList,
  selectCategoriesProductList,
  selectCategoriesFilterList,
};
