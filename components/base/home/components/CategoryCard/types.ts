import { TreeCategoryResponseData } from 'api/models/catalog';

type CategoryCardProps = {
  item: TreeCategoryResponseData;
  isSmallBox?: boolean;
  lazy?: 'eager' | 'lazy';
};

export type { CategoryCardProps };
