import { UseFormSetError } from 'react-hook-form';

import {
  TFormData as TFormLogInData,
  FormKey as FormLogInKey,
} from './components/FormLogIn/types';
import {
  TFormData as TFormRegistrationData,
  FormKey as FormRegistrationKey,
} from './components/FormRegistration/types';
import { RetryButtonTitle } from './components/FormRegistrationVerification/types';
import {
  LoginResponseErrorData,
  RegisterResponseErrorData,
  RegisterVerifyResponseErrorData,
} from 'api/models/authentication';

const setLogInFormErrors = ({
  errors,
  setError,
  setOtherError,
}: {
  errors: LoginResponseErrorData;
  setError: UseFormSetError<TFormLogInData>;
  setOtherError: (error: string) => void;
}) => {
  if (errors.detail) {
    setOtherError(errors.detail);
  }

  if (errors.password) {
    setError(FormLogInKey.PASSWORD, {
      type: 'custom',
      message: errors.password,
    });
  }

  if (errors.phone_number) {
    setError(FormLogInKey.PHONE_NUMBER, {
      type: 'custom',
      message: errors.phone_number,
    });
  }
};

const setRegistrationFormErrors = ({
  errors,
  setError,
  setOtherError,
}: {
  errors: RegisterResponseErrorData;
  setError: UseFormSetError<TFormRegistrationData>;
  setOtherError: (error: string) => void;
}) => {
  if (errors.phone_number) {
    setError(FormRegistrationKey.PHONE_NUMBER, {
      type: 'custom',
      message: errors.phone_number,
    });
  }

  if (errors.password) {
    setError(FormRegistrationKey.PASSWORD, {
      type: 'custom',
      message: errors.password,
    });
  }

  if (errors.password2) {
    setError(FormRegistrationKey.PASSWORD_REPEAT, {
      type: 'custom',
      message: errors.password2,
    });
  }

  if (errors.non_field_errors) {
    setOtherError(errors.non_field_errors);
  }
};

const selectTitleRetryButton = ({
  isRegistrationVerificationRetry,
  registrationVerificationErrorRetry,
  setTitleRetryButton,
}: {
  isRegistrationVerificationRetry: boolean;
  registrationVerificationErrorRetry: RegisterVerifyResponseErrorData | null;
  setTitleRetryButton: (title: string) => void;
}) => {
  if (!isRegistrationVerificationRetry) {
    setTitleRetryButton(RetryButtonTitle.DEFAULT);
    return;
  }

  if (isRegistrationVerificationRetry) {
    setTitleRetryButton(RetryButtonTitle.SUCCESS);
    return;
  }

  if (!registrationVerificationErrorRetry?.non_field_errors) {
    setTitleRetryButton(RetryButtonTitle.FAILURE);
    return;
  }

  setTitleRetryButton(registrationVerificationErrorRetry.non_field_errors);
};

export {
  setLogInFormErrors,
  setRegistrationFormErrors,
  selectTitleRetryButton,
};
