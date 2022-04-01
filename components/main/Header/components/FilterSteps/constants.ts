import { filterStepsData, StepInputs } from './types';

export const filterSteps: filterStepsData[] = [
  {
    name: 'brand',
    step: StepInputs.BRAND,
  },
  {
    name: 'model',
    step: StepInputs.MODEL,
  },
  {
    name: 'year',
    step: StepInputs.YEAR,
  },
  {
    name: 'engine',
    step: StepInputs.ENGINE,
  },
];
