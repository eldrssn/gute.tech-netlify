import { EValidatePattern } from './types';

const validatePatterns = {
  [EValidatePattern.PHONE_NUMBER]: {
    pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
    message: 'Номер введен неверно',
  },
  [EValidatePattern.EMAIL]: {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email введен неверно',
  },
};

export { validatePatterns };
