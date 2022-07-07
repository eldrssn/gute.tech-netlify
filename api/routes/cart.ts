import { sendRequest, sendRequestАuthentication } from '../utils';

import {
  PaymentMethodResponseData,
  ProductResponseData,
  StatusResponseData,
  ProductRequestData,
  OrderingRequestData,
  OrderingResponseData,
  StatusRequestData,
} from '../models/cart';
import { ApiMethods } from 'constants/types';

const getPaymentMethods = () =>
  sendRequest<PaymentMethodResponseData[]>({
    url: `/payment/methods/`,
    method: ApiMethods.GET,
  });

const getProductInfoFromSlug = ({ productSlug }: ProductRequestData) =>
  sendRequest<ProductResponseData>({
    url: `/catalog/products/${productSlug}/`,
    method: ApiMethods.GET,
  });

const postOrderingUnAuthorized = (data: OrderingRequestData) =>
  sendRequest<OrderingResponseData>({
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
  getProductInfoFromSlug,
  postOrderingAuthorized,
  postOrderingUnAuthorized,
  getStatus,
};
