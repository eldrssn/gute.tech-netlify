import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectPageStore = createSelector(
  storeSelector,
  ({ pagesStore }) => pagesStore,
);

const selectPagesMenu = createSelector(
  selectPageStore,
  ({ pagesmenu }) => pagesmenu,
);

const selectPage = createSelector(selectPageStore, ({ page }) => page);

export { selectPagesMenu, selectPage };
