import { UserStore } from './types';

const initialState: UserStore = {
  profile: {
    data: null,
    isLoading: false,
    error: null,
  },
  editProfile: {
    data: null,
    isLoading: false,
    error: null,
  },
  verifyEmail: {
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
  changePassword: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export { initialState };
