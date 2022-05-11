import { sendRequest } from '../utils';

import {
  PaymentMethodResponseData,
  ProductResponseData,
  ProductRequestData,
  OrderingRequestData,
  OrderingResponseData,
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

export { getPaymentMethods, getProductInfoFromSlug, postOrdering };
