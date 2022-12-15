import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
  LoginResponseErrorData,
  RegisterResponseErrorData,
  RegisterVerifyResponseErrorData,
  ResetPasswordResponseErrorData,
  ResetPasswordSetResponseErrorData,
  UnauthorizationTokenResponseData,
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
  fetchResetPassword,
  fetchResetPasswordVerification,
  fetchResetPasswordSet,
  fetchUnauthorizationToken,
  resetAllError,
  resetAllField,
  setActiveAuthorizationForm,
  setNotAuthorizationToken,
} from './actions';
import {
  AuthenticationStore,
  RegisterPayloadData,
  ResetPasswordPayloadData,
  ResetPasswordVerificationPayloadData,
  ErrorAction,
} from './types';

const handlers = {
  [HYDRATE]: (state: AuthenticationStore, action: AnyAction) => {
    state.authorized = action.payload.authenticationStore.authorized;
  },

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
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      false;
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      null;
    state.resetPasswordForm.phoneNumber = null;
    state.resetPasswordForm.loadingResetPasswordForm = false;
    state.resetPasswordForm.errorResetPasswordForm = null;
    state.resetPasswordVerificationForm.code = null;
    state.resetPasswordVerificationForm.phoneNumber = null;
    state.resetPasswordVerificationForm.errorResetPasswordVerificationForm =
      null;
    state.resetPasswordVerificationForm.loadingResetPasswordVerificationForm =
      false;
    state.resetPasswordSetForm.isResetPassword = false;
    state.resetPasswordSetForm.errorResetPasswordSetForm = null;
    state.resetPasswordSetForm.loadingResetPasswordSetForm = false;
  },
  [setActiveAuthorizationForm.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ActiveAutorizationFormKey>,
  ) => {
    state.activeAuthorizationForm = payload;
  },
  [setNotAuthorizationToken.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<string>,
  ) => {
    state.notAuthorizedToken.token = payload;
  },

  [fetchUnauthorizationToken.pending.type]: (state: AuthenticationStore) => {
    state.notAuthorizedToken.isLoading = true;
    state.notAuthorizedToken.error = null;
  },
  [fetchUnauthorizationToken.fulfilled.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<UnauthorizationTokenResponseData>,
  ) => {
    state.notAuthorizedToken.token = payload.token;
    state.notAuthorizedToken.isLoading = false;
  },
  [fetchUnauthorizationToken.rejected.type]: (
    state: AuthenticationStore,
    { error }: ErrorAction,
  ) => {
    state.notAuthorizedToken.isLoading = false;
    state.notAuthorizedToken.error = error;
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
  [fetchRegister.fulfilled.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<RegisterPayloadData>,
  ) => {
    state.registrationForm.phoneNumber = payload.requestData.phoneNumber;
    state.registrationForm.password = payload.requestData.password;
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
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      false;
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      null;
  },
  [fetchRegisterVerificationRetry.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<RegisterVerifyResponseErrorData>,
  ) => {
    state.registrationVerificationRetry.errorRegistrationVerificationRetry =
      payload;
    state.registrationVerificationRetry.loadingRegistrationVerificationRetry =
      false;
  },

  [fetchResetPassword.pending.type]: (state: AuthenticationStore) => {
    state.resetPasswordForm.loadingResetPasswordForm = true;
    state.resetPasswordForm.errorResetPasswordForm = null;
  },
  [fetchResetPassword.fulfilled.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ResetPasswordPayloadData>,
  ) => {
    state.resetPasswordForm.phoneNumber = payload.requestData.phone_number;
    state.resetPasswordForm.loadingResetPasswordForm = false;
    state.resetPasswordForm.errorResetPasswordForm = null;
    state.activeAuthorizationForm =
      ActiveAutorizationFormKey.RESET_PASSWORD_VERIFY;
  },
  [fetchResetPassword.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ResetPasswordResponseErrorData>,
  ) => {
    state.resetPasswordForm.errorResetPasswordForm = payload;
    state.resetPasswordForm.loadingResetPasswordForm = false;
  },

  [fetchResetPasswordVerification.pending.type]: (
    state: AuthenticationStore,
  ) => {
    state.resetPasswordVerificationForm.loadingResetPasswordVerificationForm =
      true;
    state.resetPasswordVerificationForm.errorResetPasswordVerificationForm =
      null;
  },
  [fetchResetPasswordVerification.fulfilled.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ResetPasswordVerificationPayloadData>,
  ) => {
    state.resetPasswordVerificationForm.phoneNumber =
      payload.requestData.phone_number;
    state.resetPasswordVerificationForm.code = payload.data.secret_key;
    state.resetPasswordVerificationForm.loadingResetPasswordVerificationForm =
      false;
    state.resetPasswordVerificationForm.errorResetPasswordVerificationForm =
      null;
    state.activeAuthorizationForm =
      ActiveAutorizationFormKey.RESET_PASSWORD_SET;
  },
  [fetchResetPasswordVerification.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ResetPasswordResponseErrorData>,
  ) => {
    state.resetPasswordVerificationForm.errorResetPasswordVerificationForm =
      payload;
    state.resetPasswordVerificationForm.loadingResetPasswordVerificationForm =
      false;
  },

  [fetchResetPasswordSet.pending.type]: (state: AuthenticationStore) => {
    state.resetPasswordSetForm.loadingResetPasswordSetForm = true;
    state.resetPasswordSetForm.errorResetPasswordSetForm = null;
  },
  [fetchResetPasswordSet.fulfilled.type]: (state: AuthenticationStore) => {
    state.resetPasswordSetForm.loadingResetPasswordSetForm = false;
    state.resetPasswordSetForm.errorResetPasswordSetForm = null;
    state.resetPasswordSetForm.isResetPassword = true;
    state.activeAuthorizationForm =
      ActiveAutorizationFormKey.RESET_PASSWORD_SUCCESS;
  },
  [fetchResetPasswordSet.rejected.type]: (
    state: AuthenticationStore,
    { payload }: PayloadAction<ResetPasswordSetResponseErrorData>,
  ) => {
    state.resetPasswordSetForm.errorResetPasswordSetForm = payload;
    state.resetPasswordSetForm.loadingResetPasswordSetForm = false;
    state.resetPasswordSetForm.isResetPassword = false;
  },
};

const authenticationReducer = createReducer(initialState, handlers);

export { authenticationReducer };
