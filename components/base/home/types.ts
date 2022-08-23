import { TreeCategoryResponseData } from 'api/models/catalog';

type Props = {
  isParentCategory?: boolean;
};

enum ItemKeysEnum {
  firstItem,
  secondItem,
  thirdItem,
}

type ItemKeys = keyof typeof ItemKeysEnum;

type GroupedItemsItem = Record<ItemKeys, TreeCategoryResponseData | null>;

type Index = 1 | 2 | 3 | 4;

export type { ItemKeys, GroupedItemsItem, Index, Props };
