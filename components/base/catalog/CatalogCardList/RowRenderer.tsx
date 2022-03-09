import React from 'react';
import { CellMeasurer } from 'react-virtualized';

import Card from 'components/base/catalog/CatalogCard';

import { cardListCache } from './helpers';
import { RowRendererProps } from './types';

const RowRenderer: React.FC<RowRendererProps> = (props) => {
  const { localKey: key, index, style, parent, cards } = props;
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
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      )}
    </CellMeasurer>
  );
};

export default RowRenderer;
