import { FilterRequest, Sorting } from 'types';

type CatalogFilterDrawerProps = {
  openDrawer: boolean;
  handleDrawerToggle: () => void;
  setFilterRequest: React.Dispatch<React.SetStateAction<FilterRequest | null>>;
  anchorApplyButton: HTMLElement | null;
  setAnchorApplyButton: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  setSorting: React.Dispatch<React.SetStateAction<Sorting | null>>;
  filterRequest: FilterRequest | null;
};

export type { CatalogFilterDrawerProps };
