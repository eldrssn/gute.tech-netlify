import { Category } from 'components/base/main/CategoryCard/types';
import { GroupedItemsItem, ItemKeys } from 'components/base/home';

const sortItems = (unsortedItems: Category[]) => {
  return unsortedItems.sort((a, b) => (a.sort < b.sort ? -1 : 1));
};

const objByThree: GroupedItemsItem = { first: null, second: null, third: null };
const objByThreeKeys: ItemKeys[] = Object.keys(objByThree) as ItemKeys[];

const items: Category[] = [
  {
    id: 1,
    image: 'amortizator',
    name: 'Амортизаторы',
    quantity: 10,
    sort: 2,
  },
  {
    id: 2,
    image: 'bagazhnik',
    name: 'Багажники',
    quantity: 10,
    sort: 3,
  },
  {
    id: 3,
    image: 'brizgoviki',
    name: 'Брызговики',
    quantity: 10,
    sort: 1,
  },
  {
    id: 4,
    image: 'deflectors',
    name: 'Дефлекторы',
    quantity: 10,
    sort: 5,
  },
  {
    id: 5,
    image: 'karter',
    name: 'Защита картера двигателя',
    quantity: 10,
    sort: 4,
  },
  {
    id: 6,
    image: 'kovriki',
    name: 'Автомобильные коврики',
    quantity: 10,
    sort: 8,
  },
  {
    id: 7,
    image: 'nakladki',
    name: 'Накладки на пороги и бампер',
    quantity: 10,
    sort: 7,
  },
  {
    id: 8,
    image: 'navesi',
    name: 'Навесное оборудование',
    quantity: 10,
    sort: 6,
  },
  {
    id: 9,
    image: 'podkrilki',
    name: 'Подкрылки',
    quantity: 10,
    sort: 9,
  },
  {
    id: 10,
    image: 'porogi',
    name: 'Пороги для автомобиля',
    quantity: 10,
    sort: 10,
  },
  {
    id: 11,
    image: 'reshetka',
    name: 'Решетки радиатора и бампера',
    quantity: 10,
    sort: 11,
  },
  {
    id: 12,
    image: 'vnedorozhnik',
    name: 'Внедорожные аксессуары',
    quantity: 10,
    sort: 12,
  },
  {
    id: 13,
    image: 'vnedorozhnik',
    name: 'asdfasdf',
    quantity: 10,
    sort: 13,
  },
];

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

const sortedItems = groupItems(items);

const groupedItems = sortedItems;

export { items, sortedItems, objByThree, objByThreeKeys, groupedItems };
