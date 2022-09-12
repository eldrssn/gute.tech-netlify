import { createAction } from '@reduxjs/toolkit';

import {
  refreshToken,
  postLogin,
  postRegistration,
  postRegistrationVerify,
  postRegistrationVerifyRetry,
  postResetPasswordRequest,
  postResetPasswordVerify,
  putResetPassword,
  getUnauthorizationToken,
} from 'api/routes/authentication';
import {
  RefreshTokenRequestData,
  LoginRequestData,
  RegisterRequestData,
  RegisterVerifyRequestData,
  RegisterVerifyRetryRequestData,
  LoginResponseData,
  RefreshTokenResponseData,
  RegisterResponseData,
  RegisterVerifyResponseData,
  ResetPasswordRequestData,
  ResetPasswordResponseData,
  ResetPasswordVerifyRequestData,
  ResetPasswordVerifyResponseData,
  ResetPasswordSetRequestData,
  ResetPasswordSetResponseData,
  UnauthorizationTokenResponseData,
} from 'api/models/authentication';
import { createAsyncAction } from 'utility/helpers/store';
import { ActiveAutorizationFormKey, CookieKey } from 'constants/types';

import { setCookie } from 'utility/helpers';

const resetAllError = createAction('authentication/resetAllError');
const resetAllField = createAction('authentication/resetAllField');
const setActiveAuthorizationForm = createAction<ActiveAutorizationFormKey>(
  'authentication/setActiveAuthorizationForm',
);
const setNotAuthorizationToken = createAction<string>(
  'authentication/setNotAuthorizationToken',
);

const fetchAccessToken = createAsyncAction<
  RefreshTokenResponseData,
  RefreshTokenRequestData
>({
  typeAction: 'authentication/fetchAccessToken',
  request: refreshToken,
  onFulfilled: (data: RefreshTokenResponseData) => {
    setCookie(CookieKey.ACCESS_TOKEN, data.access);
  },
});

const fetchUnauthorizationToken =
  createAsyncAction<UnauthorizationTokenResponseData>({
    typeAction: 'authentication/fetchUnauthorizationToken',
    request: getUnauthorizationToken,
  });

const fetchTokens = createAsyncAction<LoginResponseData, LoginRequestData>({
  typeAction: 'authentication/fetchTokens',
  request: postLogin,
  shouldHandleError: true,
  onFulfilled: (data: LoginResponseData) => {
    setCookie(CookieKey.ACCESS_TOKEN, data.access);
    setCookie(CookieKey.REFRESH_TOKEN, data.refresh);
  },
});

const fetchRegister = createAsyncAction<
  RegisterResponseData,
  RegisterRequestData
>({
  typeAction: 'authentication/fetchRegister',
  request: postRegistration,
  shouldHandleError: true,
  shouldReturnRequestData: true,
});

const fetchRegisterVerification = createAsyncAction<
  RegisterVerifyResponseData,
  RegisterVerifyRequestData
>({
  typeAction: 'authentication/fetchRegisterVerification',
  request: postRegistrationVerify,
  shouldHandleError: true,
});

const fetchRegisterVerificationRetry = createAsyncAction<
  RegisterVerifyResponseData,
  RegisterVerifyRetryRequestData
>({
  typeAction: 'authentication/fetchRegisterVerificationRetry',
  request: postRegistrationVerifyRetry,
  shouldHandleError: true,
});

const fetchResetPassword = createAsyncAction<
  ResetPasswordResponseData,
  ResetPasswordRequestData
>({
  typeAction: 'authentication/fetchResetPassword',
  request: postResetPasswordRequest,
  shouldHandleError: true,
  shouldReturnRequestData: true,
});

const fetchResetPasswordVerification = createAsyncAction<
  ResetPasswordVerifyResponseData,
  ResetPasswordVerifyRequestData
>({
  typeAction: 'authentication/fetchResetPasswordVerification',
  request: postResetPasswordVerify,
  shouldHandleError: true,
  shouldReturnRequestData: true,
});

const fetchResetPasswordSet = createAsyncAction<
  ResetPasswordSetResponseData,
  ResetPasswordSetRequestData
>({
  typeAction: 'authentication/fetchResetPasswordSet',
  request: putResetPassword,
  shouldHandleError: true,
});

export {
  fetchUnauthorizationToken,
  fetchAccessToken,
  fetchTokens,
  fetchRegister,
  fetchRegisterVerification,
  fetchRegisterVerificationRetry,
  fetchResetPassword,
  fetchResetPasswordVerification,
  fetchResetPasswordSet,
  resetAllError,
  resetAllField,
  setActiveAuthorizationForm,
  setNotAuthorizationToken,
};
