import { ActionTypes } from './constants';

const getPageQuery = (scrollToRowIndex: number, page: number) => ({
  type: ActionTypes.GET_PAGE_ON_LOAD,
  scrollToRowIndex,
  page,
});

const scroll = (page: number) => ({
  type: ActionTypes.SCROLL,
  page,
});

const changePage = (scrollToRowIndex: number) => ({
  type: ActionTypes.CHANGE_PAGE,
  scrollToRowIndex,
});

const getScrollDirection = (scrollTop: number) => ({
  type: ActionTypes.GET_SCROLL_DIRECTION,
  scrollTop,
});

export { getPageQuery, scroll, changePage, getScrollDirection };
