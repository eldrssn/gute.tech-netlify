import { TreeCategoryResponseData } from 'api/models/catalog';

enum ItemKeysEnum {
  firstItem,
  secondItem,
  thirdItem,
}

export type ItemKeys = keyof typeof ItemKeysEnum;

export type GroupedItemsItem = Record<
  ItemKeys,
  TreeCategoryResponseData | null
>;

export type Index = 1 | 2 | 3 | 4;
