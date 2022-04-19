import { DIRECTIONS } from './constants';

export const changeOrderType = (orderType: string, start: string) =>
  orderType === `${start}${DIRECTIONS.DOWN}`
    ? `${start}${DIRECTIONS.UP}`
    : `${start}${DIRECTIONS.DOWN}`;
