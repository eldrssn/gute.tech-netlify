import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

import { Box } from '@mui/material';

import { list } from 'mock/CatalogCardList';
import RowRenderer from './RowRenderer';

const CatalogCardList: React.FC = () => {
  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <Box sx={{ height, width, display: { md: 'flex', xs: 'none' } }}>
            <List
              style={{ overflow: 'visible' }}
              height={height}
              width={width}
              rowCount={list.length}
              rowHeight={350}
              rowRenderer={RowRenderer}
              verscanRowCount={0}
            />
          </Box>
        );
      }}
    </AutoSizer>
  );
};

export default CatalogCardList;
