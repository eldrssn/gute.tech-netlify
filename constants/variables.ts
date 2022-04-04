import { DescriptionType, DescriptionTypes } from 'types/product';

export const MOBILE_WIDTH = 830;
export const TABLET_WIDTH = 1200;
export const SCROLL_DELAY = 300;

export const descriptionTypeName = [
  DescriptionTypes.characteristic,
  DescriptionTypes.description,
  DescriptionTypes.installation,
  DescriptionTypes.faq,
];

export const tabNameByType: Record<DescriptionType, string> = {
  [DescriptionTypes.characteristic]: 'Характеристики',
  [DescriptionTypes.description]: 'Описание',
  [DescriptionTypes.installation]: 'Установка',
  [DescriptionTypes.faq]: 'Вопросы и ответы',
};

export const DEV_HOST = 'dev.gute.tech';

export const CATEGORY_QUERY = 'category';
