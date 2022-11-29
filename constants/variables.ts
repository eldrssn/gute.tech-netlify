import { DescriptionType, DescriptionTypes } from 'types/product';

const MOBILE_WIDTH = 830;
const MOBILE_XS_WIDTH = 479;
const TABLET_WIDTH = 1200;
const DELAY = 500;
const SCROLL_DELAY = DELAY;
const CATALOG_MOBILE_WIDTH = 450;
const HIDE_PHONE_WIDTH = 1000;
const TOKEN_CACHE_TTL = 30 * 24 * 60 * 60 * 1000;
const TOKEN_CACHE_TTL_DELETE = -1 * 24 * 60 * 60 * 1000;
const TIMER_DELAY = 59;
const COOKIE_TTL = 30 * 24 * 60 * 60 * 1000;
const MIN_FILTERS_COUNT = 8;
const STRINGIFY_FALSE = 'false';

const descriptionTypeName = [
  DescriptionTypes.properties,
  DescriptionTypes.analogues,
  DescriptionTypes.description,
  DescriptionTypes.installation,
  DescriptionTypes.reviews,
];

const tabNameByType: Record<DescriptionType, string> = {
  [DescriptionTypes.properties]: 'Характеристики',
  [DescriptionTypes.analogues]: 'Аналоги',
  [DescriptionTypes.description]: 'Описание',
  [DescriptionTypes.installation]: 'Установка',
  [DescriptionTypes.reviews]: 'Отзывы',
};

const DEV_HOST = 'dev.gute.tech';

enum QueryUrl {
  BRAND_SLUG = 'brandSlug',
  MODEL_SLUG = 'modelSlug',
  YEAR_SLUG = 'yearSlug',
  ENGINE_SLUG = 'engineSlug',
  CATEGORY_QUERY = 'category',
  TRANSPORT_ID = 'transport_id',
}

enum Slugs {
  BRAND_SLUG = 'brandSlug',
  MODEL_SLUG = 'modelSlug',
  YEAR_SLUG = 'yearSlug',
  ENGINE_SLUG = 'engineSlug',
}

export {
  TIMER_DELAY,
  COOKIE_TTL,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  MOBILE_XS_WIDTH,
  HIDE_PHONE_WIDTH,
  DELAY,
  SCROLL_DELAY,
  CATALOG_MOBILE_WIDTH,
  TOKEN_CACHE_TTL,
  TOKEN_CACHE_TTL_DELETE,
  descriptionTypeName,
  tabNameByType,
  DEV_HOST,
  QueryUrl,
  Slugs,
  MIN_FILTERS_COUNT,
  STRINGIFY_FALSE,
};
