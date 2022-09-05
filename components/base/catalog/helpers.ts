import { ITEMS_PER_PAGE } from './constants';

const isNotEnoughtItems = (total?: string) => Number(total) <= ITEMS_PER_PAGE;

export { isNotEnoughtItems };
