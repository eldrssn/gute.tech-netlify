import React, { FC } from 'react';

import { useWindowSize } from 'hooks/useWindowSize';
import { checkMobileView } from 'utility/helpers/checkViewType';

import { TabsProps } from 'types/product';

import { TabsMobileView } from '../TabsMobileView';
import { TabsDesktopView } from '../TabsDesktopView';

const ProductTabsDescription: FC<TabsProps> = (props) => {
  const { windowWidth } = useWindowSize();

  const Component = checkMobileView(windowWidth)
    ? TabsMobileView
    : TabsDesktopView;

  return <Component {...props} />;
};

export { ProductTabsDescription };
