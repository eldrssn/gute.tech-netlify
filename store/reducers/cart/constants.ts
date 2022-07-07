import { CartStore } from './types';

const initialState: CartStore = {
  cartItems: { data: [], isLoading: false, error: null },
  paymentMethods: { data: [], isLoading: false, error: null },
  paymentStatus: { data: null, isLoading: false, error: null },
  createOrderingStatus: {
    data: null,
    loadingCreateOrdering: false,
    errorCreateOrdering: null,
    isCreateOrdering: false,
  },
};

export { initialState };
