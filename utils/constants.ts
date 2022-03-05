import { DescriptionType, DescriptionTypes } from 'types/productTypes';

export const MOBILE_WIDTH = 600;

export const DESCRIPTION_TYPE_NAMES = [
  DescriptionTypes.characteristic,
  DescriptionTypes.description,
  DescriptionTypes.installation,
  DescriptionTypes.faq,
];

export const TAB_NAME_BY_TYPE: Record<DescriptionType, string> = {
  [DescriptionTypes.characteristic]: 'Характеристики',
  [DescriptionTypes.description]: 'Описание',
  [DescriptionTypes.installation]: 'Установка',
  [DescriptionTypes.faq]: 'Вопросы и ответы',
};
