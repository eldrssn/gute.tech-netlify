import { TreeCategoryResponseData } from 'api/models/catalog';

export type CatalogMenuProps = {
  handleClose: () => void;
  closeMainDrawer: () => void;
};

export type LinkWrapperProps = {
  item: TreeCategoryResponseData;
  onClick?: () => void;
};
