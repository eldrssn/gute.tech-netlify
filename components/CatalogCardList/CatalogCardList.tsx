import { FC } from 'react';
import { Box } from '@mui/material';
import {
  AutoSizer,
  ListRowProps,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import Card from '../CatalogCard/CatalogCard';
import { list } from '../../mock/CatalogCardList';

const CatalogCardList: FC = () => {
  const cache = new CellMeasurerCache({
    defaultWidth: 100,
    minWidth: 75,
    fixedHeight: true,
  });
  function rowRenderer({
    key,
    index,
    //isScrolling,
    //isVisible,
    style,
    parent,
  }: ListRowProps) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => (
          <div
            style={{ ...style, display: 'flex' }}
            onLoad={measure}
            key={index}
          >
            <Card />
            <Card />
            <Card />
          </div>
        )}
      </CellMeasurer>
    );
  }
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
              rowRenderer={(ev) => rowRenderer(ev)}
              verscanRowCount={0}
            />
          </Box>
        );
      }}
    </AutoSizer>
  );
};

export default CatalogCardList;
