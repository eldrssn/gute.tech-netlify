import { sendRequestАuthentication } from '../utils';
import {
  ProfileResponseData,
  OrdersResponseData,
  OrdersRequestData,
  OrderRequestData,
  OrderResponseData,
} from 'api/models/user';
import { ApiMethods } from 'constants/types';
import { getLinkApiProfileOrder } from 'utility/helpers/linkmakers';

const getProfile = () =>
  sendRequestАuthentication<ProfileResponseData>({
    url: `/user/profile/`,
    method: ApiMethods.GET,
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

export { getProfile, getOrders, getOrder };
