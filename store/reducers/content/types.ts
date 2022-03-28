import { StoreState, StoreError, ErrorAction } from 'store/types';

enum ContentStoreBlocks {
  BRANDS = 'brands',
  MODELS = 'models',
}

type ModelsData = {
  title: string;
  slug: string;
};

type BrandsData = {
  title: string;
  slug: string;
};

type BrandSlug = Pick<BrandsData, 'slug'>;

type ModelsState = {
  data: ModelsData[] | null;
} & StoreState;

type BrandsState = {
  data: BrandsData[] | null;
} & StoreState;

type ContentStore = {
  [ContentStoreBlocks.BRANDS]: BrandsState;
  [ContentStoreBlocks.MODELS]: ModelsState;
};

export type {
  ErrorAction,
  BrandsData,
  BrandSlug,
  StoreError,
  ContentStore,
  ModelsData,
};

export { ContentStoreBlocks };
