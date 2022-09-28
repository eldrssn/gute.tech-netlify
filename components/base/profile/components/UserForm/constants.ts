import { TFormDataFields } from './types';

const MIN_LENGTH = 2;
const MAX_LENGTH = 30;

const UPDATE_DELAY = 1000;

const MIN_AGE = 16;
const MAX_AGE = 100;
const MAX_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() - MIN_AGE),
);

const MIN_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() - MAX_AGE),
);

const DATE_INPUT_MASK = '__/__/____';
const DATE_INPUT_FORMAT = 'dd/MM/yyyy';

const reqExpFullName = /^[а-яА-ЯёЁa-zA-Z-\s]+$/;
const reqExpUsername = /^[а-яА-ЯёЁa-zA-Z0-9*_-\s]+$/;
const reqExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

const inputFullNameRule = {
  pattern: {
    value: reqExpFullName,
    message: 'Введены некорректные символы',
  },
  maxLength: {
    value: MAX_LENGTH,
    message: `Поле не может содержать больше ${MAX_LENGTH} символов`,
  },
  minLength: {
    value: MIN_LENGTH,
    message: `Поле должно содержать более ${MIN_LENGTH} символов`,
  },
};

const usernameRule = {
  pattern: {
    value: reqExpUsername,
    message: 'Введены некорректные символы',
  },
  maxLength: {
    value: MAX_LENGTH,
    message: `Поле не может содержать больше ${MAX_LENGTH} символов`,
  },
  minLength: {
    value: MIN_LENGTH,
    message: `Поле должно содержать более ${MIN_LENGTH} символов`,
  },
};

const inputEmailRule = {
  pattern: {
    value: reqExpEmail,
    message: 'Введите корректный E-mail',
  },
  required: { value: true, message: 'Поле обязательно' },
};

const inputCodeRule = {
  required: { value: true, message: 'Поле обязательно' },
  minLength: { value: 1, message: 'Слишком маленький код' },
  maxLength: {
    value: 4,
    message: 'Код не должен быть более 4-х символов',
  },
};

const ProfileFields: Record<string, TFormDataFields> = {
  LAST_NAME: 'last_name',
  FIRST_NAME: 'first_name',
  PATRONYMIC: 'patronymic',
  PHONE_NUMBER: 'phone_number',
  DATE_OF_BIRTHDAY: 'date_of_birthday',
  EMAIL: 'email',
  DATE_JOINED: 'date_joined',
  TRANSPORT: 'transport',
  CITY: 'city',
};

const selectSex = [
  {
    value: 'male',
    label: 'Мужской',
  },
  {
    value: 'female',
    label: 'Женский',
  },
];

export {
  UPDATE_DELAY,
  DATE_INPUT_MASK,
  DATE_INPUT_FORMAT,
  inputFullNameRule,
  inputEmailRule,
  reqExpEmail,
  inputCodeRule,
  selectSex,
  MAX_DATE,
  MIN_DATE,
  MAX_AGE,
  MIN_AGE,
  usernameRule,
  ProfileFields,
};
