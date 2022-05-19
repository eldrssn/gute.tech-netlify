import { DescriptionType, DescriptionTypes } from 'types/product';

const MOBILE_WIDTH = 830;
const MOBILE_XS_WIDTH = 479;
const TABLET_WIDTH = 1200;
const DELAY = 500;
const SCROLL_DELAY = DELAY;
const CATALOG_MOBILE_WIDTH = 450;

const descriptionTypeName = [
  DescriptionTypes.properties,
  DescriptionTypes.description,
  DescriptionTypes.installation,
  DescriptionTypes.faq,
];

const tabNameByType: Record<DescriptionType, string> = {
  [DescriptionTypes.properties]: 'Характеристики',
  [DescriptionTypes.description]: 'Описание',
  [DescriptionTypes.installation]: 'Установка',
  [DescriptionTypes.faq]: 'Вопросы и ответы',
};

const DEV_HOST = 'dev.gute.tech';

enum QueryUrl {
  CATEGORY_QUERY = 'category',
  TRANSPORT_QUERY = 'transport',
}

enum Slugs {
  BRAND_SLUG = 'brandSlug',
  MODEL_SLUG = 'modelSlug',
  YEAR_SLUG = 'yearSlug',
  ENGINE_SLUG = 'engineSlug',
}

export {
  MOBILE_WIDTH,
  TABLET_WIDTH,
  MOBILE_XS_WIDTH,
  DELAY,
  SCROLL_DELAY,
  CATALOG_MOBILE_WIDTH,
  descriptionTypeName,
  tabNameByType,
  DEV_HOST,
  QueryUrl,
  Slugs,
};
