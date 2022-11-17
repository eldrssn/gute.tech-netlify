import { createAction } from '@reduxjs/toolkit';

import {
  getPaymentMethods,
  getStatusAuthorized,
  getStatusUnAuthorized,
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
const clearStatus = createAction('clearStatus');

const fetchPaymentMethods = createAsyncAction<PaymentMethodResponseData[]>({
  typeAction: 'CartStore/fetchPaymentMethods',
  request: getPaymentMethods,
});

const fetchStatusPaymentAuthorized = createAsyncAction<
  StatusResponseData,
  StatusRequestData
>({
  typeAction: 'CartStore/fetchStatusPayment',
  request: getStatusAuthorized,
});

const fetchStatusPaymentUnAuthorized = createAsyncAction<
  StatusResponseData,
  StatusRequestData
>({
  typeAction: 'CartStore/fetchStatusPayment',
  request: getStatusUnAuthorized,
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
  clearStatus,
  clearCreateOrdering,
  createOrderingUnAuthorized,
  createOrderingAuthorized,
  fetchPaymentMethods,
  fetchStatusPaymentAuthorized,
  fetchStatusPaymentUnAuthorized,
};
