import React from 'react';
import { ListRowProps, CellMeasurer } from 'react-virtualized';

import Card from '../CatalogCard';

import { cardListCache } from './helpers';

const RowRenderer: React.FC<ListRowProps> = ({ key, index, style, parent }) => {
  return (
    <CellMeasurer
      cache={cardListCache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ measure }) => (
        <div style={{ ...style, display: 'flex' }} onLoad={measure} key={index}>
          <Card />
          <Card />
          <Card />
        </div>
      )}
    </CellMeasurer>
  );
};

export default RowRenderer;
