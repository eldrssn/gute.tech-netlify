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
    isRegistrationVerificationRetry: false,
    loadingRegistrationVerificationRetry: false,
    errorRegistrationVerificationRetry: null,
  },
  activeAuthorizationForm: ActiveAutorizationFormKey.AUTHORIZATION,
};

export { initialState };
