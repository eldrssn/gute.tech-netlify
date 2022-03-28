import { TestStore } from './reducers/TestStore/types';
import { CartStore } from './reducers/cart/types';

type State = {
  testStore: TestStore;
  cartReducer: CartStore;
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

export type { State, ErrorAction, StoreState, StoreError };
