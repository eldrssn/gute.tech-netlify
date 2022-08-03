import { ErrorAction, StoreState, StoreError } from 'store/types';

import {
  PaymentMethodResponseData,
  StatusResponseData,
  OrderingResponseData,
  OrderingResponseErrorData,
} from 'api/models/payment';

enum PaymentStoreBlocks {
  PAYMENT_METHODS = 'paymentMethods',
  PAYMENT_STATUS = 'paymentStatus',
  CREATE_ORDERING_STATUS = 'createOrderingStatus',
}

type PaymentMethodsState = {
  data: PaymentMethodResponseData[];
} & StoreState;

type PaymentStatusState = {
  data: StatusResponseData | null;
} & StoreState;

type CreateOrderingState = {
  data: OrderingResponseData | null;
  isCreateOrdering: boolean;
  loadingCreateOrdering: boolean;
  errorCreateOrdering: OrderingResponseErrorData | null;
};

type PaymentStore = {
  [PaymentStoreBlocks.PAYMENT_METHODS]: PaymentMethodsState;
  [PaymentStoreBlocks.PAYMENT_STATUS]: PaymentStatusState;
  [PaymentStoreBlocks.CREATE_ORDERING_STATUS]: CreateOrderingState;
};

export type { ErrorAction, StoreError, PaymentStore, StatusResponseData };
