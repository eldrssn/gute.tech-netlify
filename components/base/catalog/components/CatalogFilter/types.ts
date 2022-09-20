import { filtersRequest } from 'types';

type CatalogFilterProps = {
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<filtersRequest | null>
  >;
  anchorApplyButton: HTMLElement | null;
  setAnchorApplyButton: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  handleDrawerToggle?: () => void;
  filtersRequest: filtersRequest | null;
};

export type { CatalogFilterProps };
