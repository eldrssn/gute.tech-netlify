import { QueryUrl } from 'constants/variables';
import { Slugs } from 'types';
import { CATALOG_QUERY_DEFAULT } from 'utility/utils/constants';
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
  `${asPath.split('?')[0]}/product_${productSlug}${
    transportId && getTransportSlugs({ transportId })
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
}: Omit<OrdersRequestData, 'size' | 'page'>) =>
  `/user/profile/orders/?${order ? `ordering=${order}` : ``}${
    created_after ? `&created_after=${created_after}` : ``
  }${created_before ? `&created_before=${created_before}` : ``}`;

export {
  getLinkResetFilters,
  getLinkApiProfileOrder,
  getLinkToProductPage,
  getLinkToParentCategory,
  getLinkToCatalog,
  getLinkToCategoryFromCatalog,
  getTransportSlugs,
};
