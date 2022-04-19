import { WindowSideType } from 'types/product';
import { MOBILE_WIDTH, TABLET_WIDTH } from 'constants/variables';

const checkView = (viewCheckPoint: number, windowWidth: WindowSideType) =>
  Boolean(windowWidth && windowWidth <= viewCheckPoint);

const checkTabletView = checkView.bind(null, TABLET_WIDTH);

const checkMobileView = checkView.bind(null, MOBILE_WIDTH);

export { checkTabletView, checkMobileView, checkView };
