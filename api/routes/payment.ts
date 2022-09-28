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
    url: `/v1/payment/methods/`,
    method: ApiMethods.GET,
  });

const postOrderingUnAuthorized = (data: OrderingRequestData) =>
  sendRequestNotAuthorized<OrderingResponseData>({
    url: `/v1/payment/orders/`,
    method: ApiMethods.POST,
    config: {
      data: data,
    },
  });

const postOrderingAuthorized = (data: OrderingRequestData) =>
  sendRequestАuthentication<OrderingResponseData>({
    url: `/v1/payment/orders/`,
    method: ApiMethods.POST,
    config: {
      data: data,
    },
  });

const getStatusAuthorized = ({ orderId }: StatusRequestData) =>
  sendRequestАuthentication<StatusResponseData>({
    url: `/v1/payment/status/`,
    method: ApiMethods.GET,
    config: {
      params: {
        orderId,
      },
    },
  });

const getStatusUnAuthorized = ({ orderId }: StatusRequestData) =>
  sendRequestNotAuthorized<StatusResponseData>({
    url: `/v1/payment/status/`,
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
  getStatusAuthorized,
  getStatusUnAuthorized,
};
