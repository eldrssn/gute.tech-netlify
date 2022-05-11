import { objByThree, objByThreeKeys } from 'mock/categories';
import { GroupedItemsItem } from 'components/base/home';
import { validatePatterns } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { RegionData } from 'store/reducers/regions/types';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { CategoriesSearchReadRequestData } from 'api/models/catalog';
import { CartItemData } from 'store/reducers/cart/types';

const groupItems = (sortedItems?: TreeCategoryResponseData[]) => {
  if (!sortedItems) {
    return null;
  }

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

const getInputRules = (patternCategory?: EValidatePattern) => {
  if (patternCategory) {
    const { message, pattern } = validatePatterns[patternCategory];
    return {
      required: 'Обязательное поле',
      pattern: {
        value: pattern,
        message: message,
      },
    };
  }

  return {
    required: 'Обязательное поле',
  };
};

const filterRegionsOption = (
  RegionOption: RegionData[],
  desiredСity: string,
) => {
  const searchedRegionOptions = RegionOption.filter((region) =>
    region.cities.some(({ title }) => {
      const lowerCaseTitle = title?.toLocaleLowerCase();
      const lowerCaseDesiredCity = desiredСity?.toLocaleLowerCase();

      return lowerCaseTitle.indexOf(lowerCaseDesiredCity || '') >= 0;
    }),
  );

  const searchedCityOption = searchedRegionOptions.map((region) => {
    const filteredCity = region.cities.filter(({ title }) => {
      const lowerCaseTitle = title?.toLocaleLowerCase();
      const lowerCaseDesiredCity = desiredСity?.toLocaleLowerCase();

      return lowerCaseTitle.indexOf(lowerCaseDesiredCity || '') >= 0;
    });

    return { ...region, cities: filteredCity };
  });

  return searchedCityOption;
};

const cookieStorage = {
  getItem: (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cookies: any = document.cookie
      .split(';')
      .map((cookie) => cookie.split('='))
      .reduce(
        (accumulation, [key, value]) => ({
          ...accumulation,
          [key.trim()]: value,
        }),
        {},
      );

    return cookies[key];
  },
  setItem: (key: string, value: string) => {
    document.cookie = `${key}=${value}`;
  },
};

const getSlugsFromUrl = (url: string): CategoriesSearchReadRequestData => {
  const slicedUrl = url.split('&');
  const slugs = slicedUrl.reduce(
    (p, c) => {
      const slug = c.split('=');
      const name = slug[0];
      const value = slug[1];

      return { ...p, [name]: value };
    },
    {
      brandSlug: '',
      modelSlug: '',
      yearSlug: '',
      engineSlug: '',
    },
  );

  return slugs;
};

const getSlugsCartItemsFromString = (slugsItem: string) =>
  slugsItem.split('&').map((item) => {
    const itemArray = item.split(',');
    const slug = itemArray[0].split(':')[1];
    const count = itemArray[1].split(':')[1];

    return {
      slug: slug,
      count: Number(count),
    };
  });

const getSlugsCartItemsFromCart = (cart: CartItemData[]) =>
  cart
    .map((item) => {
      return `slug:${item.slug},count:${item.count}`;
    })
    .join('&');

export {
  groupItems,
  getInputRules,
  getSlugsCartItemsFromString,
  getSlugsCartItemsFromCart,
  filterRegionsOption,
  cookieStorage,
  getSlugsFromUrl,
};
