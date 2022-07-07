import { ErrorAction } from 'store/types';

import {
  LoginResponseErrorData,
  RegisterResponseErrorData,
  RegisterVerifyResponseErrorData,
} from 'api/models/authentication';
import { ActiveAutorizationFormKey } from 'constants/types';

enum AuthenticationStoreBlocks {
  AUTHORIZED = 'authorized',
  REGISTRATION_FORM = 'registrationForm',
  REGISTRATION_VERIFICATION_FORM = 'registrationVerificationForm',
  REGISTRATION_VERIFICATION_RETRY = 'registrationVerificationRetry',
  ACTIVE_AUTHORIZATION_FORM = 'activeAuthorizationForm',
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
  isRegistrationVerificationRetry: boolean;
  loadingRegistrationVerificationRetry: boolean;
  errorRegistrationVerificationRetry: RegisterVerifyResponseErrorData | null;
};

type ActiveAuthorizationFormState = ActiveAutorizationFormKey;

type RegisterPayloadData = { phoneNumber: string; password: string };

type AuthenticationStore = {
  [AuthenticationStoreBlocks.AUTHORIZED]: AuthorizedState;
  [AuthenticationStoreBlocks.REGISTRATION_FORM]: RegistrationFormState;
  [AuthenticationStoreBlocks.REGISTRATION_VERIFICATION_FORM]: RegistrationVerificationFormState;
  [AuthenticationStoreBlocks.REGISTRATION_VERIFICATION_RETRY]: RegistrationVerificationRetryState;
  [AuthenticationStoreBlocks.ACTIVE_AUTHORIZATION_FORM]: ActiveAuthorizationFormState;
};

export type { AuthenticationStore, ErrorAction, RegisterPayloadData };
