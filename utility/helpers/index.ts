import { Category } from 'components/base/main/CategoryCard/types';
import { objByThree, objByThreeKeys } from 'mock/categories';
import { GroupedItemsItem } from 'pages/home/types';

const sortItems = (unsortedItems: Category[]) => {
  return unsortedItems.sort((a, b) => (a.sort < b.sort ? -1 : 1));
};

const groupItems = (sortedItems: Category[]) => {
  const { groupedItems } = sortedItems.reduce<{
    groupedItems: GroupedItemsItem[];
    currentItem: GroupedItemsItem;
  }>(
    (acc, value, index) => {
      const currentItem = {
        ...acc.currentItem,
        [objByThreeKeys[index % 3]]: value,
      };

      if ((index + 1) % 3 == 0 || index + 1 == sortedItems.length) {
        acc.groupedItems.push(currentItem);

        acc.currentItem = { ...objByThree };
        return acc;
      }

      acc.currentItem = currentItem;

      return acc;
    },
    {
      groupedItems: [],
      currentItem: { ...objByThree },
    },
  );

  return groupedItems;
};

export { groupItems, sortItems };
