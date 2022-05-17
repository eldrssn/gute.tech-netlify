import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

import { CategoryStoreRootCategory } from 'store/reducers/catalog/types';

import { State } from '../../types';

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

const selectRootCategories =
  (categoryStoreBlock: CategoryStoreRootCategory) => (state: State) =>
    categoryStoreBlock
      ? state.catalogStore[categoryStoreBlock]
      : state.catalogStore.categoriesTreeList;

const selectCategoriesSearchRead = createSelector(
  selectCatalogStore,
  ({ searchReadCategory }) => searchReadCategory.data,
);

const selectCategoriesProductList = createSelector(
  selectCatalogStore,
  ({ categoriesProductList }) => categoriesProductList,
);

const selectCategoriesFilterList = createSelector(
  selectCatalogStore,
  ({ categoriesFilterList }) => categoriesFilterList,
);

const selectCategoriesSubcategoriesList = createSelector(
  selectCatalogStore,
  ({ categoriesSubcategoriesList }) => categoriesSubcategoriesList,
);

export {
  selectCategoriesProductRead,
  selectCategoriesTreeList,
  selectCategoriesSubcategoriesList,
  selectRootCategories,
  selectCategoriesSearchRead,
  selectCategoriesProductList,
  selectCategoriesFilterList,
};
