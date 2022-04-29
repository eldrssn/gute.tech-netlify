export type CatalogPaginationProps = {
  pageCount: number;
  currentPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
