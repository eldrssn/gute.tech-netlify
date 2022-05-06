import { TreeCategoryResponseData } from 'api/models/catalog';

type CatalogMenuProps = {
  handleClose: () => void;
  closeMainDrawer: () => void;
};

type LinkWrapperProps = {
  item: TreeCategoryResponseData;
  onClick?: () => void;
};

export type { CatalogMenuProps, LinkWrapperProps };
