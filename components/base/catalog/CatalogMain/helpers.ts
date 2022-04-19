import { CATALOG_MOBILE_WIDTH } from 'constants/variables';
import { WindowSideType } from 'types/product';
import { checkTabletView, checkView } from 'utility/helpers/checkViewType';

import { DisplayViews, PAGE_MARGIN, ROW_HIGHT } from '../constants';

export const getItemsInRow = (windowWidth: WindowSideType) => {
  const isMobileView = checkView(CATALOG_MOBILE_WIDTH, windowWidth);

  if (isMobileView) {
    return DisplayViews.mobile;
  }

  if (checkTabletView(windowWidth)) {
    return DisplayViews.tablet;
  }

  return DisplayViews.desktop;
};

export const scrollWindowTo = (distance: number, isSmooth = true) => {
  window.scrollTo({
    top: distance,
    behavior: isSmooth ? 'smooth' : 'auto',
  });
};

export const scrollToPage = (scrollToRowIndex?: number, isSmooth = true) => {
  if (scrollToRowIndex || scrollToRowIndex === 0) {
    const scrollToDistance = scrollToRowIndex * ROW_HIGHT + PAGE_MARGIN;
    scrollWindowTo(scrollToDistance, isSmooth);
  }
};
