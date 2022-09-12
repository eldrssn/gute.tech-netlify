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
    url: `/catalog/products/${productSlug}/`,
    method: ApiMethods.GET,
  });

//TODO: верхний удалить?/

const getProductsInfoFromSlugs = ({ productsOptions }: ProductsRequestData) =>
  sendRequest<ProductResponseData[]>({
    url: `/catalog/products/`,
    method: ApiMethods.POST,
    config: {
      data: getProductSlugList(productsOptions),
    },
  });

//TODO: получение корзины

const getCartAuthorized = () =>
  sendRequestАuthentication<CartResponseData[]>({
    url: `/payment/cart/`,
    method: ApiMethods.GET,
  });

const getCartUnAuthorized = () =>
  sendRequestNotAuthorized<CartResponseData[]>({
    url: `/payment/cart/`,
    method: ApiMethods.GET,
  });

//TODO: добавление товара в корзину

const postCartItemAuthorized = ({
  product,
  quantity,
}: CartAddItemRequestData) =>
  sendRequestАuthentication<CartAddItemResponseData>({
    url: `/payment/cart/add-item/`,
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
    url: `/payment/cart/add-item/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        quantity,
      },
    },
  });

//TODO: очищение корзины

const postCartClearAuthorized = () =>
  sendRequestАuthentication({
    url: `/payment/cart/clear/`,
    method: ApiMethods.POST,
  });

const postCartClearUnAuthorized = () =>
  sendRequestNotAuthorized({
    url: `/payment/cart/clear/`,
    method: ApiMethods.POST,
    config: {},
  });

//TODO: изменение количества продукта в корзине

const putCartItemUpdateAuthorized = (cartItems: CartUpdateItemRequestData[]) =>
  sendRequestАuthentication<CartUpdateItemResponeData>({
    url: `/payment/cart/update-item/`,
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
    url: `/payment/cart/update-item/`,
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
