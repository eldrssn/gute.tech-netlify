import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { setAuthorizationWarning } from './actions';
import { initialState } from './constants';

import { ModalStore } from './types';

const handlers = {
  [setAuthorizationWarning.type]: (
    state: ModalStore,
    { payload }: PayloadAction<boolean>,
  ) => {
    state.showAuthorizationWarning = payload;
  },
};

const modalReducer = createReducer(initialState, handlers);

export { modalReducer };
