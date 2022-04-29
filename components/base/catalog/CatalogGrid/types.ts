import { ProductListData } from 'api/models/catalog';

export type CatalogGridProps = {
  items: never[] | ProductListData[];
};
