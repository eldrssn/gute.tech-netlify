import { StepInputs, filterStepsData } from './types';

export const menuItemNames = {
  phone: '(499) 283-20-26',
  callback: 'Консультация',
  shoppingCart: '0',
};

export const filterSteps: filterStepsData[] = [
  {
    name: 'brand',
    inputStepId: StepInputs.BRAND,
  },
  {
    name: 'model',
    inputStepId: StepInputs.MODEL,
  },
  {
    name: 'year',
    inputStepId: StepInputs.YEAR,
  },
  {
    name: 'engine',
    inputStepId: StepInputs.ENGINE,
  },
];
