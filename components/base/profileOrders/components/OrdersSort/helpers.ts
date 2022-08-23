import { DIRECTIONS } from '../../constants';

const changeOrderType = (orderType: string) =>
  orderType === `${DIRECTIONS.UP}` ? `${DIRECTIONS.DOWN}` : `${DIRECTIONS.UP}`;

export { changeOrderType };
