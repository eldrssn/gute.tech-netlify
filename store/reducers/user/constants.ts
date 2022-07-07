import { UserStore } from './types';

const initialState: UserStore = {
  profile: {
    data: null,
    isLoading: false,
    error: null,
  },
  orders: {
    data: {
      results: [],
      current: 0,
      pages: 0,
      total: 0,
    },
    isLoading: false,
    error: null,
  },
  order: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export { initialState };
