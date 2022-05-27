import { FilterRequest } from 'types';

type CatalogFilterDrawerProps = {
  openDrawer: boolean;
  handleDrawerToggle: () => void;
  setFilterRequest: React.Dispatch<React.SetStateAction<FilterRequest | null>>;
};

export type { CatalogFilterDrawerProps };
