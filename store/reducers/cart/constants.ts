import { CartStore } from './types';

const MIN_COUNT_ADD_ITEM_CART = 1;
const MIN_COUNT_CART_ITEM = 0;

const initialState: CartStore = {
  cartItems: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export { initialState, MIN_COUNT_ADD_ITEM_CART, MIN_COUNT_CART_ITEM };
