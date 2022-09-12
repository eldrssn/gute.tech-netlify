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
    transportId && getTransportSlugs({ transportId })
  }`;

const getLinkToProductPageFromSlider = ({
  asPath,
  productSlug,
  transportId,
  categorySlug,
}: {
  asPath: string;
  productSlug: string;
  transportId: string;
  categorySlug: string;
}) => {
  const path = asPath.split('?')[0];
  const [catalog, mainCategory] = path.split('/');

  return `/${catalog}/${mainCategory}/${categorySlug}/${PRODUCT_MARKER}${productSlug}${
    transportId && getTransportSlugs({ transportId })
  }`;
};

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
  getLinkToProductPageFromSlider,
  getLinkToParentCategory,
  getLinkToCatalog,
  getLinkToCategoryFromCatalog,
  getTransportSlugs,
  getLinkToCategory,
};
