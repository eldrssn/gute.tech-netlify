import React, { FC } from 'react';
import { ContentByDescription } from './utils';

import { Props } from './types';

export const TabContentByType: FC<Props> = ({ type, content }) => {
  const Content = ContentByDescription[type];

  return <Content content={content} />;
};
