import { SCROLL_DIRECTIONS } from '../constants';

export type CatalogState = {
  page?: number;
  scrollToRowIndex?: number;
  offset?: number;
  scrollDirection: SCROLL_DIRECTIONS;
};
