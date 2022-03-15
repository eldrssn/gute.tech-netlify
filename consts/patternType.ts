import { EPatternTypes } from './types';

const patternsType = {
  [EPatternTypes.PHONE_NUMBER]: {
    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: 'Номер введен неверно',
  },
  [EPatternTypes.ANY]: {
    pattern: /./,
    message: '',
  },
};

export default patternsType;
