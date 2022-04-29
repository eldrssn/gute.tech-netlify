import { Control, UseFormSetValue } from 'react-hook-form';

export type IsDrawerProps = {
  isDrawer?: boolean;
  closeMainDrawer?: () => void;
};

export type FormDataItem = {
  title: string;
  slug: string;
};

export type FormData = {
  brand: FormDataItem;
  model: FormDataItem;
  year: FormDataItem;
  engine: FormDataItem;
};

export type FormProps = {
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export type HandleClickProps = {
  inputStepId: number;
} & FormDataItem;

export enum FilterInputNames {
  brand = 'brand',
  model = 'model',
  year = 'year',
  engine = 'engine',
}

export enum StepInputs {
  BRAND = 0,
  MODEL = 1,
  YEAR = 2,
  ENGINE = 3,
  INACTIVE = -1,
}

export interface INamesDefaultValueByStep {
  [inputId: number]: FilterInputName[];
}

export type inputStepId = 0 | 1 | 2 | 3;

export type filterStepsData = {
  name: FilterInputName;
  inputStepId: inputStepId;
  placeholder: string;
};

export type FilterInputName = keyof typeof FilterInputNames;
