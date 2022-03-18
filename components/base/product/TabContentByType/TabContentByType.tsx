import React, { FC } from 'react';

import {
  DescriptionType,
  DescriptionTypes,
  TabProps,
} from 'types/productTypes';

import { TabDefault } from '../TabDefault';
import { TabDetails } from '../TabDetails';
import { TabFAQ } from '../TabFAQ';

import { Props } from './types';

export const ContentByDescription: Record<DescriptionType, FC<TabProps>> = {
  [DescriptionTypes.characteristic]: TabDetails,
  [DescriptionTypes.description]: TabDefault,
  [DescriptionTypes.installation]: TabDefault,
  [DescriptionTypes.faq]: TabFAQ,
};


export const TabContentByType: FC<Props> = ({ type, content }) => {
  const Content = ContentByDescription[type];

  return <Content content={content} />;
};
