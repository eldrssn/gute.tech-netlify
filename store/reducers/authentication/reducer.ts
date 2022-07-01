import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  LoginResponseErrorData,
  RegisterResponseErrorData,
  RegisterVerifyResponseErrorData,
} from 'api/models/authentication';
import { ActiveAutorizationFormKey } from 'constants/types';

import { initialState } from './constants';
import { logOut } from './exceptionAction';
import {
  fetchAccessToken,
  fetchTokens,
  fetchRegister,
  fetchRegisterVerification,
  fetchRegisterVerificationRetry,
  resetAllError,
  resetAllField,
  setActiveAuthorizationForm,
} from './actions';
import { AuthenticationStore } from './types';

const handlers = {
  [logOut.type]: (state: AuthenticationStore) => {
    state.authorized.loadingAuthorized = false;
    state.authorized.isAuthorized = false;
    state.authorized.errorAuthorized = null;
  },
  [resetAllError.type]: (state: AuthenticationStore) => {
    state.authorized.errorAuthorized = null;
    state.registrationForm.errorRegistrationForm = null;
    state.registrationVerificationForm.errorRegistrationVerificationForm = null;
  },
  [resetAllField.type]: (state: AuthenticationStore) => {
    state.authorized.loadingAuthorized = false;
    state.authorized.errorAuthorized = null;
    state.registrationForm.loadingRegistrationForm = false;
    state.registrationForm.errorRegistrationForm = null;
    state.registrationVerificationForm.isRegistrationVerificationForm = false;
    state.registrationVerificationForm.loadingRegistrationVerificationForm =
      false;
    state.registrationVerificationForm.errorRegistrationVerificationForm = null;
    state.registrationVerificationRetry.isRegistrationVerificationRetry = false;
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      false;
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      null;
  },
  [setActiveAuthorizationForm.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ActiveAutorizationFormKey>,
  ) => {
    state.activeAuthorizationForm = payload;
  },

  [fetchAccessToken.pending.type]: (state: AuthenticationStore) => {
    state.authorized.loadingAuthorized = true;
  },
  [fetchAccessToken.fulfilled.type]: (state: AuthenticationStore) => {
    state.authorized.isAuthorized = true;
    state.authorized.loadingAuthorized = false;
  },
  [fetchAccessToken.rejected.type]: (state: AuthenticationStore) => {
    state.authorized.isAuthorized = false;
    state.authorized.loadingAuthorized = false;
  },

  [fetchTokens.pending.type]: (state: AuthenticationStore) => {
    state.authorized.loadingAuthorized = true;
    state.authorized.errorAuthorized = null;
  },
  [fetchTokens.fulfilled.type]: (state: AuthenticationStore) => {
    state.authorized.isAuthorized = true;
    state.authorized.loadingAuthorized = false;
    state.authorized.errorAuthorized = null;
  },
  [fetchTokens.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<LoginResponseErrorData>,
  ) => {
    state.authorized.errorAuthorized = payload;
    state.authorized.isAuthorized = false;
    state.authorized.loadingAuthorized = false;
  },

  [fetchRegister.pending.type]: (state: AuthenticationStore) => {
    state.registrationForm.loadingRegistrationForm = true;
    state.registrationForm.errorRegistrationForm = null;
  },
  //TODO: вынести
  [fetchRegister.fulfilled.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<{ phoneNumber: string; password: string }>,
  ) => {
    state.registrationForm.phoneNumber = payload.phoneNumber;
    state.registrationForm.password = payload.password;
    state.registrationForm.loadingRegistrationForm = false;
    state.registrationForm.errorRegistrationForm = null;
    state.activeAuthorizationForm =
      ActiveAutorizationFormKey.REGISTRATION_VERIFICATION;
  },
  [fetchRegister.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<RegisterResponseErrorData>,
  ) => {
    state.registrationForm.errorRegistrationForm = payload;
    state.registrationForm.loadingRegistrationForm = false;
  },

  [fetchRegisterVerification.pending.type]: (state: AuthenticationStore) => {
    state.registrationVerificationForm.loadingRegistrationVerificationForm =
      true;
    state.registrationVerificationForm.errorRegistrationVerificationForm = null;
  },
  [fetchRegisterVerification.fulfilled.type]: (state: AuthenticationStore) => {
    state.registrationVerificationForm.isRegistrationVerificationForm = true;
    state.registrationVerificationForm.loadingRegistrationVerificationForm =
      false;
    state.registrationVerificationForm.errorRegistrationVerificationForm = null;
  },
  [fetchRegisterVerification.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<RegisterVerifyResponseErrorData>,
  ) => {
    state.registrationVerificationForm.isRegistrationVerificationForm = false;
    state.registrationVerificationForm.errorRegistrationVerificationForm =
      payload;
    state.registrationVerificationForm.loadingRegistrationVerificationForm =
      false;
  },

  [fetchRegisterVerificationRetry.pending.type]: (
    state: AuthenticationStore,
  ) => {
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      true;
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      null;
  },
  [fetchRegisterVerificationRetry.fulfilled.type]: (
    state: AuthenticationStore,
  ) => {
    state.registrationVerificationRetry.isRegistrationVerificationRetry = true;
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      false;
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      null;
  },
  [fetchRegisterVerificationRetry.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<RegisterVerifyResponseErrorData>,
  ) => {
    state.registrationVerificationRetry.isRegistrationVerificationRetry = false;
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      payload;
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      false;
  },
};

const authenticationReducer = createReducer(initialState, handlers);

export { authenticationReducer };
