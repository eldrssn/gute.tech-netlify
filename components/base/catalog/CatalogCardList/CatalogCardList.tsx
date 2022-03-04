import React from 'react';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';

import { Box } from '@mui/material';

import RowRenderer from './RowRenderer';
import { list } from 'mock/CatalogCardList';

const CatalogCardList: React.FC = () => {
  const cardListRenderer = (props: ListRowProps) => {
    const { index, key } = props;
    const rowItems = list.slice(index * 3, index * 3 + 3);
    return <RowRenderer localKey={key} {...props} cards={rowItems} />;
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Box sx={{ height, width, display: { md: 'flex', xs: 'none' } }}>
          <List
            style={{ overflow: 'visible' }}
            height={height}
            width={width}
            rowCount={Math.ceil(list.length / 3)}
            rowHeight={400}
            rowRenderer={cardListRenderer}
            verscanRowCount={0}
          />
        </Box>
      )}
    </AutoSizer>
  );
};

export default CatalogCardList;
