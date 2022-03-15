import { DescriptionType, DescriptionTypes } from 'types/productTypes';

export const MOBILE_WIDTH = 600;
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
