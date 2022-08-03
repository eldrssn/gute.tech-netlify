import { OrderStore } from './types';

const initialState: OrderStore = {
  orderItems: {
    data: [],
    isLoading: false,
    error: null,
  },
  orderItemsSlugs: [],
};

export { initialState };
