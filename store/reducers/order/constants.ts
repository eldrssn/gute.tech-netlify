import { OrderStore } from './types';

const MIN_COUNT_ORDER_ITEM = 1;

const initialState: OrderStore = {
  orderItems: {
    data: [],
    isLoading: false,
    error: null,
  },
  orderItemsSlugs: [],
};

export { initialState, MIN_COUNT_ORDER_ITEM };
