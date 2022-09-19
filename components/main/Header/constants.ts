import {
  StepInputs,
  filterStepsData,
  INamesDefaultValueByStep,
  INamesSearchValueByStep,
  FormDataItem,
} from './types';

const menuItemNames = {
  phone: '(499) 283-20-26',
  callback: 'Консультация',
  shoppingCart: '0',
};

const filterSteps: filterStepsData[] = [
  {
    name: 'year',
    inputStepId: StepInputs.YEAR,
    placeholder: 'Год выпуска',
  },
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
    name: 'engine',
    inputStepId: StepInputs.ENGINE,
    placeholder: 'Двигатель',
  },
];

const namesDefaultValueByStep: INamesDefaultValueByStep = {
  [StepInputs.YEAR]: ['engine', 'model', 'brand'],
  [StepInputs.BRAND]: ['engine', 'model'],
  [StepInputs.MODEL]: ['engine'],
  [StepInputs.ENGINE]: [],
};

const nameSearchValueByStep: INamesSearchValueByStep = {
  [StepInputs.BRAND]: 'brand',
  [StepInputs.MODEL]: 'model',
  [StepInputs.YEAR]: 'engine',
  [StepInputs.ENGINE]: 'engine',
};

const widthListByStep = {
  [StepInputs.YEAR]: '100%',
  [StepInputs.BRAND]: '75%',
  [StepInputs.MODEL]: '50%',
  [StepInputs.ENGINE]: '25%',
};

const widthButtonByStep = {
  [StepInputs.YEAR]: '25%',
  [StepInputs.BRAND]: '33.333333%',
  [StepInputs.MODEL]: '50%',
  [StepInputs.ENGINE]: '100%',
};

const defaultValue: FormDataItem = {
  title: '',
  slug: '',
  searchValue: null,
};

export {
  menuItemNames,
  filterSteps,
  namesDefaultValueByStep,
  nameSearchValueByStep,
  widthListByStep,
  widthButtonByStep,
  defaultValue,
};
