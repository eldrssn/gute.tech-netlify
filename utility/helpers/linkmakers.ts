import { QueryUrl } from 'constants/variables';
import { Slug, Slugs } from 'types';
import { CATALOG_QUERY_DEFAULT } from 'utility/utils/constants';
import { makeStringify } from '.';

const getLinkToProductPage = ({
  categorySlug,
  subcategorySlug,
  productSlug,
}: Slugs) =>
  `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}/${makeStringify(productSlug)}`;

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

const getLinkToVidgetCategory = (categorySlug: string) => {
  return `/?${QueryUrl.CATEGORY_QUERY}=${categorySlug}`;
};

export {
  getLinkToProductPage,
  getLinkToTransportProductPage,
  getLinkToCategory,
  getLinkToCatalog,
  getLinkToTransportCatalog,
  getTransportSlugs,
  getLinkToVidgetCategory,
};
