import { ActiveAutorizationFormKey } from 'constants/types';

import { AuthenticationStore } from './types';

const initialState: AuthenticationStore = {
  authorized: {
    isAuthorized: false,
    loadingAuthorized: false,
    errorAuthorized: null,
  },
  registrationForm: {
    loadingRegistrationForm: false,
    errorRegistrationForm: null,
    phoneNumber: '',
    password: '',
  },
  registrationVerificationForm: {
    isRegistrationVerificationForm: false,
    loadingRegistrationVerificationForm: false,
    errorRegistrationVerificationForm: null,
  },
  registrationVerificationRetry: {
    loadingRegistrationVerificationRetry: false,
    errorRegistrationVerificationRetry: null,
  },
  resetPasswordForm: {
    loadingResetPasswordForm: false,
    errorResetPasswordForm: null,
    phoneNumber: null,
  },
  resetPasswordVerificationForm: {
    phoneNumber: null,
    code: null,
    errorResetPasswordVerificationForm: null,
    loadingResetPasswordVerificationForm: false,
  },
  resetPasswordSetForm: {
    isResetPassword: false,
    loadingResetPasswordSetForm: false,
    errorResetPasswordSetForm: null,
  },
  notAuthorizedToken: {
    token: '',
    isLoading: false,
    error: null,
  },
  activeAuthorizationForm: ActiveAutorizationFormKey.AUTHORIZATION,
};

export { initialState };
