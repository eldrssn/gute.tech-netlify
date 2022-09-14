import { FilterRequest } from 'types';

type CatalogFilterProps = {
  setFilterRequest: React.Dispatch<React.SetStateAction<FilterRequest | null>>;
  anchorApplyButton: HTMLElement | null;
  setAnchorApplyButton: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  handleDrawerToggle?: () => void;
  filterRequest: FilterRequest | null;
};

export type { CatalogFilterProps };
