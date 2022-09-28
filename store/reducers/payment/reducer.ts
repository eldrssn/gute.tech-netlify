import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  PaymentMethodResponseData,
  OrderingResponseErrorData,
  OrderingResponseData,
} from 'api/models/payment';

import {
  clearCreateOrdering,
  fetchPaymentMethods,
  fetchStatusPaymentAuthorized,
  fetchStatusPaymentUnAuthorized,
  createOrderingUnAuthorized,
} from './actions';
import { initialState } from './constants';

import { PaymentStore, ErrorAction, StatusResponseData } from './types';

const handlers = {
  [clearCreateOrdering.type]: (state: PaymentStore) => {
    state.createOrderingStatus.data = null;
    state.createOrderingStatus.errorCreateOrdering = null;
    state.createOrderingStatus.isCreateOrdering = false;
    state.createOrderingStatus.loadingCreateOrdering = false;
  },

  [fetchPaymentMethods.pending.type]: (state: PaymentStore) => {
    state.paymentMethods.isLoading = true;
  },
  [fetchPaymentMethods.fulfilled.type]: (
    state: PaymentStore,
    { payload }: PayloadAction<PaymentMethodResponseData[]>,
  ) => {
    state.paymentMethods.data = payload;
    state.paymentMethods.isLoading = false;
    state.paymentMethods.error = null;
  },
  [fetchPaymentMethods.rejected.type]: (
    state: PaymentStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.paymentMethods.isLoading = false;
    state.paymentMethods.error = errorData;
  },

  [fetchStatusPaymentAuthorized.pending.type]: (state: PaymentStore) => {
    state.paymentStatus.isLoading = true;
  },
  [fetchStatusPaymentAuthorized.fulfilled.type]: (
    state: PaymentStore,
    { payload }: PayloadAction<StatusResponseData>,
  ) => {
    state.paymentStatus.data = payload;
    state.paymentStatus.isLoading = false;
    state.paymentStatus.error = null;
  },
  [fetchStatusPaymentAuthorized.rejected.type]: (
    state: PaymentStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.paymentStatus.isLoading = false;
    state.paymentStatus.error = errorData;
  },

  [fetchStatusPaymentUnAuthorized.pending.type]: (state: PaymentStore) => {
    state.paymentStatus.isLoading = true;
  },
  [fetchStatusPaymentUnAuthorized.fulfilled.type]: (
    state: PaymentStore,
    { payload }: PayloadAction<StatusResponseData>,
  ) => {
    state.paymentStatus.data = payload;
    state.paymentStatus.isLoading = false;
    state.paymentStatus.error = null;
  },
  [fetchStatusPaymentUnAuthorized.rejected.type]: (
    state: PaymentStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.paymentStatus.isLoading = false;
    state.paymentStatus.error = errorData;
  },

  [createOrderingUnAuthorized.pending.type]: (state: PaymentStore) => {
    state.createOrderingStatus.loadingCreateOrdering = true;
    state.createOrderingStatus.errorCreateOrdering = null;
  },
  [createOrderingUnAuthorized.fulfilled.type]: (
    state: PaymentStore,
    { payload }: PayloadAction<OrderingResponseData>,
  ) => {
    state.createOrderingStatus.data = payload;
    state.createOrderingStatus.isCreateOrdering = true;
    state.createOrderingStatus.loadingCreateOrdering = false;
    state.createOrderingStatus.errorCreateOrdering = null;
  },
  [createOrderingUnAuthorized.rejected.type]: (
    state: PaymentStore,
    { payload }: PayloadAction<OrderingResponseErrorData>,
  ) => {
    state.createOrderingStatus.isCreateOrdering = false;
    state.paymentStatus.isLoading = false;
    state.createOrderingStatus.errorCreateOrdering = payload;
  },
};

const paymentReducer = createReducer(initialState, handlers);

export { paymentReducer };
