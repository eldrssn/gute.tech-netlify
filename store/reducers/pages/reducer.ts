import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { PageMenuItemData, PageData } from 'api/models/pages';
import { fetchPagesMenu, fetchPage } from './actions';
import { initialState } from './constants';

import { PagesStore, ErrorAction } from './types';

const handlers = {
  [fetchPagesMenu.pending.type]: (state: PagesStore) => {
    state.pagesmenu.isLoading = true;
  },
  [fetchPagesMenu.fulfilled.type]: (
    state: PagesStore,
    { payload }: PayloadAction<PageMenuItemData[]>,
  ) => {
    state.pagesmenu.data = payload;
    state.pagesmenu.isLoading = false;
    state.pagesmenu.error = null;
  },
  [fetchPagesMenu.rejected.type]: (
    state: PagesStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.pagesmenu.isLoading = false;
    state.pagesmenu.error = errorData;
  },

  [fetchPage.pending.type]: (state: PagesStore) => {
    state.page.isLoading = true;
  },
  [fetchPage.fulfilled.type]: (
    state: PagesStore,
    { payload }: PayloadAction<PageData>,
  ) => {
    state.page.data = payload;
    state.page.isLoading = false;
    state.page.error = null;
  },
  [fetchPage.rejected.type]: (state: PagesStore, { error }: ErrorAction) => {
    const errorData = { name: error.name, message: error.message };
    state.page.isLoading = false;
    state.page.error = errorData;
  },
};

const pagesReducer = createReducer(initialState, handlers);

export { pagesReducer };
