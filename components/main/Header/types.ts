export enum InputIds {
  HEADER_CAR_SELECTION = 'HEADER_CAR_SELECTION',
  HEADER_MODEL_SELECTION = 'HEADER_MODEL_SELECTION',
  HEADER_YEAR_SELECTION = 'HEADER_YEAR_SELECTION',
}

export type InputId = keyof typeof InputIds;

export enum PagesTypes {
  phone = 'phone',
  callback = 'callback',
  shoppingCart = 'shoppingCart',
}

export type PagesType = keyof typeof PagesTypes;

export interface CarModel {
  car: string;
  model: string;
  year: string;
}

export interface HeaderFilterProps {
  isFullMenu: boolean;
}

export interface HeaderMenuProps {
  isFullMenu?: boolean;
}
