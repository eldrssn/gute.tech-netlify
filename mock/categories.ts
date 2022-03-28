import { Category } from 'components/base/main/CategoryCard/types';
import { GroupedItemsItem, ItemKeys } from 'components/base/home';
import { groupItems, sortItems } from 'utility/helpers';

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

const sortedItems = items;

const objByThree: GroupedItemsItem = { first: null, second: null, third: null };
const objByThreeKeys: ItemKeys[] = Object.keys(objByThree) as ItemKeys[];

const groupedItems = sortedItems;

export { items, sortedItems, objByThree, objByThreeKeys, groupedItems };
