import { PaymentStore } from './types';

const initialState: PaymentStore = {
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
