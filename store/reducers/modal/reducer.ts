import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { setAuthorizationWarning } from './actions';
import { initialState } from './constants';

import { ModalStore } from './types';

const handlers = {
  [HYDRATE]: (state: ModalStore, action: AnyAction) => {
    state.showAuthorizationWarning =
      action.payload.modalStore.showAuthorizationWarning;
  },

  [setAuthorizationWarning.type]: (
    state: ModalStore,
    { payload }: PayloadAction<boolean>,
  ) => {
    state.showAuthorizationWarning = payload;
  },
};

const modalReducer = createReducer(initialState, handlers);

export { modalReducer };
