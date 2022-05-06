import { TreeCategoryResponseData } from 'api/models/catalog';

type CatalogMenuProps = {
  handleClose: () => void;
};

type RenderItem = {
  item: TreeCategoryResponseData;
  className?: string;
  onMouseEnter?: () => void;
};

export type { CatalogMenuProps, RenderItem };
