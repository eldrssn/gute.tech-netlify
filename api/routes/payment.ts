import {
  sendRequest,
  sendRequestАuthentication,
  sendRequestNotAuthorized,
} from '../utils';

import {
  PaymentMethodResponseData,
  StatusResponseData,
  OrderingRequestData,
  OrderingResponseData,
  StatusRequestData,
} from '../models/payment';
import { ApiMethods } from 'constants/types';

const getPaymentMethods = () =>
  sendRequest<PaymentMethodResponseData[]>({
    url: `/payment/methods/`,
    method: ApiMethods.GET,
  });

const postOrderingUnAuthorized = (data: OrderingRequestData) =>
  sendRequestNotAuthorized<OrderingResponseData>({
    url: `/payment/orders/`,
    method: ApiMethods.POST,
    config: {
      data: data,
    },
  });

const postOrderingAuthorized = (data: OrderingRequestData) =>
  sendRequestАuthentication<OrderingResponseData>({
    url: `/payment/orders/`,
    method: ApiMethods.POST,
    config: {
      data: data,
    },
  });

const getStatus = ({ orderId }: StatusRequestData) =>
  sendRequest<StatusResponseData>({
    url: `payment/status/`,
    method: ApiMethods.GET,
    config: {
      params: {
        orderId,
      },
    },
  });

export {
  getPaymentMethods,
  postOrderingAuthorized,
  postOrderingUnAuthorized,
  getStatus,
};
