import { SCROLL_DIRECTIONS } from 'components/base/catalog/constants';
import { CatalogState } from '../types';

export const initialState: CatalogState = {
  offset: 0,
  page: 1,
  scrollToRowIndex: undefined,
  scrollDirection: SCROLL_DIRECTIONS.UP,
};

export enum ActionTypes {
  GET_PAGE_ON_LOAD = 'GET_PAGE_ON_LOAD',
  SCROLL = 'SCROLL',
  CHANGE_PAGE = 'CHANGE_PAGE',
  GET_SCROLL_DIRECTION = 'GET_SCROLL_DIRECTION',
}
