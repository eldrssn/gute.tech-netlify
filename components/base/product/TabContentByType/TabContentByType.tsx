import React, { FC } from 'react';

import { DescriptionType, DescriptionTypes, TabProps } from 'types/product';

import { TabDefault } from '../TabDefault';
import { TabDetails } from '../TabDetails';
import { TabFAQ } from '../TabFAQ';

import { TabContentByTypeProps } from './types';

const ContentByDescription: Record<DescriptionType, FC<TabProps>> = {
  [DescriptionTypes.properties]: TabDetails,
  [DescriptionTypes.description]: TabDefault,
  [DescriptionTypes.installation]: TabDefault,
  [DescriptionTypes.faq]: TabFAQ,
};

const TabContentByType: FC<TabContentByTypeProps> = ({ type, content }) => {
  const Content = ContentByDescription[type];

  return <Content content={content} />;
};

export { TabContentByType };
