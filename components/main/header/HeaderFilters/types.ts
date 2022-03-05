export enum InputIds {
  HEADER_CAR_SELECTION = 'HEADER_CAR_SELECTION',
  HEADER_MODEL_SELECTION = 'HEADER_MODEL_SELECTION',
  HEADER_YEAR_SELECTION = 'HEADER_YEAR_SELECTION',
}

export type InputId = keyof typeof InputIds;

export interface CarModel {
  car: string;
  model: string;
  year: string;
}

export interface HeaderFilterProps {
  isFullMenu: boolean;
}
