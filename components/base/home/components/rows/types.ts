import { GroupedItemsItem } from 'components/base/home';

type Items = {
  items: GroupedItemsItem;
  isTransportSearch: boolean;
  lazy?: 'lazy' | 'eager';
};

export type { Items };
