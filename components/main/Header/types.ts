import { UseFormWatch, Control, UseFormSetValue } from 'react-hook-form';

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

export type FormData = {
  brand: string;
  model: string;
  year: string;
  engine: string;
};

export type FormProps = {
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export enum FilterInputNames {
  brand = 'brand',
  model = 'model',
  year = 'year',
  engine = 'engine',
}

export type FilterInputName = keyof typeof FilterInputNames;
