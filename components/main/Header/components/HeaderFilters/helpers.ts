import { QueryUrl, Slugs } from 'constants/variables';
import { FilterFields } from 'components/main/Header/types';

const getTransportParams = (data: FilterFields, transportId: string) => {
  const { brand, model, year, engine } = data;
  return `/?${QueryUrl.TRANSPORT_QUERY}=${Slugs.BRAND_SLUG}=${brand.slug}&${QueryUrl.TRANSPORT_QUERY}=${Slugs.MODEL_SLUG}=${model.slug}&${QueryUrl.TRANSPORT_QUERY}=${Slugs.YEAR_SLUG}=${year.slug}&${QueryUrl.TRANSPORT_QUERY}=${Slugs.ENGINE_SLUG}=${engine.slug}&${QueryUrl.TRANSPORT_ID}=${transportId}`;
};

export { getTransportParams };
