import { CartStore } from './types';

const initialState: CartStore = {
  cartItems: {
    data: [],
    isLoading: true,
    error: null,
  },
  cartSavedItems: {
    data: [],
    isLoading: false,
    error: null,
  },
  cartTotal: 0,
  cartProductCount: 0,
  cartError: false,
  cartUpdated: false,
};

export { initialState };
