import {
  getProfile,
  patchProfileChanges,
  postVerifyEmail,
  getOrders,
  getOrder,
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
} from 'api/models/user';
import { createAsyncAction } from 'utility/helpers/store';
import { createAction } from '@reduxjs/toolkit';

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

const resetVerifyEmail = createAction('user/resetVerifyEmail');
const resetEditProfile = createAction('user/resetEditProfile');

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
  fetchProfile,
  editProfile,
  verifyEmail,
  resetVerifyEmail,
  resetEditProfile,
  fetchOrders,
  fetchOrder,
};
