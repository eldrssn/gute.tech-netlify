import {
  CAR_SELECTION_ID,
  MODEL_SELECTION_ID,
  YEAR_SELECTION_ID,
} from './constants';

export type FilterIds =
  | typeof CAR_SELECTION_ID
  | typeof MODEL_SELECTION_ID
  | typeof YEAR_SELECTION_ID;
