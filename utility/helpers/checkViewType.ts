import { WindowSideType } from 'types/product';
import { MOBILE_WIDTH, TABLET_WIDTH } from 'constants/variables';

const checkTabletView = (windowWidth: WindowSideType) =>
  Boolean(windowWidth && windowWidth <= TABLET_WIDTH);

const checkMobileView = (windowWidth: WindowSideType) =>
  Boolean(windowWidth && windowWidth <= MOBILE_WIDTH);

export { checkTabletView, checkMobileView };
