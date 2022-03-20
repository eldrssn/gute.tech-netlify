import { EValidatePattern } from './types';

const validatePatterns = {
  [EValidatePattern.PHONE_NUMBER]: {
    pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
    message: 'Номер введен неверно',
  },
};

export { validatePatterns };
