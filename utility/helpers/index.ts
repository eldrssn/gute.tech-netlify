import { GroupedItemsItem, ItemKeys } from 'components/base/home';
import { validatePatterns } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { RegionData } from 'store/reducers/regions/types';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { CartItemData } from 'store/reducers/cart/types';
import { ListOptionsItemData } from 'api/models/transport';

const objByThree: GroupedItemsItem = {
  firstItem: null,
  secondItem: null,
  thirdItem: null,
};
const objByThreeKeys: ItemKeys[] = Object.keys(objByThree) as ItemKeys[];

const groupItems = (sortedItems?: TreeCategoryResponseData[]) => {
  if (!sortedItems || !Array.isArray(sortedItems)) {
    return null;
  }

  const filterItems = sortedItems.filter((item) => item.found !== 0);

  const { groupedItems } = filterItems.reduce<{
    groupedItems: GroupedItemsItem[];
    currentItem: GroupedItemsItem;
  }>(
    (acc, value, index) => {
      const currentItem =
        value.found === 0
          ? { ...acc.currentItem }
          : {
              ...acc.currentItem,
              [objByThreeKeys[index % 3]]: value,
            };

      if ((index + 1) % 3 == 0 || index + 1 == filterItems.length) {
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

const getSlugsCartItemsFromString = (slugsItem: string) =>
  slugsItem.split('&').map((item) => {
    const itemArray = item.split(',');
    const slug = itemArray[0].split(':')[1];
    const count = itemArray[1].split(':')[1];
    const ordinalId = itemArray[2].split(':')[1];

    return {
      slug: slug,
      count: Number(count),
      ordinalId: Number(ordinalId),
    };
  });

const getSlugsCartItemsFromCart = (cart: CartItemData[]) =>
  cart
    .map((item) => {
      return `slug:${item.slug},count:${item.count},ordinalId:${item.ordinalId}`;
    })
    .join('&');

const makeStringify = (value?: string[] | string) =>
  typeof value === 'string' ? value : value?.toString() || '';

const getParentCategory = ({
  categoriesTreeListData,
  childrenCategorySlug,
}: {
  categoriesTreeListData: TreeCategoryResponseData[];
  childrenCategorySlug: string;
}) => {
  const categorySearch = categoriesTreeListData.find((category) => {
    if (!category.children) {
      return false;
    }

    return category.children.some(
      (childrenCategory) => childrenCategory.slug === childrenCategorySlug,
    );
  });

  return categorySearch?.slug;
};

const findTransportType = (data: ListOptionsItemData[], slug: string) => {
  const type = data.find((item) =>
    item.brands?.find((type) => type.slug === slug),
  );

  return type?.slug;
};

const setBreakpointSize = (breakpoint: string) =>
  Number(breakpoint.slice(0, -2));

const formatPrice = (price?: string | number) => {
  if (!price) {
    return '0';
  }

  return typeof price === 'number'
    ? price.toLocaleString('ru')
    : Number(price).toLocaleString('ru');
};

const addItemToLocaleStorage = ({ slug, title }: Record<string, string>) => {
  try {
    localStorage.setItem(slug, title);
  } catch (error) {
    if (error == 'QUOTA_EXCEEDED_ERR') {
      console.warn('Не достаточно места в localStorage');
    }
  }
};

const scrollToTop = () => {
  if (window) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

export default setBreakpointSize;

export {
  scrollToTop,
  addItemToLocaleStorage,
  groupItems,
  getInputRules,
  getSlugsCartItemsFromString,
  getSlugsCartItemsFromCart,
  filterRegionsOption,
  cookieStorage,
  makeStringify,
  findTransportType,
  getParentCategory,
  setBreakpointSize,
  formatPrice,
};
