const reqExpInput = /^[а-яА-ЯёЁa-zA-Z0-9*_-\s]+$/;
const reqExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

const inputRule = {
  pattern: {
    value: reqExpInput,
    message: 'Введены некорректные символы',
  },
  maxLength: 20,
  required: false,
};

const inputEmailRule = {
  pattern: {
    value: reqExpEmail,
    message: 'Введены некорректные символы',
  },
  maxLength: 20,
  required: false,
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

const mockValues = {
  username: 'canttouchmytralala',
  password: '',
  last_name: 'Петров',
  first_name: 'Ипполит',
  patronymic: 'Виссарионович',
  phone_number: '+79991111111',
  date_of_birthday: new Date(),
  email: 'example@email.com',
  date_joined: new Date(),
  transport: '',
  sex: 'male',
};

export { inputRule, inputEmailRule, reqExpEmail, selectSex, mockValues };
