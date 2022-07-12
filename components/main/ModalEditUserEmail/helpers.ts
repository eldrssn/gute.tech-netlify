import { UseFormSetError } from 'react-hook-form';

import { EditProfileResponseErrorData } from 'api/models/user';
import { TFormData } from './types';
import { CUSTOM_TYPE_ERROR, modalFields, NON_FIELD_ERRORS } from './constants';

const checkForErrors = (
  response: EditProfileResponseErrorData | null,
  setError: UseFormSetError<TFormData>,
) => {
  if (!response) {
    return;
  }
  const { errors } = response;
  const fields = Object.keys(errors);

  fields.forEach((field) => {
    if (field === modalFields.CODE) {
      setError(modalFields.CODE, {
        type: CUSTOM_TYPE_ERROR,
        message: errors[field][0],
      });
    }

    if (field === NON_FIELD_ERRORS) {
      setError(modalFields.EMAIL, {
        type: CUSTOM_TYPE_ERROR,
        message: errors[field][0],
      });
    }
  });
};

const checkSameEmail = (setError: UseFormSetError<TFormData>) => {
  setError(modalFields.EMAIL, {
    type: CUSTOM_TYPE_ERROR,
    message: 'Новый email совпадает со старым',
  });
};

export { checkForErrors, checkSameEmail };
