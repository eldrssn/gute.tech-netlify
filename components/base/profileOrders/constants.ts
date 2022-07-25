import { Range } from 'react-date-range';

const ORDERING_QUERY = 'ordering';
const CREATED_AFTER_QUERY = 'created_after';
const CREATED_BEFORE_QUERY = 'created_before';
const PAGE_QUERY = 'page';
const ITEMS_PER_PAGE = 12;

const DIRECTIONS = {
  UP: '-created_at',
  DOWN: 'created_at',
};

const DateRangeInitialState: Range = {
  startDate: undefined,
  endDate: undefined,
  key: 'selection',
};

export {
  DateRangeInitialState,
  ORDERING_QUERY,
  PAGE_QUERY,
  ITEMS_PER_PAGE,
  CREATED_AFTER_QUERY,
  CREATED_BEFORE_QUERY,
  DIRECTIONS,
};
