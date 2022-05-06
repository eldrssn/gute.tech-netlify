import { Control, UseFormSetValue } from 'react-hook-form';

type IsDrawerProps = {
  isDrawer?: boolean;
  closeMainDrawer?: () => void;
};

type FormDataItem = {
  title: string;
  slug: string;
};

type FormData = {
  brand: FormDataItem;
  model: FormDataItem;
  year: FormDataItem;
  engine: FormDataItem;
};

type FormProps = {
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
};

type HandleClickProps = {
  inputStepId: number;
} & FormDataItem;

enum FilterInputNames {
  brand = 'brand',
  model = 'model',
  year = 'year',
  engine = 'engine',
}

enum StepInputs {
  BRAND = 0,
  MODEL = 1,
  YEAR = 2,
  ENGINE = 3,
  INACTIVE = -1,
}

interface INamesDefaultValueByStep {
  [inputId: number]: FilterInputName[];
}

type inputStepId = 0 | 1 | 2 | 3;

type filterStepsData = {
  name: FilterInputName;
  inputStepId: inputStepId;
  placeholder: string;
};

type FilterInputName = keyof typeof FilterInputNames;

export { FilterInputNames, StepInputs };

export type {
  INamesDefaultValueByStep,
  IsDrawerProps,
  FormDataItem,
  FormData,
  FormProps,
  HandleClickProps,
  inputStepId,
  filterStepsData,
  FilterInputName,
};
