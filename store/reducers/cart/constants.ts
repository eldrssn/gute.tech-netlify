import { CartStore } from './types';

const initialState: CartStore = {
  cartItems: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export { initialState };
