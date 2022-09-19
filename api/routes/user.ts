import {
  VerifyEmailResponseData,
  VerifyEmailRequestData,
  EditProfileResponseData,
  EditProfileRequestData,
  ProfileResponseData,
  OrdersResponseData,
  OrdersRequestData,
  OrderRequestData,
  OrderResponseData,
  ChangePasswordRequestData,
  ChangePasswordResponseData,
} from 'api/models/user';
import { ApiMethods } from 'constants/types';
import { getLinkApiProfileOrder } from 'utility/helpers/linkmakers';

import { sendRequestАuthentication } from '../utils';

const putPassword = ({
  newPassword,
  repeatNewPassword,
  currentPassword,
}: ChangePasswordRequestData) =>
  sendRequestАuthentication<ChangePasswordResponseData>({
    url: `/v1/user/profile/change-password/`,
    method: ApiMethods.PUT,
    config: {
      data: {
        password: newPassword,
        password2: repeatNewPassword,
        current_password: currentPassword,
      },
    },
  });

const getProfile = () =>
  sendRequestАuthentication<ProfileResponseData>({
    url: `/v1/user/profile/`,
    method: ApiMethods.GET,
  });

const patchProfileChanges = (data: EditProfileRequestData) =>
  sendRequestАuthentication<EditProfileResponseData>({
    url: `/v1/user/profile/`,
    method: ApiMethods.PATCH,
    config: { data },
  });

const postVerifyEmail = ({ code, email }: VerifyEmailRequestData) =>
  sendRequestАuthentication<VerifyEmailResponseData>({
    url: `/v1/user/profile/verify_email/`,
    method: ApiMethods.POST,
    config: {
      data: {
        code,
        email,
      },
    },
  });

const getOrders = ({
  order,
  created_after,
  created_before,
  page,
  size = 12,
}: OrdersRequestData) =>
  sendRequestАuthentication<OrdersResponseData>({
    url: getLinkApiProfileOrder({ order, created_after, created_before }),
    method: ApiMethods.GET,
    config: {
      params: {
        page,
        size,
      },
    },
  });

const getOrder = ({ orderId }: OrderRequestData) =>
  sendRequestАuthentication<OrderResponseData>({
    url: `/v1/user/profile/orders/${orderId}/`,
    method: ApiMethods.GET,
  });

export {
  putPassword,
  getProfile,
  patchProfileChanges,
  postVerifyEmail,
  getOrders,
  getOrder,
};
