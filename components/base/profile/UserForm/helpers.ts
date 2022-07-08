import { UseFormSetError } from 'react-hook-form';

import {
  EditProfileResponseErrorData,
  ProfileResponseData,
} from 'api/models/user';

import { MAX_DATE, MIN_DATE, MAX_AGE, MIN_AGE } from './constants';
import { TDirtyFields } from './types';

const correctRegister = (
  event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
) => {
  const words = event.target.value.split(' ');

  const correctedRegister = words.map((word) => {
    const capital = word.slice(0, 1).toUpperCase();
    const other = word.slice(1).toLowerCase();
    return `${capital}${other}`;
  });

  return correctedRegister.join(' ');
};

const validateMinAge = (stringfiedDate: string | null) => {
  if (stringfiedDate) {
    const date = new Date(stringfiedDate);

    return (
      date > new Date(MIN_DATE) || `Дата не может быть больше ${MAX_AGE} лет`
    );
  }
};

const validateMaxAge = (stringfiedDate: string | null) => {
  if (stringfiedDate) {
    const date = new Date(stringfiedDate);

    return (
      date < new Date(MAX_DATE) || `Дата не может быть меньше ${MIN_AGE} лет`
    );
  }
};

const formatDate = (keyboardInputValue: string) => {
  const formatedDate = keyboardInputValue.split('/').reverse().join('-');

  return new Date(formatedDate).toISOString().substring(0, 10) || '';
};

const filterDirtyFields = ({
  data,
  dirtyFields,
}: {
  data: ProfileResponseData;
  dirtyFields: TDirtyFields;
}) => {
  const fields = Object.keys(dirtyFields);

  return fields.reduce(
    (accumulator, field) =>
      field
        ? {
            ...accumulator,
            [field]: data[field as keyof ProfileResponseData],
          }
        : { ...accumulator },
    {},
  );
};

const setCustomErrors = ({
  editProfileError,
  data,
  setError,
}: {
  editProfileError: EditProfileResponseErrorData | null;
  data: ProfileResponseData;
  setError: UseFormSetError<ProfileResponseData>;
}) => {
  if (!editProfileError) {
    return;
  }

  Object.entries(editProfileError).forEach(([field, error]) => {
    const profileResponseFields = Object.keys(data);

    if (!profileResponseFields.includes(field)) {
      return;
    }

    const errorMessage = Array.isArray(error) ? error[0] : error;

    setError(field as keyof ProfileResponseData, {
      type: 'custom',
      message: errorMessage,
    });
  });
};

export {
  correctRegister,
  validateMinAge,
  validateMaxAge,
  formatDate,
  filterDirtyFields,
  setCustomErrors,
};
