import { QueryUrl } from 'constants/variables';
import {
  CategoryStoreBlocks,
  CategoryStoreRootCategory,
} from 'store/reducers/catalog/types';

const rootCategories: Record<string, CategoryStoreRootCategory> = {
  [QueryUrl.TRANSPORT_QUERY]: CategoryStoreBlocks.SEARCHREADCATEGORY,
  [QueryUrl.CATEGORY_QUERY]: CategoryStoreBlocks.CATEGORIESTREELIST,
};

export { rootCategories };
