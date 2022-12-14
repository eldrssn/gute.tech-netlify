import {
  sendRequest,
  sendRequestАuthentication,
  sendRequestNotAuthorized,
} from '../utils';

import {
  ProductResponseData,
  ProductRequestData,
  ProductsRequestData,
  CartResponseData,
  CartAddItemRequestData,
  CartUpdateItemRequestData,
  CartItemRequestData,
} from '../models/cart';
import { ApiMethods } from 'constants/types';
import { getProductSlugList } from 'utility/helpers/index';

const getProductInfoFromSlug = ({ productSlug }: ProductRequestData) =>
  sendRequest<ProductResponseData>({
    url: `/v1/catalog/products/${productSlug}/`,
    method: ApiMethods.GET,
  });

const getProductsInfoFromSlugs = ({ productsOptions }: ProductsRequestData) =>
  sendRequest<ProductResponseData[]>({
    url: `/v1/catalog/products/`,
    method: ApiMethods.POST,
    config: {
      data: getProductSlugList(productsOptions),
    },
  });

const getCartAuthorized = ({ transport, city }: CartItemRequestData) =>
  sendRequestАuthentication<CartResponseData[]>({
    url: `/v1/payment/cart/`,
    method: ApiMethods.POST,
    config: {
      data: {
        transport,
        city,
      },
    },
  });

const getCartUnAuthorized = ({ transport, city }: CartItemRequestData) =>
  sendRequestNotAuthorized<CartResponseData[]>({
    url: `/v1/payment/cart/`,
    method: ApiMethods.POST,
    config: {
      data: {
        transport,
        city,
      },
    },
  });

const postCartItemAuthorized = ({
  product,
  quantity,
  with_installation,
  transport,
  city,
}: CartAddItemRequestData) =>
  sendRequestАuthentication<CartResponseData[]>({
    url: `/v1/payment/cart/add-item/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        quantity,
        with_installation,
        transport,
        city,
      },
    },
  });

const postCartItemUnAuthorized = ({
  product,
  quantity,
  with_installation,
  transport,
  city,
}: CartAddItemRequestData) =>
  sendRequestNotAuthorized<CartResponseData[]>({
    url: `/v1/payment/cart/add-item/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        quantity,
        with_installation,
        transport,
        city,
      },
    },
  });

const postCartClearAuthorized = () =>
  sendRequestАuthentication({
    url: `/v1/payment/cart/clear/`,
    method: ApiMethods.POST,
  });

const postCartClearUnAuthorized = () =>
  sendRequestNotAuthorized({
    url: `/v1/payment/cart/clear/`,
    method: ApiMethods.POST,
    config: {},
  });

const putCartItemUpdateAuthorized = ({
  items,
  transport,
  city,
}: CartUpdateItemRequestData) =>
  sendRequestАuthentication<CartResponseData[]>({
    url: `/v1/payment/cart/update-item/`,
    method: ApiMethods.PUT,
    config: {
      data: {
        items: items,
        transport,
        city,
      },
    },
  });

const putCartItemUpdateUnAuthorized = ({
  items,
  transport,
  city,
}: CartUpdateItemRequestData) =>
  sendRequestNotAuthorized<CartResponseData[]>({
    url: `/v1/payment/cart/update-item/`,
    method: ApiMethods.PUT,
    config: {
      data: {
        items: items,
        transport,
        city,
      },
    },
  });

export {
  getProductInfoFromSlug,
  getProductsInfoFromSlugs,
  getCartAuthorized,
  getCartUnAuthorized,
  postCartItemAuthorized,
  postCartItemUnAuthorized,
  postCartClearAuthorized,
  postCartClearUnAuthorized,
  putCartItemUpdateAuthorized,
  putCartItemUpdateUnAuthorized,
};
