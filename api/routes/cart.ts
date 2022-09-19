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
  CartAddItemResponseData,
  CartUpdateItemRequestData,
  CartUpdateItemResponeData,
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

const getCartAuthorized = () =>
  sendRequestАuthentication<CartResponseData[]>({
    url: `/v1/payment/cart/`,
    method: ApiMethods.GET,
  });

const getCartUnAuthorized = () =>
  sendRequestNotAuthorized<CartResponseData[]>({
    url: `/v1/payment/cart/`,
    method: ApiMethods.GET,
  });

const postCartItemAuthorized = ({
  product,
  quantity,
}: CartAddItemRequestData) =>
  sendRequestАuthentication<CartAddItemResponseData>({
    url: `/v1/payment/cart/add-item/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        quantity,
      },
    },
  });

const postCartItemUnAuthorized = ({
  product,
  quantity,
}: CartAddItemRequestData) =>
  sendRequestNotAuthorized<CartAddItemResponseData>({
    url: `/v1/payment/cart/add-item/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        quantity,
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

const putCartItemUpdateAuthorized = (cartItems: CartUpdateItemRequestData[]) =>
  sendRequestАuthentication<CartUpdateItemResponeData>({
    url: `/v1/payment/cart/update-item/`,
    method: ApiMethods.PUT,
    config: {
      data: {
        items: cartItems,
      },
    },
  });

const putCartItemUpdateUnAuthorized = (
  cartItems: CartUpdateItemRequestData[],
) =>
  sendRequestNotAuthorized<CartUpdateItemResponeData>({
    url: `/v1/payment/cart/update-item/`,
    method: ApiMethods.PUT,
    config: {
      data: {
        items: cartItems,
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
