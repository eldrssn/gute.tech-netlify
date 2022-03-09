import { WindowSideType } from 'types/productTypes';
import { MOBILE_WIDTH } from './constants';

export const isMobileView = (windowWidth: WindowSideType) =>
  windowWidth && windowWidth <= MOBILE_WIDTH;
