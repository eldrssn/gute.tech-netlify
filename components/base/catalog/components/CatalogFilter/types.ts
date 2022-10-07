import { FiltersRequest } from 'types';

type CatalogFilterProps = {
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<FiltersRequest | null>
  >;
  anchorApplyButton: HTMLElement | null;
  setAnchorApplyButton: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  handleDrawerToggle?: () => void;
  filtersRequest: FiltersRequest | null;
};

export type { CatalogFilterProps };
