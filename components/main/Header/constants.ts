import {
  StepInputs,
  filterStepsData,
  INamesDefaultValueByStep,
  INamesSearchValueByStep,
} from './types';

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

const nameSearchValueByStep: INamesSearchValueByStep = {
  [StepInputs.BRAND]: 'brand',
  [StepInputs.MODEL]: 'model',
  [StepInputs.YEAR]: 'engine',
  [StepInputs.ENGINE]: 'engine',
};

const widthListByStep = {
  [StepInputs.BRAND]: '100%',
  [StepInputs.MODEL]: '75%',
  [StepInputs.YEAR]: '50%',
  [StepInputs.ENGINE]: '25%',
  [StepInputs.INACTIVE]: '0',
};

const widthButtonByStep = {
  [StepInputs.BRAND]: '25%',
  [StepInputs.MODEL]: '33.333333%',
  [StepInputs.YEAR]: '50%',
  [StepInputs.ENGINE]: '100%',
  [StepInputs.INACTIVE]: '0',
};

export {
  menuItemNames,
  filterSteps,
  namesDefaultValueByStep,
  nameSearchValueByStep,
  widthListByStep,
  widthButtonByStep,
};
