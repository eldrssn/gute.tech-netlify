import { QueryUrl } from 'constants/variables';
import { Slugs } from 'types';
import { CATALOG_QUERY_DEFAULT, PRODUCT_MARKER } from 'utility/utils/constants';
import { makeStringify } from '.';
import { OrdersRequestData } from 'api/models/user';

const getTransportSlugs = ({ transportId }: Slugs) =>
  `&${QueryUrl.TRANSPORT_ID}=${makeStringify(transportId)}`;

const getLinkToProductPage = ({
  asPath,
  productSlug,
  transportId,
}: {
  asPath: string;
  productSlug: string;
  transportId: string;
}) =>
  `${asPath.split('?')[0]}/${PRODUCT_MARKER}${productSlug}${
    transportId && `?${QueryUrl.TRANSPORT_ID}=${makeStringify(transportId)}`
  }`;

const getLinkToParentCategory = ({
  categorySlug,
  transportId,
}: {
  categorySlug: string;
  transportId: string;
}) =>
  `/catalog/${categorySlug}?${CATALOG_QUERY_DEFAULT}${
    transportId && getTransportSlugs({ transportId })
  }`;

const getLinkToCategoryFromCatalog = ({
  categorySlug,
  subCategorySlug,
  transportId,
}: {
  categorySlug: string;
  subCategorySlug: string;
  transportId: string;
}) =>
  `/catalog/${categorySlug}/${subCategorySlug}?${CATALOG_QUERY_DEFAULT}${
    transportId && getTransportSlugs({ transportId })
  }`;

const getLinkToCatalog = ({
  asPath,
  categorySlug,
  transportId,
}: {
  asPath: string;
  categorySlug: string;
  transportId: string;
}) =>
  `${asPath.split('?')[0]}/${categorySlug}?${CATALOG_QUERY_DEFAULT}${
    transportId && getTransportSlugs({ transportId })
  }`;

const getLinkResetFilters = ({
  asPath,
  transportId,
}: {
  asPath: string;
  transportId: string;
}) =>
  `${asPath.split('?')[0]}?${CATALOG_QUERY_DEFAULT}${
    transportId && getTransportSlugs({ transportId })
  }`;

const getLinkApiProfileOrder = ({
  order,
  created_after,
  created_before,
  search,
}: Omit<OrdersRequestData, 'size' | 'page'>) =>
  `/v1/user/profile/orders/?${order ? `ordering=${order}` : ``}${
    created_after ? `&created_after=${created_after}` : ``
  }${created_before ? `&created_before=${created_before}` : ``}${
    search ? `&search=${search}` : ``
  }`;

const getLinkToProduct = ({
  categories,
  productSlug,
}: {
  categories: string[];
  productSlug: string;
}) =>
  `/catalog/${categories.reduce(
    (previousValue, currentValue) => `${previousValue}/${currentValue}`,
  )}/product_${productSlug}`;

const getLinkToCategory = ({ categories }: { categories: string[] }) =>
  `/catalog/${categories.reduce(
    (previousValue, currentValue) => `${previousValue}/${currentValue}`,
  )}`;

export {
  getLinkToProduct,
  getLinkResetFilters,
  getLinkApiProfileOrder,
  getLinkToProductPage,
  getLinkToParentCategory,
  getLinkToCatalog,
  getLinkToCategoryFromCatalog,
  getTransportSlugs,
  getLinkToCategory,
};
