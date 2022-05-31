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

const getTransportSlugs = ({ transportQuery, transportId }: Slugs) => {
  const isTransportQuery =
    Array.isArray(transportQuery) && transportQuery.length > 0;

  if (isTransportQuery) {
    const transportQueryFormatted = transportQuery.map(
      (query) => `${QueryUrl.TRANSPORT_QUERY}=${query}`,
    );
    return `${transportQueryFormatted.join('&')}&${
      QueryUrl.TRANSPORT_ID
    }=${makeStringify(transportId)}`;
  }
};

const getLinkToTransportCatalog = ({
  categorySlug,
  subcategorySlug,
  transportQuery,
  transportId,
}: Slugs) => {
  const transportSlugs = getTransportSlugs({ transportQuery, transportId });

  return `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}?${transportSlugs}&${CATALOG_QUERY_DEFAULT}`;
};

const getLinkToTransportProductPage = ({
  categorySlug,
  subcategorySlug,
  productSlug,
  transportQuery,
  transportId,
}: Slugs) => {
  const transportSlugs = getTransportSlugs({ transportQuery, transportId });

  return `/catalog/${makeStringify(categorySlug)}/${makeStringify(
    subcategorySlug,
  )}/${makeStringify(productSlug)}?${transportSlugs}`;
};

export {
  getLinkToProductPage,
  getLinkToTransportProductPage,
  getLinkToCategory,
  getLinkToCatalog,
  getLinkToTransportCatalog,
  getTransportSlugs,
};
