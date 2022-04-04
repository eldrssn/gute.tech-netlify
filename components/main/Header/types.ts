import { Control, UseFormSetValue } from 'react-hook-form';

export type IsDrawerProps = {
  isDrawer?: boolean;
};

export type CardDetailsProps = Record<
  | 'HEADER_CAR_SELECTION'
  | 'HEADER_MODEL_SELECTION'
  | 'HEADER_YEAR_SELECTION'
  | 'HEADER_ENGINE_SELECTION',
  string
>;

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

export type handleClickProps = {
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

export type filterStepsData = {
  name: FilterInputName;
  inputStepId: number;
};

export type FilterInputName = keyof typeof FilterInputNames;
