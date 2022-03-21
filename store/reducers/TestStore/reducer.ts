import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { fetchData, resetData } from './actions';

import { TestStore, TestData, ErrorAction } from './types';

const initialState: TestStore = {
  test: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const handlers = {
  [fetchData.pending.type]: (state: TestStore) => {
    state.test.isLoading = true;
  },
  [fetchData.fulfilled.type]: (
    state: TestStore,
    { payload }: PayloadAction<TestData>,
  ) => {
    state.test.data = payload;
    state.test.isLoading = false;
    state.test.error = null;
  },
  [fetchData.rejected.type]: (state: TestStore, { error }: ErrorAction) => {
    const errorData = { name: error.name, message: error.message };
    state.test.isLoading = false;
    state.test.error = errorData;
  },

  [resetData.type]: (state: TestStore) => {
    state.test.data = null;
  },
};

const reducer = createReducer(initialState, handlers);

export default reducer;
