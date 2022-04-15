import { CartStore } from './reducers/cart/types';
import { ShowcaseStore } from './reducers/showcase/types';
import { TransportStore } from './reducers/transport/types';
import { CatalogStore } from './reducers/catalog/types';
import { RegionsStore } from './reducers/regions/types';

type State = {
  cartStore: CartStore;
  transportStore: TransportStore;
  showcaseStore: ShowcaseStore;
  catalogStore: CatalogStore;
  regionStore: RegionsStore;
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
