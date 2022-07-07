import { DIRECTIONS } from '../constants';

const changeOrderType = (orderType: string) =>
  orderType === `${DIRECTIONS.DOWN}`
    ? `${DIRECTIONS.UP}`
    : `${DIRECTIONS.DOWN}`;

export { changeOrderType };
