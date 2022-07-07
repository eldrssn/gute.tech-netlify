import { createAction } from '@reduxjs/toolkit';

import {
  refreshToken,
  postLogin,
  postRegistration,
  postRegistrationVerify,
  postRegistrationVerifyRetry,
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
} from 'api/models/authentication';
import { createAsyncAction } from 'utility/helpers/store';
import { ActiveAutorizationFormKey, CookieKey } from 'constants/types';

import { setCookie } from 'utility/helpers';

const resetAllError = createAction('authentication/resetAllError');
const resetAllField = createAction('authentication/resetAllField');
const setActiveAuthorizationForm = createAction<ActiveAutorizationFormKey>(
  'authentication/setActiveAuthorizationForm',
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

export {
  fetchAccessToken,
  fetchTokens,
  fetchRegister,
  fetchRegisterVerification,
  fetchRegisterVerificationRetry,
  resetAllError,
  resetAllField,
  setActiveAuthorizationForm,
};
