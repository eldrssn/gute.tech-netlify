import { Category } from 'components/base/main/CategoryCard/types';

enum ItemKeysEnum {
  firstItem,
  secondItem,
  thirdItem,
}

export type ItemKeys = keyof typeof ItemKeysEnum;

export type GroupedItemsItem = Record<ItemKeys, Category | null>;

export type Index = 1 | 2 | 3 | 4;
