import { UseFormSetError } from 'react-hook-form';

import { VerifyEmailResponseErrorData } from 'api/models/user';
import { TFormData } from './types';

const checkForErrors = (
  response: VerifyEmailResponseErrorData | null,
  setError: UseFormSetError<TFormData>,
) => {
  if (!response) {
    return;
  }
  const fields = Object.keys(response);

  fields.forEach((field) => {
    if (field === 'code') {
      setError('code', {
        type: 'custom',
        message: response[field][0],
      });
    }
  });
};

export { checkForErrors };
