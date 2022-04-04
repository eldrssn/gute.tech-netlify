import { Category } from 'components/base/main/CategoryCard/types';
import { GroupedItemsItem, ItemKeys } from 'components/base/home';

const sortItems = (unsortedItems: Category[]) => {
  return unsortedItems.sort((a, b) => (a.sort < b.sort ? -1 : 1));
};

const objByThree: GroupedItemsItem = {
  firstItem: null,
  secondItem: null,
  thirdItem: null,
};
const objByThreeKeys: ItemKeys[] = Object.keys(objByThree) as ItemKeys[];

const items: Category[] = [
  {
    id: 1,
    image: 'amortizator',
    name: 'Амортизаторы',
    url: 'amortizator',
    quantity: 10,
    sort: 2,
    children: [
      {
        id: 100,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
        url: '/katalog/amortizator',
      },
      {
        id: 101,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
        url: '/katalog/amortizator',
      },
      {
        id: 102,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
        url: '/katalog/amortizator',
      },
      {
        id: 103,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
        url: '/katalog/amortizator',
      },
      {
        id: 104,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
        url: '/katalog/amortizator',
      },
      {
        id: 105,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
        url: '/katalog/amortizator',
      },
    ],
  },
  {
    id: 2,
    image: 'bagazhnik',
    url: 'bagazhnik',
    name: 'Багажники',
    quantity: 10,
    sort: 3,
    children: [
      {
        id: 106,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
      {
        id: 107,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
      {
        id: 108,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
      {
        id: 109,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
      {
        id: 110,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
      {
        id: 112,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
    ],
  },
  {
    id: 3,
    image: 'brizgoviki',
    url: 'brizgoviki',
    name: 'Брызговики',
    quantity: 10,
    sort: 1,
    children: [
      {
        id: 113,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 114,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 115,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 116,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 117,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 118,
        image: 'amortizator',
        url: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        sort: 2,
      },
    ],
  },
  {
    id: 4,
    image: 'deflectors',
    url: 'deflectors',
    name: 'Дефлекторы',
    quantity: 10,
    sort: 5,
    children: [
      {
        id: 119,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 120,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 121,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 122,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 123,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        url: 'amortizator',
        sort: 2,
      },
      {
        id: 124,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
    ],
  },
  {
    id: 5,
    image: 'karter',
    name: 'Защита картера двигателя',
    quantity: 10,
    url: 'karter',
    sort: 4,
    children: [
      {
        id: 125,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        url: 'amortizator',
        sort: 2,
      },
      {
        id: 126,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        url: 'amortizator',
        sort: 2,
      },
      {
        id: 127,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 128,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 129,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 130,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 131,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 132,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 133,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        url: 'amortizator',
        sort: 2,
      },
      {
        id: 134,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 135,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        url: 'amortizator',
        sort: 2,
      },
      {
        id: 136,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
    ],
  },
  {
    id: 6,
    image: 'kovriki',
    name: 'Автомобильные коврики',
    quantity: 10,
    url: 'kovriki',
    sort: 8,
    children: [
      {
        id: 137,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 138,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 139,
        image: 'amortizator',
        name: 'Амортизаторы',
        quantity: 10,
        url: 'amortizator',
        sort: 2,
      },
      {
        id: 140,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
    ],
  },
  {
    id: 7,
    image: 'nakladki',
    url: 'nakladki',
    name: 'Накладки на пороги и бампер',
    quantity: 10,
    sort: 7,
  },
  {
    id: 8,
    image: 'navesi',
    name: 'Навесное оборудование',
    url: 'navesi',
    quantity: 10,
    sort: 6,
  },
  {
    id: 9,
    image: 'podkrilki',
    name: 'Подкрылки',
    url: 'podkrilki',
    quantity: 10,
    sort: 9,
    children: [
      {
        id: 141,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 142,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
      {
        id: 143,
        image: 'amortizator',
        name: 'Амортизаторы',
        url: 'amortizator',
        quantity: 10,
        sort: 2,
      },
    ],
  },
  {
    id: 10,
    image: 'porogi',
    name: 'Пороги для автомобиля',
    url: 'porogi',
    quantity: 10,
    sort: 10,
  },
  {
    id: 11,
    image: 'reshetka',
    name: 'Решетки радиатора и бампера',
    quantity: 10,
    sort: 11,
    url: 'reshetka',
  },
  {
    id: 12,
    image: 'vnedorozhnik',
    url: 'vnedorozhnik',
    name: 'Внедорожные аксессуары',
    quantity: 10,
    sort: 12,
  },
  {
    id: 13,
    image: 'vnedorozhnik',
    name: 'asdfasdf',
    url: 'vnedorozhnik',
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
