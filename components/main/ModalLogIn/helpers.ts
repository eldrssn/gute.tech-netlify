import { UseFormSetError } from 'react-hook-form';

import {
  TFormData as TFormLogInData,
  FormKey as FormLogInKey,
} from './components/FormLogIn/types';
import {
  TFormData as TFormRegistrationData,
  FormKey as FormRegistrationKey,
} from './components/FormRegistration/types';
import {
  TFormData as TFormResetPasswordData,
  FormKey as FormResetPasswordKey,
} from './components/FormResetPassword/types';
import {
  TFormData as TFormResetPasswordVerificationData,
  FormKey as FormResetPasswordVerificationKey,
} from './components/FormResetPasswordVerification/types';
import {
  TFormData as TFormResetPasswordSetData,
  FormKey as FormResetPasswordSetKey,
} from './components/FormResetPasswordSet/types';
import { RetryButtonTitle } from './components/FormRegistrationVerification/types';
import {
  ResetPasswordVerifyErrors,
  ResetPasswordErrors,
  LoginErrors,
  RegisterErrors,
  RegisterVerifyResponseErrorData,
  ResetPasswordSetErrors,
} from 'api/models/authentication';
import { TIMER_DELAY } from 'constants/variables';

const setLogInFormErrors = ({
  errors,
  setError,
  setOtherError,
}: {
  errors: LoginErrors;
  setError: UseFormSetError<TFormLogInData>;
  setOtherError: (error: string[]) => void;
}) => {
  const { detail, password, phone_number } = errors;

  if (detail) {
    setOtherError(detail);
  }

  if (password) {
    password.map((error) =>
      setError(FormLogInKey.PASSWORD, { type: 'custom', message: error }),
    );
  }

  if (phone_number) {
    phone_number.map((error) =>
      setError(FormLogInKey.PHONE_NUMBER, { type: 'custom', message: error }),
    );
  }
};

const setRegistrationFormErrors = ({
  errors,
  setError,
  setOtherError,
}: {
  errors: RegisterErrors;
  setError: UseFormSetError<TFormRegistrationData>;
  setOtherError: (error: string[]) => void;
}) => {
  const { password, password2, phone_number, non_field_errors } = errors;

  if (phone_number) {
    phone_number.map((error) =>
      setError(FormRegistrationKey.PHONE_NUMBER, {
        type: 'custom',
        message: error,
      }),
    );
  }

  if (password) {
    password.map((error) =>
      setError(FormRegistrationKey.PASSWORD, {
        type: error,
        message: error,
      }),
    );
  }

  if (password2) {
    password2.map((error) =>
      setError(FormRegistrationKey.PASSWORD_REPEAT, {
        type: 'custom',
        message: error,
      }),
    );
  }

  if (non_field_errors) {
    setOtherError(non_field_errors);
  }
};

const setResetPasswordFormErrors = ({
  errors,
  setError,
}: {
  errors: ResetPasswordErrors;
  setError: UseFormSetError<TFormResetPasswordData>;
}) => {
  const { detail, phone_number } = errors;

  if (detail) {
    detail.map((error) =>
      setError(FormResetPasswordKey.PHONE_NUMBER, {
        type: 'custom',
        message: error,
      }),
    );
  }

  if (phone_number) {
    phone_number.map((error) =>
      setError(FormResetPasswordKey.PHONE_NUMBER, {
        type: 'custom',
        message: error,
      }),
    );
  }
};

const setResetPasswordVerificationFormErrors = ({
  errors,
  setError,
}: {
  errors: ResetPasswordVerifyErrors;
  setError: UseFormSetError<TFormResetPasswordVerificationData>;
}) => {
  const { detail } = errors;

  if (detail) {
    detail.map((error) =>
      setError(FormResetPasswordVerificationKey.CODE, {
        type: 'custom',
        message: error,
      }),
    );
  }
};

const setResetPasswordSetFormErrors = ({
  errors,
  setError,
}: {
  errors: ResetPasswordSetErrors;
  setError: UseFormSetError<TFormResetPasswordSetData>;
}) => {
  const { password, password2, non_field_errors } = errors;

  if (password) {
    password.map((error) =>
      setError(FormResetPasswordSetKey.PASSWORD, {
        type: 'custom',
        message: error,
      }),
    );
  }

  if (non_field_errors) {
    non_field_errors.map((error) =>
      setError(FormResetPasswordSetKey.PASSWORD, {
        type: 'custom',
        message: error,
      }),
    );
  }

  if (password2) {
    password2.map((error) =>
      setError(FormResetPasswordSetKey.PASSWORD_REPEAT, {
        type: 'custom',
        message: error,
      }),
    );
  }
};

const setErrorRetryButton = ({
  registrationVerificationErrorRetry,
  setTitleRetryButton,
}: {
  registrationVerificationErrorRetry: RegisterVerifyResponseErrorData | null;
  setTitleRetryButton: (title: string) => void;
}) => {
  if (registrationVerificationErrorRetry?.errors.non_field_errors) {
    setTitleRetryButton(
      registrationVerificationErrorRetry.errors.non_field_errors[0],
    );
    return;
  }

  setTitleRetryButton(RetryButtonTitle.DEFAULT);
};

const getTimerTime = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + TIMER_DELAY); // 59 second timer

  return time;
};

export {
  setLogInFormErrors,
  setRegistrationFormErrors,
  setResetPasswordVerificationFormErrors,
  setErrorRetryButton,
  setResetPasswordFormErrors,
  getTimerTime,
  setResetPasswordSetFormErrors,
};
