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
  ({ categoriesTreeList }) => categoriesTreeList,
);

const selectCategoriesSearchRead = createSelector(
  selectCatalogStore,
  ({ transportReadCategories }) => transportReadCategories,
);

const selectCategoriesProductList = createSelector(
  selectCatalogStore,
  ({ categoriesProductList }) => categoriesProductList,
);

const selectTransportFilterList = createSelector(
  selectCatalogStore,
  ({ transportFilterList }) => transportFilterList,
);

const selectSearchProductList = createSelector(
  selectCatalogStore,
  ({ transportProductList }) => transportProductList,
);

const selectCategoriesFilterList = createSelector(
  selectCatalogStore,
  ({ categoriesFilterList }) => categoriesFilterList,
);

const selectCategoriesSubcategoriesList = createSelector(
  selectCatalogStore,
  ({ categoriesSubcategoriesList }) => categoriesSubcategoriesList,
);

const selectCatalogSearchRead = createSelector(
  selectCatalogStore,
  ({ catalogSearchRead }) => catalogSearchRead,
);

export {
  selectCategoriesProductRead,
  selectCategoriesTreeList,
  selectCategoriesSubcategoriesList,
  selectCatalogSearchRead,
  selectSearchProductList,
  selectCategoriesSearchRead,
  selectCategoriesProductList,
  selectCategoriesFilterList,
  selectTransportFilterList,
};
