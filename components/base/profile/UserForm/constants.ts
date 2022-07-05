const MIN_LENGTH = 2;
const MAX_LENGTH = 30;

const MIN_AGE = 16;
const MAX_AGE = 100;
const MAX_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() - MIN_AGE),
);

const MIN_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() - MAX_AGE),
);

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
  required: {
    value: true,
    message: 'Поле обязательно',
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
  required: {
    value: true,
    message: 'Поле обязательно',
  },
};

const inputEmailRule = {
  pattern: {
    value: reqExpEmail,
    message: 'Введите корректный E-mail',
  },
  maxLength: 40,
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

const selectCity = [
  {
    value: 'ulianovsk',
    label: 'Ульяновск',
  },
  {
    value: 'moscow',
    label: 'Москва',
  },
  {
    value: 'samara',
    label: 'Самара',
  },
];

const mockValues = {
  username: 'canttouchmytralala',
  password: '',
  last_name: 'Петров',
  first_name: 'Ипполит',
  patronymic: 'Виссарионович',
  phone_number: '+79991111111',
  date_of_birthday: null,
  email: 'example@email.com',
  date_joined: new Date(),
  transport: '',
  sex: 'male',
  city: '',
  country: 'Россия',
};

export {
  inputFullNameRule,
  inputEmailRule,
  reqExpEmail,
  inputCodeRule,
  selectSex,
  mockValues,
  MAX_DATE,
  MIN_DATE,
  MAX_AGE,
  MIN_AGE,
  selectCity,
  usernameRule,
};
