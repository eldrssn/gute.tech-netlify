import { GroupedItemsItem, ItemKeys } from 'components/base/home';
import { validatePatterns } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { RegionData } from 'store/reducers/regions/types';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { TransportSearchRequestData } from 'api/models/catalog';
import { CartItemData } from 'store/reducers/cart/types';
import { QueryUrl } from 'constants/variables';
import { NextRouter } from 'next/router';

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

const getSlugsFromUrl = (
  urls: string | string[],
): TransportSearchRequestData => {
  if (Array.isArray(urls)) {
    const slugs = urls.reduce(
      (accumulator, url) => {
        const [name, value] = url.split('=');
        return { ...accumulator, [name]: value };
      },
      {
        brandSlug: '',
        modelSlug: '',
        yearSlug: '',
        engineSlug: '',
      },
    );

    return slugs;
  }

  const slicedUrl = urls.split('&');
  const slugs = slicedUrl.reduce(
    (p, c) => {
      const [name, value] = c.split('=');

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

const getParentCategory = ({
  categoriesTreeList,
  childrenCategorySlug,
}: {
  categoriesTreeList: TreeCategoryResponseData[];
  childrenCategorySlug: string;
}) => {
  const categorySearch = categoriesTreeList.find((category) => {
    if (!category.children) {
      return false;
    }

    return category.children.some(
      (childrenCategory) => childrenCategory.slug === childrenCategorySlug,
    );
  });

  return categorySearch?.slug;
};

// !TODO: переделать и переиспользовать три функции ниже
const getTransportSlugs = (transportQuery?: string | string[]) => {
  const isTransportQuery =
    Array.isArray(transportQuery) && transportQuery.length > 0;

  if (isTransportQuery) {
    const transportQueryFormatted = transportQuery.map(
      (query) => `${QueryUrl.TRANSPORT_QUERY}=${query}`,
    );
    return transportQueryFormatted.join('&');
  }
};

const goToCatalog = (slug: string, router: NextRouter) =>
  router.push(`/catalog/${slug}?page=1&order=byPopularDown`, undefined, {
    shallow: true,
  });

const goToTransportCatalog = (
  slug: string,
  transportQuery: string | string[],
  router: NextRouter,
) => {
  const transportSlugs = getTransportSlugs(transportQuery);

  router.push(
    `/catalog/${slug}?${transportSlugs}&page=1&order=byPopularDown`,
    undefined,
    { shallow: true },
  );
};

export {
  groupItems,
  getInputRules,
  getSlugsCartItemsFromString,
  getSlugsCartItemsFromCart,
  filterRegionsOption,
  cookieStorage,
  getSlugsFromUrl,
  getParentCategory,
  getTransportSlugs,
  goToCatalog,
  goToTransportCatalog,
};
