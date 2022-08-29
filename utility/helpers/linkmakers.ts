import { QueryUrl } from 'constants/variables';
import { Slug, Slugs } from 'types';
import { CATALOG_QUERY_DEFAULT } from 'utility/utils/constants';
import { makeStringify } from '.';
import { OrdersRequestData } from 'api/models/user';

const getLinkToProductPage = ({
  categorySlug,
  subcategorySlug,
  productSlug,
}: Slugs) =>
  `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}/${makeStringify(productSlug)}`;

const getLinkToParentCategory = (categorySlug: Slug) =>
  `catalog/${categorySlug}`;

const getLinkToCategory = (categorySlug: Slug) =>
  `/catalog/${makeStringify(categorySlug)}`;

const getLinkToCatalog = ({ categorySlug, subcategorySlug }: Slugs) =>
  `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}?${CATALOG_QUERY_DEFAULT}`;

const getTransportSlugs = ({ transportId }: Slugs) =>
  `&${QueryUrl.TRANSPORT_ID}=${makeStringify(transportId)}`;

const getLinkToTransportCatalog = ({
  categorySlug,
  subcategorySlug,
  transportId,
}: Slugs) => {
  const transportSlugs = getTransportSlugs({ transportId });

  return `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}?${transportSlugs}&${CATALOG_QUERY_DEFAULT}`;
};

const getLinkToTransportProductPage = ({
  categorySlug,
  subcategorySlug,
  productSlug,
  transportId,
}: Slugs) => {
  const transportSlugs = getTransportSlugs({ transportId });

  return `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}/${makeStringify(productSlug)}?${transportSlugs}`;
};

const getLinkApiProfileOrder = ({
  order,
  created_after,
  created_before,
}: Omit<OrdersRequestData, 'size' | 'page'>) =>
  `/user/profile/orders/?${order ? `ordering=${order}` : ``}${
    created_after ? `&created_after=${created_after}` : ``
  }${created_before ? `&created_before=${created_before}` : ``}`;

export {
  getLinkApiProfileOrder,
  getLinkToProductPage,
  getLinkToTransportProductPage,
  getLinkToCategory,
  getLinkToParentCategory,
  getLinkToCatalog,
  getLinkToTransportCatalog,
  getTransportSlugs,
};
