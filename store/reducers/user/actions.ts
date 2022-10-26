import { createAction } from '@reduxjs/toolkit';

import {
  getProfile,
  patchProfileChanges,
  postVerifyEmail,
  getOrders,
  getOrder,
  putPassword,
} from 'api/routes/user';
import {
  EditProfileResponseData,
  EditProfileRequestData,
  ProfileResponseData,
  VerifyEmailRequestData,
  VerifyEmailResponseData,
  OrdersRequestData,
  OrdersResponseData,
  OrderRequestData,
  OrderResponseData,
  ChangePasswordResponseData,
  ChangePasswordRequestData,
} from 'api/models/user';
import { createAsyncAction } from 'utility/helpers/store';

const resetVerifyEmail = createAction('user/resetVerifyEmail');
const resetEditProfile = createAction('user/resetEditProfile');
const resetChangePassword = createAction('user/resetChangePassword');
const clearUserProfileData = createAction('user/clearUserProfileData');

const changePassword = createAsyncAction<
  ChangePasswordResponseData,
  ChangePasswordRequestData
>({
  typeAction: 'user/changePassword',
  request: putPassword,
  shouldHandleError: true,
});

const fetchProfile = createAsyncAction<ProfileResponseData>({
  typeAction: 'user/fetchProfile',
  request: getProfile,
  shouldHandleError: true,
});

const editProfile = createAsyncAction<
  EditProfileResponseData,
  EditProfileRequestData
>({
  typeAction: 'user/editProfile',
  request: patchProfileChanges,
  shouldHandleError: true,
});

const verifyEmail = createAsyncAction<
  VerifyEmailResponseData,
  VerifyEmailRequestData
>({
  typeAction: 'user/verifyEmail',
  request: postVerifyEmail,
  shouldHandleError: true,
});

const fetchOrders = createAsyncAction<OrdersResponseData, OrdersRequestData>({
  typeAction: 'user/fetchOrders',
  request: getOrders,
  shouldHandleError: true,
});

const fetchOrder = createAsyncAction<OrderResponseData, OrderRequestData>({
  typeAction: 'user/fetchOrder',
  request: getOrder,
  shouldHandleError: true,
});

export {
  clearUserProfileData,
  changePassword,
  resetChangePassword,
  fetchProfile,
  editProfile,
  verifyEmail,
  resetVerifyEmail,
  resetEditProfile,
  fetchOrders,
  fetchOrder,
};
