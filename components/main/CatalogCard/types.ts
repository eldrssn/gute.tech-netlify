import { ProductListData } from 'api/models/catalog';

type CatalogCardProps = ProductListData & { isSlider?: boolean };

type RatingProps = {
  averageRating?: number;
};

export type { CatalogCardProps, RatingProps };
