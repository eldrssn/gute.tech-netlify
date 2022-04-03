import { CartStore } from './reducers/cart/types';
import { TransportStore } from './reducers/transport/types';

type State = {
  cartStore: CartStore;
  transportStore: TransportStore;
};

type ErrorAction = {
  error: {
    name: string;
    message: string;
  };
};

type StoreError = {
  name: string;
  message: string;
};

type StoreState = {
  isLoading: boolean;
  error: StoreError | null;
};

export type { State, ErrorAction, StoreError, StoreState };
