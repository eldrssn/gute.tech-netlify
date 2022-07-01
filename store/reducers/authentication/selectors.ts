import { createSelector } from '@reduxjs/toolkit';

import storeSelector from 'store/storeSelector';

const selectAuthenticationStore = createSelector(
  storeSelector,
  ({ authenticationStore }) => authenticationStore,
);

const selectIsAuthorized = createSelector(
  selectAuthenticationStore,
  ({ authorized }) => authorized.isAuthorized,
);

const selectLoadingAuthorized = createSelector(
  selectAuthenticationStore,
  ({ authorized }) => authorized.loadingAuthorized,
);

const selectAuthorizationError = createSelector(
  selectAuthenticationStore,
  ({ authorized }) => authorized.errorAuthorized,
);

const selectLoadingRegistrationForm = createSelector(
  selectAuthenticationStore,
  ({ registrationForm }) => registrationForm.loadingRegistrationForm,
);

const selectErrorRegistrationForm = createSelector(
  selectAuthenticationStore,
  ({ registrationForm }) => registrationForm.errorRegistrationForm,
);

const selectRegistrationPhoneNumber = createSelector(
  selectAuthenticationStore,
  ({ registrationForm }) => registrationForm.phoneNumber,
);

const selectRegistrationPassword = createSelector(
  selectAuthenticationStore,
  ({ registrationForm }) => registrationForm.password,
);

const selectIsRegistrationVerificationForm = createSelector(
  selectAuthenticationStore,
  ({ registrationVerificationForm }) =>
    registrationVerificationForm.isRegistrationVerificationForm,
);

const selectLoadingRegistrationVerificationForm = createSelector(
  selectAuthenticationStore,
  ({ registrationVerificationForm }) =>
    registrationVerificationForm.loadingRegistrationVerificationForm,
);

const selectRegistrationVerificationFormError = createSelector(
  selectAuthenticationStore,
  ({ registrationVerificationForm }) =>
    registrationVerificationForm.errorRegistrationVerificationForm,
);

const selectIsRegistrationVerificationRetry = createSelector(
  selectAuthenticationStore,
  ({ registrationVerificationRetry }) =>
    registrationVerificationRetry.isRegistrationVerificationRetry,
);

const selectLoadingRegistrationVerificationRetry = createSelector(
  selectAuthenticationStore,
  ({ registrationVerificationRetry }) =>
    registrationVerificationRetry.loadingRegistrationVerificationRetry,
);

const selectRegistrationVerificationRetryError = createSelector(
  selectAuthenticationStore,
  ({ registrationVerificationRetry }) =>
    registrationVerificationRetry.errorRegistrationVerificationRetry,
);

const selectactiveAuthorizationForm = createSelector(
  selectAuthenticationStore,
  ({ activeAuthorizationForm }) => activeAuthorizationForm,
);

export {
  selectIsAuthorized,
  selectLoadingAuthorized,
  selectAuthorizationError,
  selectLoadingRegistrationForm,
  selectErrorRegistrationForm,
  selectRegistrationPhoneNumber,
  selectRegistrationPassword,
  selectIsRegistrationVerificationForm,
  selectLoadingRegistrationVerificationForm,
  selectRegistrationVerificationFormError,
  selectIsRegistrationVerificationRetry,
  selectLoadingRegistrationVerificationRetry,
  selectRegistrationVerificationRetryError,
  selectactiveAuthorizationForm,
};
