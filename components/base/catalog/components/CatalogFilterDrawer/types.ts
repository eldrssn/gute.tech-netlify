import { FiltersRequest, Sorting } from 'types';

type CatalogFilterDrawerProps = {
  openDrawer: boolean;
  handleDrawerToggle: () => void;
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<FiltersRequest | null>
  >;
  anchorApplyButton: HTMLElement | null;
  setAnchorApplyButton: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  setSorting: React.Dispatch<React.SetStateAction<Sorting | null>>;
  filtersRequest: FiltersRequest | null;
};

export type { CatalogFilterDrawerProps };
