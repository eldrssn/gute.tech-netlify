import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  EditProfileResponseData,
  ProfileResponseData,
  VerifyEmailResponseData,
  OrdersResponseData,
  OrderResponseData,
  VerifyEmailResponseErrorData,
  EditProfileResponseErrorData,
  ChangePasswordResponseData,
  ChangePasswordResponseDataError,
} from 'api/models/user';

import {
  editProfile,
  fetchProfile,
  resetEditProfile,
  resetVerifyEmail,
  verifyEmail,
  fetchOrders,
  fetchOrder,
  changePassword,
  resetChangePassword,
  clearUserProfileData,
} from './actions';

import { initialState } from './constants';

import { UserStore, ErrorAction } from './types';

const handlers = {
  [resetChangePassword.type]: (state: UserStore) => {
    state.changePassword.data = null;
    state.changePassword.isLoading = false;
    state.changePassword.error = null;
  },
  [resetVerifyEmail.type]: (state: UserStore) => {
    state.verifyEmail.data = null;
    state.verifyEmail.isLoading = false;
    state.verifyEmail.error = null;
  },
  [resetEditProfile.type]: (state: UserStore) => {
    state.editProfile.data = null;
    state.editProfile.isLoading = false;
    state.editProfile.error = null;
  },
  [clearUserProfileData.type]: (state: UserStore) => {
    state.profile.data = {
      last_name: '',
      first_name: '',
      patronymic: '',
      phone_number: '',
      date_of_birthday: null,
      email: '',
      date_joined: '',
      transport: '',
      city: { title: '', slug: '' },
    };
  },

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

  [editProfile.pending.type]: (state: UserStore) => {
    state.editProfile.isLoading = true;
  },
  [editProfile.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<EditProfileResponseData>,
  ) => {
    state.editProfile.data = payload;
    state.editProfile.isLoading = false;
    state.editProfile.error = null;
  },
  [editProfile.rejected.type]: (
    state: UserStore,
    { payload }: PayloadAction<EditProfileResponseErrorData>,
  ) => {
    state.editProfile.data = null;
    state.editProfile.isLoading = false;
    state.editProfile.error = payload;
  },

  [verifyEmail.pending.type]: (state: UserStore) => {
    state.verifyEmail.isLoading = true;
  },
  [verifyEmail.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<VerifyEmailResponseData>,
  ) => {
    state.verifyEmail.data = payload;
    state.verifyEmail.isLoading = false;
    state.verifyEmail.error = null;
  },
  [verifyEmail.rejected.type]: (
    state: UserStore,
    { payload }: PayloadAction<VerifyEmailResponseErrorData>,
  ) => {
    state.verifyEmail.isLoading = false;
    state.verifyEmail.data = null;
    state.verifyEmail.error = payload;
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

  [changePassword.pending.type]: (state: UserStore) => {
    state.changePassword.isLoading = true;
  },
  [changePassword.fulfilled.type]: (
    state: UserStore,
    { payload }: PayloadAction<ChangePasswordResponseData>,
  ) => {
    state.changePassword.data = payload;
    state.changePassword.isLoading = false;
    state.changePassword.error = null;
  },
  [changePassword.rejected.type]: (
    state: UserStore,
    { payload }: PayloadAction<ChangePasswordResponseDataError>,
  ) => {
    state.changePassword.isLoading = false;
    state.changePassword.data = null;
    state.changePassword.error = payload;
  },
};

const userReducer = createReducer(initialState, handlers);

export { userReducer };
