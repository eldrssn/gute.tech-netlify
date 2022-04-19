import React, { FC } from 'react';
import Box from '@mui/material/Box';
import {
  AutoSizer,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

import { list } from 'mock/CatalogCardList';

import { ROW_HIGHT } from '../constants';
import { CatalogRowRenderer } from '../CatalogRowRenderer';
import { CatalogListProps } from './types';

export const CatalogList: FC<CatalogListProps> = ({
  onRowsRendered,
  rowCount,
  itemsInRow,
  onScroll,
}) => {
  const CardListRenderer = (props: ListRowProps) => {
    const { index, key } = props;

    const rowItems = list.slice(
      index * itemsInRow,
      index * itemsInRow + itemsInRow,
    );

    return <CatalogRowRenderer localKey={key} {...props} cards={rowItems} />;
  };

  return (
    <WindowScroller
      serverHeight={1200}
      onScroll={onScroll}
      scrollingResetTimeInterval={1000}
    >
      {({ height, isScrolling, registerChild, scrollTop, onChildScroll }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <Box ref={registerChild}>
              <List
                autoHeight
                onScroll={onChildScroll}
                height={height}
                width={width}
                rowCount={rowCount}
                rowHeight={ROW_HIGHT}
                rowRenderer={CardListRenderer}
                verscanRowCount={6}
                estimatedRowSize={rowCount * ROW_HIGHT}
                scrollToAlignment='start'
                onRowsRendered={onRowsRendered}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
              />
            </Box>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};
