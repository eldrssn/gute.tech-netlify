import { TreeCategoryResponseData } from 'api/models/catalog';

export type CatalogMenuProps = {
  handleClose: () => void;
};
export type RenderItem = {
  item: TreeCategoryResponseData;
  className?: string;
  onMouseEnter?: () => void;
};
