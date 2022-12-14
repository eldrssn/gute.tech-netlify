import { ErrorAction, StoreState } from 'store/types';

import {
  LoginResponseErrorData,
  RegisterResponseErrorData,
  ResetPasswordResponseErrorData,
  RegisterVerifyResponseErrorData,
  ResetPasswordSetResponseErrorData,
  RegisterRequestData,
  RegisterResponseData,
  ResetPasswordRequestData,
  ResetPasswordResponseData,
  ResetPasswordVerifyRequestData,
  ResetPasswordVerifyResponseData,
} from 'api/models/authentication';
import { ActiveAutorizationFormKey } from 'constants/types';

enum AuthenticationStoreBlocks {
  AUTHORIZED = 'authorized',
  REGISTRATION_FORM = 'registrationForm',
  REGISTRATION_VERIFICATION_FORM = 'registrationVerificationForm',
  REGISTRATION_VERIFICATION_RETRY = 'registrationVerificationRetry',
  ACTIVE_AUTHORIZATION_FORM = 'activeAuthorizationForm',
  RESET_PASSWORD_FORM = 'resetPasswordForm',
  RESET_PASSWORD_VERIFICATION_FORM = 'resetPasswordVerificationForm',
  RESET_PASSWORD_SET_FORM = 'resetPasswordSetForm',
  NOT_AUTHORIZED_TOKEN = 'notAuthorizedToken',
}

type AuthorizedState = {
  isAuthorized: boolean;
  loadingAuthorized: boolean;
  errorAuthorized: LoginResponseErrorData | null;
};

type RegistrationFormState = {
  loadingRegistrationForm: boolean;
  phoneNumber: string;
  password: string;
  errorRegistrationForm: RegisterResponseErrorData | null;
};

type RegistrationVerificationFormState = {
  isRegistrationVerificationForm: boolean;
  loadingRegistrationVerificationForm: boolean;
  errorRegistrationVerificationForm: RegisterVerifyResponseErrorData | null;
};

type RegistrationVerificationRetryState = {
  loadingRegistrationVerificationRetry: boolean;
  errorRegistrationVerificationRetry: RegisterVerifyResponseErrorData | null;
};

type ResetPasswordFormState = {
  phoneNumber: string | null;
  loadingResetPasswordForm: boolean;
  errorResetPasswordForm: ResetPasswordResponseErrorData | null;
};

type ResetPasswordVerificationFormState = {
  phoneNumber: string | null;
  code: string | null;
  loadingResetPasswordVerificationForm: boolean;
  errorResetPasswordVerificationForm: ResetPasswordResponseErrorData | null;
};

type ResetPasswordSetFormState = {
  isResetPassword: boolean;
  loadingResetPasswordSetForm: boolean;
  errorResetPasswordSetForm: ResetPasswordSetResponseErrorData | null;
};

type ActiveAuthorizationFormState = ActiveAutorizationFormKey;

type RegisterPayloadData = {
  requestData: RegisterRequestData;
  data: RegisterResponseData;
};

type ResetPasswordPayloadData = {
  requestData: ResetPasswordRequestData;
  data: ResetPasswordResponseData;
};

type ResetPasswordVerificationPayloadData = {
  requestData: ResetPasswordVerifyRequestData;
  data: ResetPasswordVerifyResponseData;
};

type NotAuthorizedTokenState = {
  token: string;
} & StoreState;

type AuthenticationStore = {
  [AuthenticationStoreBlocks.AUTHORIZED]: AuthorizedState;
  [AuthenticationStoreBlocks.REGISTRATION_FORM]: RegistrationFormState;
  [AuthenticationStoreBlocks.REGISTRATION_VERIFICATION_FORM]: RegistrationVerificationFormState;
  [AuthenticationStoreBlocks.REGISTRATION_VERIFICATION_RETRY]: RegistrationVerificationRetryState;
  [AuthenticationStoreBlocks.ACTIVE_AUTHORIZATION_FORM]: ActiveAuthorizationFormState;
  [AuthenticationStoreBlocks.RESET_PASSWORD_FORM]: ResetPasswordFormState;
  [AuthenticationStoreBlocks.RESET_PASSWORD_VERIFICATION_FORM]: ResetPasswordVerificationFormState;
  [AuthenticationStoreBlocks.RESET_PASSWORD_SET_FORM]: ResetPasswordSetFormState;
  [AuthenticationStoreBlocks.NOT_AUTHORIZED_TOKEN]: NotAuthorizedTokenState;
};

export type {
  AuthenticationStore,
  ErrorAction,
  RegisterPayloadData,
  ResetPasswordPayloadData,
  ResetPasswordSetFormState,
  ResetPasswordVerificationPayloadData,
};
