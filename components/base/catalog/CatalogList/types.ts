export type CatalogListProps = {
  onRowsRendered: ({ stopIndex }: { stopIndex: number }) => void;
  rowCount: number;
  itemsInRow: number;
  onScroll: ({ scrollTop }: { scrollTop: number }) => void;
};
