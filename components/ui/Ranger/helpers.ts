import { RangerValue } from './types';

const checkValuesCorrect = ({
  min,
  max,
}: {
  min: RangerValue;
  max: RangerValue;
}) => Number(min) <= Number(max);

const checkValueExists = (value: RangerValue) => (value ? value : undefined);

export { checkValuesCorrect, checkValueExists };
