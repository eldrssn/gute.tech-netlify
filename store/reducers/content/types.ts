import { StoreState, StoreError, ErrorAction } from 'store/types';

enum ContentStoreBlocks {
  BRANDS = 'brands',
  MODELS = 'models',
}

type CarDetailsItemData = {
  title: string;
  slug: string;
};

type BrandSlug = Pick<CarDetailsItemData, 'slug'>;

type ModelsState = {
  data: CarDetailsItemData[] | [];
} & StoreState;

type BrandsState = {
  data: CarDetailsItemData[] | [];
} & StoreState;

type ContentStore = {
  [ContentStoreBlocks.BRANDS]: BrandsState;
  [ContentStoreBlocks.MODELS]: ModelsState;
};

export type {
  ErrorAction,
  CarDetailsItemData,
  BrandSlug,
  StoreError,
  ContentStore,
};

export { ContentStoreBlocks };
