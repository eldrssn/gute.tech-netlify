import { UseFormSetError } from 'react-hook-form';

import {
  CityRequestData,
  EditProfileResponseErrorData,
  ProfileResponseData,
} from 'api/models/user';
import { RegionData } from 'api/models/regions';

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

const getDate = (stringifiedDate: string | null | CityRequestData) => {
  if (typeof stringifiedDate === 'string') {
    return stringifiedDate ? new Date(stringifiedDate) : null;
  }

  return null;
};

const formatStringifiedDate = (date: string) =>
  date.split('/').reverse().join('-');

const formatDate = (date: string | null) => {
  if (!date) {
    return;
  }
  const formatedDate = formatStringifiedDate(date);
  return new Date(formatedDate);
};

const checkValidDate = (date: Date | string) => {
  if (typeof date !== 'string') {
    const timestamp = Date.parse(date.toString());
    return !isNaN(timestamp);
  }

  const timestamp = Date.parse(formatStringifiedDate(date));
  return !isNaN(timestamp);
};

const checkCorrectDate = (date: Date | string | null) => {
  if (!date) {
    return true;
  }

  return checkValidDate(date) || 'Некорректная дата';
};

const cutDate = (date: Date | null) => {
  if (!date) {
    return '';
  }

  const isValidDate = checkValidDate(date);
  return isValidDate ? date.toISOString().substring(0, 10) : null;
};

const validateMinAge = (date: string | null) => {
  const dateOfBirth = formatDate(date);

  if (dateOfBirth) {
    return (
      dateOfBirth > new Date(MIN_DATE) ||
      `Дата не может быть больше ${MAX_AGE} лет`
    );
  }
};

const validateMaxAge = (date: string | null) => {
  const dateOfBirth = formatDate(date);

  if (dateOfBirth) {
    return (
      dateOfBirth < new Date(MAX_DATE) ||
      `Дата не может быть меньше ${MIN_AGE} лет`
    );
  }
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
  userProfile,
  setError,
}: {
  editProfileError: EditProfileResponseErrorData | null;
  userProfile: ProfileResponseData | null;
  setError: UseFormSetError<ProfileResponseData>;
}) => {
  if (!editProfileError || !userProfile) {
    return;
  }

  Object.entries(editProfileError).forEach(([field, error]) => {
    const profileResponseFields = Object.keys(userProfile);

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

const getCityOptions = (regions: RegionData[]) =>
  regions.flatMap(({ cities }) => cities);

const getCityTitle = (defaultCity: string | CityRequestData) =>
  typeof defaultCity === 'string' ? defaultCity : defaultCity.title;

const getCityOption = (defaultCity: string | CityRequestData) =>
  typeof defaultCity === 'string'
    ? { title: defaultCity, slug: defaultCity }
    : defaultCity;

export {
  correctRegister,
  validateMinAge,
  validateMaxAge,
  formatDate,
  filterDirtyFields,
  setCustomErrors,
  getDate,
  cutDate,
  checkCorrectDate,
  formatStringifiedDate,
  checkValidDate,
  getCityTitle,
  getCityOption,
  getCityOptions,
};
