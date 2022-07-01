import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { ProfileResponseData } from 'api/models/user';
import { fetchProfile } from './actions';
import { initialState } from './constants';

import { UserStore, ErrorAction } from './types';

const handlers = {
  [fetchProfile.pending.type]: (state: UserStore) => {
    state.profile.isLoading = true;
  },
  [fetchProfile.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<ProfileResponseData>,
  ) => {
    state.profile.data = payload;
    state.profile.isLoading = false;
    state.profile.error = null;
  },
  [fetchProfile.rejected.type]: (state: UserStore, { error }: ErrorAction) => {
    const errorData = { name: error.name, message: error.message };
    state.profile.isLoading = false;
    state.profile.error = errorData;
  },
};

const userReducer = createReducer(initialState, handlers);

export { userReducer };
