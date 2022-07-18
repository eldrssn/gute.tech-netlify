import { DIRECTIONS } from './constants';

const changeOrderType = (orderType: string, start: string) =>
  orderType === `${start}${DIRECTIONS.DOWN}`
    ? `${start}${DIRECTIONS.UP}`
    : `${start}${DIRECTIONS.DOWN}`;

export { changeOrderType };
