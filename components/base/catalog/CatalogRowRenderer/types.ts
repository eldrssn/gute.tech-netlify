import { ListRowProps } from 'react-virtualized';

import { CatalogCardType } from '../types';

export interface CatalogRowRendererProps extends ListRowProps {
  cards: CatalogCardType[];
  localKey: string;
}
