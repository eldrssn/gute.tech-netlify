import { sendRequest } from '../utils';

import {
  PaymentMethodResponseData,
  ProductResponseData,
  StatusResponseData,
  ProductRequestData,
  OrderingRequestData,
  OrderingResponseData,
  StatusRequestData,
} from '../models/cart';

const getPaymentMethods = () =>
  sendRequest<PaymentMethodResponseData[]>({
    url: `/payment/methods/`,
    method: 'get',
  });

const getProductInfoFromSlug = ({ productSlug }: ProductRequestData) =>
  sendRequest<ProductResponseData>({
    url: `/catalog/products/${productSlug}/`,
    method: 'get',
  });

const postOrdering = (data: OrderingRequestData) =>
  sendRequest<OrderingResponseData>({
    url: `/payment/orders/`,
    method: 'post',
    config: {
      data: data,
    },
  });

const getStatus = ({ orderId }: StatusRequestData) =>
  sendRequest<StatusResponseData>({
    url: `payment/status/`,
    method: 'get',
    config: {
      params: {
        orderId,
      },
    },
  });

export { getPaymentMethods, getProductInfoFromSlug, postOrdering, getStatus };
