import { CatalogState } from '../types';
import { ActionTypes } from './constants';

type Action = {
  type: ActionTypes;
  scrollTop?: number;
  scrollToRowIndex?: number;
  page?: number;
};

export type Reducer = (state: CatalogState, action: Action) => CatalogState;
