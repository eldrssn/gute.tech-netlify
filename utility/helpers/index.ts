import { GroupedItemsItem, ItemKeys } from 'components/base/home';
import { validatePatterns } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { TOKEN_CACHE_TTL, TOKEN_CACHE_TTL_DELETE } from 'constants/variables';
import { BranchesData } from 'store/reducers/regions/types';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { CartItemData } from 'store/reducers/cart/types';
import { CookieSameSite } from 'constants/types';
import { productOptions } from 'api/models/cart';

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
  BranchesOption: BranchesData[],
  desiredСity: string,
) => {
  const searcheBranchesOptions = BranchesOption.filter((branch) => {
    const lowerCaseTitle = branch.title?.toLocaleLowerCase();
    const lowerCaseDesiredCity = desiredСity?.toLocaleLowerCase();

    return lowerCaseTitle.indexOf(lowerCaseDesiredCity || '') >= 0;
  });

  return searcheBranchesOptions;
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

const makeStringify = (value?: string[] | string) =>
  typeof value === 'string' ? value : value?.toString() || '';

const makeAnArray = (value?: string[] | string) =>
  typeof value === 'object' ? value : [];

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

const getCookie = (name: string) => {
  const value = '; ' + document.cookie;
  const partsPop = value.split(`; ${name}=`).pop();

  if (partsPop) {
    return partsPop.split(';').shift();
  }
};

const setCookie = (
  name: string,
  val: string,
  sameSite: CookieSameSite = CookieSameSite.STRICT,
) => {
  const date = new Date();
  const value = val;

  date.setTime(date.getTime() + TOKEN_CACHE_TTL);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=${sameSite}`;
};

const deleteCookie = (name: string) => {
  const date = new Date();

  date.setTime(date.getTime() + TOKEN_CACHE_TTL_DELETE);

  document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
};

const scrollToTop = () => {
  if (window) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

const getFullDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const cutDate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};

const formatStringifiedDate = (date: string) =>
  date.split('-').reverse().join('.');

const formatDate = (date: Date) => {
  const cuttedDate = cutDate(date);
  const formattedDate = formatStringifiedDate(cuttedDate);
  return formattedDate;
};

const getStockBalance = (item: CartItemData) =>
  item.warehouses.reduce((accumulator, warehouse) => {
    return accumulator + Number(warehouse.quantity);
  }, 0);

const getProductSlugList = (productsOptions: productOptions[]) =>
  productsOptions.map((productOption) => productOption.productSlug);

const getIsProductInCategorySlug = (categorySlug: string) =>
  categorySlug ? categorySlug.split('_')[0] === 'product' : false;

const getCategory = ({
  categoryTree,
  iteration = 0,
  query,
}: {
  categoryTree: TreeCategoryResponseData[];
  iteration?: number;
  query: string[];
}): TreeCategoryResponseData | null => {
  const findCategory = categoryTree.find(
    (category) => category.slug === query[iteration],
  );

  if (!findCategory) {
    return null;
  }

  if (iteration === query.length - 1) {
    return findCategory;
  }

  if (!findCategory) {
    return null;
  }

  if (!findCategory.children) {
    return null;
  }

  return getCategory({
    categoryTree: findCategory.children,
    iteration: iteration + 1,
    query,
  });
};

export default setBreakpointSize;

export {
  getProductSlugList,
  getFullDate,
  getStockBalance,
  scrollToTop,
  addItemToLocaleStorage,
  groupItems,
  getInputRules,
  filterRegionsOption,
  cookieStorage,
  makeStringify,
  makeAnArray,
  setBreakpointSize,
  formatPrice,
  getCookie,
  setCookie,
  deleteCookie,
  formatDate,
  getCategory,
  getIsProductInCategorySlug,
  formatStringifiedDate,
};
