import { TreeCategoryResponseData } from 'api/models/catalog';

type CatalogMenuProps = {
  handleClose: () => void;
};

type CatalogMenuItemProps = {
  item: TreeCategoryResponseData;
  className?: string;
  onMouseEnter?: () => void;
  parentSlug?: string;
  handleClick: () => void;
  isCategory?: boolean;
};

export type { CatalogMenuProps, CatalogMenuItemProps };
