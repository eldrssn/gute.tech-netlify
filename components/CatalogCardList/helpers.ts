import { CellMeasurerCache } from 'react-virtualized';

export const cardListCache = new CellMeasurerCache({
  defaultWidth: 100,
  minWidth: 75,
  fixedHeight: true,
});
