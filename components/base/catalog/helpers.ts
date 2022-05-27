import { ITEMS_PER_PAGE } from './constants';

const makeStringify = (value?: string[] | string) =>
  typeof value === 'string' ? value : value?.toString() || '';

const isNotEnoughtItems = (total: string) => Number(total) <= ITEMS_PER_PAGE;

export { makeStringify, isNotEnoughtItems };
