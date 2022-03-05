import { FC } from 'react';

import { TabDefault } from 'components/TabDefault';
import { TabDetails } from 'components/TabDetails';
import { TabFAQ } from 'components/TabFAQ';

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
