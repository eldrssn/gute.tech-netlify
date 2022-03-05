import React, { FC } from 'react';

import { useWindowSize } from 'hooks/useWindowSize';
import { isMobileView } from 'utils/isMobileView';

import { TabsMobileView } from 'components/TabsMobileView';
import { TabsDesktopView } from 'components/TabsDesktopView';

import { TabsProps as Props } from 'types/productTypes';

export const ProductTabsDescription: FC<Props> = ({ productInfo }) => {
  const { windowWidth } = useWindowSize();
  const Component = isMobileView(windowWidth)
    ? TabsMobileView
    : TabsDesktopView;

  return <Component productInfo={productInfo} />;
};
