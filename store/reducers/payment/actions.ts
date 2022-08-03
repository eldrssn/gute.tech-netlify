import { createAction } from '@reduxjs/toolkit';

import {
  getPaymentMethods,
  getStatus,
  postOrderingUnAuthorized,
  postOrderingAuthorized,
} from 'api/routes/payment';
import {
  StatusRequestData,
  StatusResponseData,
  PaymentMethodResponseData,
  OrderingRequestData,
  OrderingResponseData,
} from 'api/models/payment';
import { createAsyncAction } from 'utility/helpers/store';

const clearCreateOrdering = createAction('clearCreateOrdering');

const fetchPaymentMethods = createAsyncAction<PaymentMethodResponseData[]>({
  typeAction: 'CartStore/fetchPaymentMethods',
  request: getPaymentMethods,
});

const fetchStatusPayment = createAsyncAction<
  StatusResponseData,
  StatusRequestData
>({
  typeAction: 'CartStore/fetchStatusPayment',
  request: getStatus,
});

const createOrderingUnAuthorized = createAsyncAction<
  OrderingResponseData,
  OrderingRequestData
>({
  typeAction: 'CartStore/postOrdering',
  request: postOrderingUnAuthorized,
  shouldHandleError: true,
});

const createOrderingAuthorized = createAsyncAction<
  OrderingResponseData,
  OrderingRequestData
>({
  typeAction: 'CartStore/postOrdering',
  request: postOrderingAuthorized,
  shouldHandleError: true,
});

export {
  clearCreateOrdering,
  createOrderingUnAuthorized,
  createOrderingAuthorized,
  fetchPaymentMethods,
  fetchStatusPayment,
};
