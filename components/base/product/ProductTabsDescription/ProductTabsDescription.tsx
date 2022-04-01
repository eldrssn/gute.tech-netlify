import React, { FC } from 'react';

import { useWindowSize } from 'hooks/useWindowSize';
import { checkMobileView } from 'utility/helpers/checkViewType';

import { TabsMobileView } from '../TabsMobileView';
import { TabsDesktopView } from '../TabsDesktopView';

import { TabsProps } from 'types/product';

export const ProductTabsDescription: FC<TabsProps> = ({ productInfo }) => {
  const { windowWidth } = useWindowSize();

  const Component = checkMobileView(windowWidth)
    ? TabsMobileView
    : TabsDesktopView;

  return <Component productInfo={productInfo} />;
};
