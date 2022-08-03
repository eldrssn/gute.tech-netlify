import { CartStore } from './reducers/cart/types';
import { ShowcaseStore } from './reducers/showcase/types';
import { TransportStore } from './reducers/transport/types';
import { CatalogStore } from './reducers/catalog/types';
import { RegionsStore } from './reducers/regions/types';
import { PagesStore } from './reducers/pages/types';
import { UserStore } from './reducers/user/types';
import { AuthenticationStore } from './reducers/authentication/types';
import { OrderStore } from './reducers/order/types';
import { PaymentStore } from './reducers/payment/types';

type State = {
  cartStore: CartStore;
  transportStore: TransportStore;
  showcaseStore: ShowcaseStore;
  catalogStore: CatalogStore;
  regionStore: RegionsStore;
  pagesStore: PagesStore;
  userStore: UserStore;
  authenticationStore: AuthenticationStore;
  orderStore: OrderStore;
  paymentStore: PaymentStore;
};

type ErrorАuthenticationPayload<P = void> = {
  isValidToken: boolean;
} & P;

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

export type {
  State,
  ErrorAction,
  StoreState,
  StoreError,
  ErrorАuthenticationPayload,
};
