import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectCatalogStore = createSelector(
  storeSelector,
  ({ catalogStore }) => catalogStore,
);

const selectCategoriesTreeList = createSelector(
  selectCatalogStore,
  ({ categoriesTreeList }) => categoriesTreeList,
);

const selectCategoriesList = createSelector(
  selectCatalogStore,
  ({ categoriesList }) => categoriesList,
);

const selectTransportReadCategories = createSelector(
  selectCatalogStore,
  ({ transportReadCategories }) => transportReadCategories,
);

const selectCategoriesSearchRead = createSelector(
  selectCatalogStore,
  ({ transportReadCategories }) => {
    const filterDataCategories = transportReadCategories.data.filter(
      (category) => category.found > 0,
    );
    const filterDataChildren = filterDataCategories.map((category) => {
      const { children, ...otherData } = category;
      const filterChildren = children?.filter((child) => child.found > 0);

      return { children: filterChildren, ...otherData };
    });

    return {
      data: filterDataChildren,
      isLoading: transportReadCategories.isLoading,
      error: transportReadCategories.error,
    };
  },
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

const selectCategoriesSubcategoriesRead = createSelector(
  selectCatalogStore,
  ({ categoriesSubcategoriesRead }) => {
    const filteredDataSubcategories = categoriesSubcategoriesRead.data.filter(
      (subcategory) => subcategory.found > 0,
    );

    return {
      data: filteredDataSubcategories,
      isLoading: categoriesSubcategoriesRead.isLoading,
      error: categoriesSubcategoriesRead.error,
    };
  },
);

const selectCatalogSearchRead = createSelector(
  selectCatalogStore,
  ({ catalogSearchRead }) => catalogSearchRead,
);

export {
  selectTransportReadCategories,
  selectCategoriesTreeList,
  selectCategoriesSubcategoriesList,
  selectCategoriesSubcategoriesRead,
  selectCatalogSearchRead,
  selectSearchProductList,
  selectCategoriesSearchRead,
  selectCategoriesProductList,
  selectCategoriesFilterList,
  selectTransportFilterList,
  selectCategoriesList,
};
