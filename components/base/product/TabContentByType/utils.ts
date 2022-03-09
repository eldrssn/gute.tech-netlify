import { FC } from 'react';

import { TabDefault } from '../TabDefault';
import { TabDetails } from '../TabDetails';
import { TabFAQ } from '../TabFAQ';

import {
  DescriptionType,
  DescriptionTypes,
  TabProps,
} from 'types/productTypes';

export const ContentByDescription: Record<DescriptionType, FC<TabProps>> = {
  [DescriptionTypes.characteristic]: TabDetails,
  [DescriptionTypes.description]: TabDefault,
  [DescriptionTypes.installation]: TabDefault,
  [DescriptionTypes.faq]: TabFAQ,
};
