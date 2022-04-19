import { SCROLL_DIRECTIONS } from 'components/base/catalog/constants';
import { ActionTypes } from './constants';
import { Reducer } from './types';

const actionHandlers: Record<ActionTypes, Reducer> = {
  [ActionTypes.GET_PAGE_ON_LOAD]: (state, action) => ({
    ...state,
    scrollToRowIndex: action.scrollToRowIndex,
    page: action.page,
  }),

  [ActionTypes.SCROLL]: (state, action) => ({
    ...state,
    page: action.page,
    scrollToRowIndex: undefined,
  }),

  [ActionTypes.CHANGE_PAGE]: (state, action) => ({
    ...state,
    scrollToRowIndex: action.scrollToRowIndex,
  }),

  [ActionTypes.GET_SCROLL_DIRECTION]: (state, action) => {
    const offset = action.scrollTop;

    if (!offset || !state.offset) {
      return { ...state };
    }

    const scrollDirection =
      offset > state.offset ? SCROLL_DIRECTIONS.DOWN : SCROLL_DIRECTIONS.UP;

    return {
      ...state,
      offset,
      scrollDirection,
    };
  },
};

export const catalogReducer: Reducer = (state, action) =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state;
