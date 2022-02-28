export enum INPUT_IDS {
  CAR_SELECTION_ID = 'header-filter-car-selection',
  MODEL_SELECTION_ID = 'header-filter-model-selection',
  YEAR_SELECTION_ID = 'header-filter-year-selection',
}

export interface CarModel {
  car: string;
  model: string;
  year: string;
}
