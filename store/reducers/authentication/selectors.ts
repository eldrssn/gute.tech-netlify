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
  ({ authorized }) => authorized.errorAuthorized?.errors,
);

const selectLoadingRegistrationForm = createSelector(
  selectAuthenticationStore,
  ({ registrationForm }) => registrationForm.loadingRegistrationForm,
);

const selectErrorRegistrationForm = createSelector(
  selectAuthenticationStore,
  ({ registrationForm }) => registrationForm.errorRegistrationForm?.errors,
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

const selectLoadingResetPasswordForm = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordForm }) => resetPasswordForm.loadingResetPasswordForm,
);

const selectErrorResetPasswordForm = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordForm }) => resetPasswordForm.errorResetPasswordForm?.errors,
);

const selectResetPasswordPhone = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordForm }) => resetPasswordForm.phoneNumber,
);

const selectLoadingResetPasswordVerificationForm = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordVerificationForm }) =>
    resetPasswordVerificationForm.loadingResetPasswordVerificationForm,
);

const selectErrorResetPasswordVerificationForm = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordVerificationForm }) =>
    resetPasswordVerificationForm.errorResetPasswordVerificationForm?.errors,
);

const selectResetPasswordVerificationPhone = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordVerificationForm }) =>
    resetPasswordVerificationForm.phoneNumber,
);

const selectResetPasswordVerificationCode = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordVerificationForm }) => resetPasswordVerificationForm.code,
);

const selectResetPasswordSetError = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordSetForm }) =>
    resetPasswordSetForm.errorResetPasswordSetForm?.errors,
);

const selectLoadingResetPasswordSet = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordSetForm }) =>
    resetPasswordSetForm.loadingResetPasswordSetForm,
);

const selectIsResetPasswordSet = createSelector(
  selectAuthenticationStore,
  ({ resetPasswordSetForm }) => resetPasswordSetForm.isResetPassword,
);

const selectNotAuthorizedToken = createSelector(
  selectAuthenticationStore,
  ({ notAuthorizedToken }) => notAuthorizedToken.token,
);

export {
  selectNotAuthorizedToken,
  selectIsAuthorized,
  selectLoadingAuthorized,
  selectAuthorizationError,
  selectLoadingRegistrationForm,
  selectErrorRegistrationForm,
  selectRegistrationPhoneNumber,
  selectRegistrationPassword,
  selectIsRegistrationVerificationForm,
  selectLoadingRegistrationVerificationForm,
  selectResetPasswordPhone,
  selectRegistrationVerificationFormError,
  selectLoadingRegistrationVerificationRetry,
  selectRegistrationVerificationRetryError,
  selectactiveAuthorizationForm,
  selectLoadingResetPasswordForm,
  selectErrorResetPasswordForm,
  selectLoadingResetPasswordVerificationForm,
  selectErrorResetPasswordVerificationForm,
  selectResetPasswordVerificationPhone,
  selectResetPasswordVerificationCode,
  selectResetPasswordSetError,
  selectLoadingResetPasswordSet,
  selectIsResetPasswordSet,
};
