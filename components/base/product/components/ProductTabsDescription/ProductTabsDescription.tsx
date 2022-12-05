import React, { FC } from 'react';

import { useWindowSize } from 'hooks/useWindowSize';

import { TabsProps } from 'types/product';

import { TabsMobileView } from '../TabsMobileView';
import { TabsDesktopView } from '../TabsDesktopView';

const ProductTabsDescription: FC<TabsProps> = ({
  productInfo,
  isToReview,
  setIsToReview,
}) => {
  const { isMobile } = useWindowSize();

  const Component = isMobile ? TabsMobileView : TabsDesktopView;

  return (
    <Component
      productInfo={productInfo}
      isToReview={isToReview}
      setIsToReview={setIsToReview}
    />
  );
};

export { ProductTabsDescription };
