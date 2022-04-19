export type CatalogPaginationProps = {
  pageCount: number;
  currentPage?: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};
