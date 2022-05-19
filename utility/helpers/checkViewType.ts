import { WindowSideType } from 'types/product';
import {
  MOBILE_WIDTH,
  TABLET_WIDTH,
  MOBILE_XS_WIDTH,
} from 'constants/variables';

const checkView = (viewCheckPoint: number, windowWidth: WindowSideType) =>
  Boolean(windowWidth && windowWidth <= viewCheckPoint);

const checkTabletView = checkView.bind(null, TABLET_WIDTH);

const checkMobileView = checkView.bind(null, MOBILE_WIDTH);

const checkXSMobileView = checkView.bind(null, MOBILE_XS_WIDTH);

export { checkTabletView, checkMobileView, checkView, checkXSMobileView };
