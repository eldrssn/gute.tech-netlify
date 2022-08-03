import { sendRequest } from '../utils';

import {
  ProductResponseData,
  ProductRequestData,
  ProductsRequestData,
} from '../models/cart';
import { ApiMethods } from 'constants/types';
import { getProductSlugList } from 'utility/helpers/index';

const getProductInfoFromSlug = ({ productSlug }: ProductRequestData) =>
  sendRequest<ProductResponseData>({
    url: `/catalog/products/${productSlug}/`,
    method: ApiMethods.GET,
  });

const getProductsInfoFromSlugs = ({ productsOptions }: ProductsRequestData) =>
  sendRequest<ProductResponseData[]>({
    url: `/catalog/products/`,
    method: ApiMethods.POST,
    config: {
      data: getProductSlugList(productsOptions),
    },
  });

export { getProductInfoFromSlug, getProductsInfoFromSlugs };
