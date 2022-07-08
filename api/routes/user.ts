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
} from 'api/models/user';
import { ApiMethods } from 'constants/types';
import { getLinkApiProfileOrder } from 'utility/helpers/linkmakers';

import { sendRequestАuthentication } from '../utils';

const getProfile = () =>
  sendRequestАuthentication<ProfileResponseData>({
    url: `/user/profile/`,
    method: ApiMethods.GET,
  });

const patchProfileChanges = (data: EditProfileRequestData) =>
  sendRequestАuthentication<EditProfileResponseData>({
    url: `/user/profile/`,
    method: ApiMethods.PATCH,
    config: { data },
  });

const postVerifyEmail = ({ code, email }: VerifyEmailRequestData) =>
  sendRequestАuthentication<VerifyEmailResponseData>({
    url: `/user/profile/verify_email/`,
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
    url: `/user/profile/orders/${orderId}/`,
    method: ApiMethods.GET,
  });

export {
  getProfile,
  patchProfileChanges,
  postVerifyEmail,
  getOrders,
  getOrder,
};
