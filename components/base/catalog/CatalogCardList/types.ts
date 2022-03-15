import { ListRowProps } from 'react-virtualized';

import { ICatalogCard } from 'components/base/catalog/CatalogCard/types';

export interface RowRendererProps extends ListRowProps {
  cards: ICatalogCard[];
  localKey: string;
}
