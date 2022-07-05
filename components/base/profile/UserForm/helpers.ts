import { MAX_DATE, MIN_DATE, MAX_AGE, MIN_AGE } from './constants';
import { TDate } from './types';

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

const validateMinAge = (date: TDate) => {
  if (date) {
    return (
      date > new Date(MIN_DATE) || `Дата не может быть больше ${MAX_AGE} лет`
    );
  }
};

const validateMaxAge = (date: TDate) => {
  if (date) {
    return (
      date < new Date(MAX_DATE) || `Дата не может быть меньше ${MIN_AGE} лет`
    );
  }
};

const formatDate = (keyboardInputValue: string) => {
  const formatedDate = keyboardInputValue.split('/').reverse().join('-');

  return new Date(formatedDate);
};

export { correctRegister, validateMinAge, validateMaxAge, formatDate };
