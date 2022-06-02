import { Sorting } from 'types';

type CatalogSortProps = {
  setSorting: React.Dispatch<React.SetStateAction<Sorting | null>>;
  setAnchorApplyButton?: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
};

export type { CatalogSortProps };
