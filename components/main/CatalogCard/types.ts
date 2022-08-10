import { ProductListData } from 'api/models/catalog';

type TitleProps = {
  children: string;
};

type CatalogCardProps = ProductListData & { isSlider?: boolean };

export type { TitleProps, CatalogCardProps };
