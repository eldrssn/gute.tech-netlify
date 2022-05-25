import { QueryUrl } from 'constants/variables';
import {
  CategoryStoreBlocks,
  CategoryStoreRootCategory,
} from 'store/reducers/catalog/types';

const rootCategories: Record<string, CategoryStoreRootCategory> = {
  [QueryUrl.TRANSPORT_QUERY]: CategoryStoreBlocks.SEARCH_READ_CATEGORY,
  [QueryUrl.CATEGORY_QUERY]: CategoryStoreBlocks.CATEGORIES_TREE_LIST,
};

export { rootCategories };
