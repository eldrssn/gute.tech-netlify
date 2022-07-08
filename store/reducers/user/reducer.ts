import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  ProfileResponseData,
  OrdersResponseData,
  OrderResponseData,
} from 'api/models/user';
import { fetchProfile, fetchOrders, fetchOrder } from './actions';
import { initialState } from './constants';

import { UserStore, ErrorAction } from './types';

const handlers = {
  [fetchProfile.pending.type]: (state: UserStore) => {
    state.profile.isLoading = true;
  },
  [fetchProfile.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<ProfileResponseData>,
  ) => {
    state.profile.data = payload;
    state.profile.isLoading = false;
    state.profile.error = null;
  },
  [fetchProfile.rejected.type]: (state: UserStore, { error }: ErrorAction) => {
    const errorData = { name: error.name, message: error.message };
    state.profile.isLoading = false;
    state.profile.error = errorData;
  },

  [fetchOrders.pending.type]: (state: UserStore) => {
    state.orders.isLoading = true;
  },
  [fetchOrders.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<OrdersResponseData>,
  ) => {
    state.orders.data = payload;
    state.orders.isLoading = false;
    state.orders.error = null;
  },
  [fetchOrders.rejected.type]: (state: UserStore, { error }: ErrorAction) => {
    const errorData = { name: error.name, message: error.message };
    state.orders.isLoading = false;
    state.orders.error = errorData;
  },

  [fetchOrder.pending.type]: (state: UserStore) => {
    state.order.isLoading = true;
  },
  [fetchOrder.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<OrderResponseData>,
  ) => {
    state.order.data = payload;
    state.order.isLoading = false;
    state.order.error = null;
  },
  [fetchOrder.rejected.type]: (state: UserStore, { error }: ErrorAction) => {
    const errorData = { name: error.name, message: error.message };
    state.order.isLoading = false;
    state.order.error = errorData;
  },
};

const userReducer = createReducer(initialState, handlers);

export { userReducer };
