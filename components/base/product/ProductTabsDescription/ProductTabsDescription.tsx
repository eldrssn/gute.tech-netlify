import React, { FC } from 'react';

import { useWindowSize } from 'hooks/useWindowSize';
import { isMobileView } from 'utility/utils/isMobileView';

import { TabsMobileView } from '../TabsMobileView';
import { TabsDesktopView } from '../TabsDesktopView';

import { TabsProps } from 'types/productTypes';

export const ProductTabsDescription: FC<TabsProps> = ({ productInfo }) => {
  const { windowWidth } = useWindowSize();

  const Component = isMobileView(windowWidth)
    ? TabsMobileView
    : TabsDesktopView;

  return <Component productInfo={productInfo} />;
};
