import { UseFormGetValues, UseFormSetError } from 'react-hook-form';

import {
  ChangePasswordErrors,
  ChangePasswordRequestData,
} from 'api/models/user';
import { modalFields } from './constants';
import { CUSTOM_TYPE_ERROR } from '../ModalEditUserEmail/constants';

const comparisonNewPasswords = (
  getValues: UseFormGetValues<ChangePasswordRequestData>,
) => {
  const newPassword = getValues(modalFields.NEW_PASSWORD);
  const repeatNewPassword = getValues(modalFields.REPEAT_NEW_PASSWORD);

  return newPassword === repeatNewPassword || 'Пароль не совпадает';
};

const checkCurrentPasswordError = ({
  changePasswordErrors,
  setError,
}: {
  changePasswordErrors?: ChangePasswordErrors;
  setError: UseFormSetError<ChangePasswordRequestData>;
}) => {
  const error = changePasswordErrors?.non_field_errors;

  if (!error) {
    return;
  }

  setError(modalFields.CURRENT_PASSWORD, {
    type: CUSTOM_TYPE_ERROR,
    message: error[0],
  });
};

export { comparisonNewPasswords, checkCurrentPasswordError };
