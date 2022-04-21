import { objByThree, objByThreeKeys } from 'mock/categories';
import { GroupedItemsItem } from 'components/base/home';
import { validatePatterns } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { RegionData } from 'store/reducers/regions/types';
import { TreeCategoryResponseData } from 'api/models/catalog';

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

export { groupItems, getInputRules, filterRegionsOption, cookieStorage };
