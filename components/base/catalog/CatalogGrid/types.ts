import { ProductListData } from 'api/models/catalog';

type CatalogGridProps = {
  items: never[] | ProductListData[];
};

export type { CatalogGridProps };
