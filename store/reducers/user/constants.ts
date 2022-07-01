import { UserStore } from './types';

const initialState: UserStore = {
  profile: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export { initialState };
