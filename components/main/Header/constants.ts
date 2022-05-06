import { StepInputs, filterStepsData, INamesDefaultValueByStep } from './types';

const menuItemNames = {
  phone: '(499) 283-20-26',
  callback: 'Консультация',
  shoppingCart: '0',
};

const filterSteps: filterStepsData[] = [
  {
    name: 'brand',
    inputStepId: StepInputs.BRAND,
    placeholder: 'Марка',
  },
  {
    name: 'model',
    inputStepId: StepInputs.MODEL,
    placeholder: 'Модель',
  },
  {
    name: 'year',
    inputStepId: StepInputs.YEAR,
    placeholder: 'Год выпуска',
  },
  {
    name: 'engine',
    inputStepId: StepInputs.ENGINE,
    placeholder: 'Двигатель',
  },
];

const namesDefaultValueByStep: INamesDefaultValueByStep = {
  [StepInputs.BRAND]: ['brand', 'engine', 'model', 'year'],
  [StepInputs.MODEL]: ['model', 'engine', 'year'],
  [StepInputs.YEAR]: ['engine', 'year'],
  [StepInputs.ENGINE]: ['engine'],
};

export { menuItemNames, filterSteps, namesDefaultValueByStep };
