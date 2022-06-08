import { PagesStore } from './types';

const initialState: PagesStore = {
  pagesmenu: {
    data: [],
    isLoading: false,
    error: null,
  },
  page: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export { initialState };
