import { sendRequest, sendRequestАuthentication } from '../utils';

import {
  ProductTransportListResponseData,
  ProductBrandsListRequestData,
  ProductModelsListRequestData,
  ProductYearsListRequestData,
  ProductTransportListRequestData,
  RecommendedProductsListRequestData,
  RecommendedResponceData,
  ProductsReadRequestData,
  ProductReadResponseData,
  ProductAnaloguesResponseData,
  ProductReviewsListRequestData,
  ProductReviewsListResponseData,
  ProductReviewRequestData,
} from 'api/models/product';
import { ApiMethods } from 'constants/types';
import { makeStringify } from 'utility/helpers';

const getCategoriesProductsRead = ({ productSlug }: ProductsReadRequestData) =>
  sendRequest<ProductReadResponseData>({
    url: `/v1/catalog/products/${productSlug}/`,
    method: ApiMethods.GET,
  });

const getProductAnaloguesRead = ({ productSlug }: ProductsReadRequestData) =>
  sendRequest<ProductAnaloguesResponseData>({
    url: `/v1/catalog/products/${productSlug}/analogues/`,
    method: ApiMethods.GET,
  });

const getRecommendedProductsList = ({
  productSlug,
  categorySlug,
  transportId,
}: RecommendedProductsListRequestData) => {
  const category = makeStringify(categorySlug);
  const product = makeStringify(productSlug);
  const transport = transportId ? transportId : undefined;

  return sendRequest<RecommendedResponceData>({
    url: `/v1/catalog/recommendations/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product,
        category,
        transport,
      },
    },
  });
};

const getProductBrandsList = ({ productSlug }: ProductBrandsListRequestData) =>
  sendRequest<ProductTransportListResponseData[]>({
    url: `/v1/catalog/products/${productSlug}/brands/`,
    method: ApiMethods.GET,
  });

const getProductModelsList = ({
  productSlug,
  brandSlug,
}: ProductModelsListRequestData) =>
  sendRequest<ProductTransportListResponseData[]>({
    url: `/v1/catalog/products/${productSlug}/brands/${brandSlug}/models/`,
    method: ApiMethods.GET,
  });

const getProductYearsList = ({
  productSlug,
  brandSlug,
  modelSlug,
}: ProductYearsListRequestData) =>
  sendRequest<ProductTransportListResponseData[]>({
    url: `/v1/catalog/products/${productSlug}/brands/${brandSlug}/models/${modelSlug}/years/`,
    method: ApiMethods.GET,
  });

const getProductTransportsList = ({
  productSlug,
  brandSlug,
  modelSlug,
  yearSlug,
}: ProductTransportListRequestData) =>
  sendRequest<ProductTransportListResponseData[]>({
    url: `/v1/catalog/products/${productSlug}/brands/${brandSlug}/models/${modelSlug}/years/${yearSlug}/transport/`,
    method: ApiMethods.GET,
  });

const getProductReviewsList = ({
  productSlug,
  page = 1,
}: ProductReviewsListRequestData) =>
  sendRequest<ProductReviewsListResponseData>({
    url: `/v1/review/${productSlug}/?page=${page}&size=5`,
    method: ApiMethods.GET,
  });

const postProductReview = ({
  productSlug,
  grade,
  comment = null,
}: ProductReviewRequestData) =>
  sendRequestАuthentication({
    url: `/v1/review/`,
    method: ApiMethods.POST,
    config: {
      data: {
        product_slug: productSlug,
        grade,
        comment,
      },
    },
  });

export {
  getProductBrandsList,
  getProductModelsList,
  getProductYearsList,
  getProductTransportsList,
  getRecommendedProductsList,
  getCategoriesProductsRead,
  getProductAnaloguesRead,
  getProductReviewsList,
  postProductReview,
};
