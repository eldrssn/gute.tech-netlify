import { Control, UseFormSetValue } from 'react-hook-form';

type IsDrawerProps = {
  isDrawer?: boolean;
  closeMainDrawer?: () => void;
};

type FormDataItem = {
  title: string;
  slug: string;
  searchValue: string | null;
};

type FormData = {
  type: FormDataItem;
  brand: FormDataItem;
  model: FormDataItem;
  year: FormDataItem;
  engine: FormDataItem;
};

type WatchormDataItem = {
  title?: string;
  slug?: string;
  searchValue?: string | null;
};

type WatchFormData = {
  brand?: WatchormDataItem;
  model?: WatchormDataItem;
  year?: WatchormDataItem;
  engine?: WatchormDataItem;
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

type FilterInputName = keyof typeof FilterInputNames;

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

interface INamesSearchValueByStep {
  [inputId: number]: FilterInputName;
}

type inputStepId = 0 | 1 | 2 | 3;

type filterStepsData = {
  name: FilterInputName;
  inputStepId: inputStepId;
  placeholder: string;
};

type FilterField = {
  title: string;
  slug: string;
};

type FilterFields = {
  brand: FilterField;
  model: FilterField;
  year: FilterField;
  engine: FilterField;
};

export type { FilterFields };

export { FilterInputNames, StepInputs };

export type {
  INamesDefaultValueByStep,
  INamesSearchValueByStep,
  IsDrawerProps,
  WatchFormData,
  FormDataItem,
  FormData,
  FormProps,
  HandleClickProps,
  inputStepId,
  filterStepsData,
  FilterInputName,
};
