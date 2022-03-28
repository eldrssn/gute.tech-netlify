import { CartStore } from './reducers/cart/types';
import { ContentStore } from './reducers/content/types';

type State = {
  cartStore: CartStore;
  conetentStore: ContentStore;
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
