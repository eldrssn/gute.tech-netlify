import { FilterRequest } from 'types';

type CatalogFilterDrawerProps = {
  openDrawer: boolean;
  handleDrawerToggle: () => void;
  setFilterRequest: React.Dispatch<React.SetStateAction<FilterRequest>>;
};

export type { CatalogFilterDrawerProps };
