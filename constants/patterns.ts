import { EValidatePattern } from './types';

const validatePatterns = {
  [EValidatePattern.PHONE_NUMBER]: {
    pattern: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,11}$/im,
    message: 'Номер введен неверно',
  },
  [EValidatePattern.EMAIL]: {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email введен неверно',
  },
};

export { validatePatterns };
