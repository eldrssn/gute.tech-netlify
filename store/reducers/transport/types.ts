import { StoreState, StoreError, ErrorAction } from 'store/types';

enum TransportStoreBlocks {
  BRANDS = 'brands',
  MODELS = 'models',
  YEARS = 'years',
  ENGINES = 'engines',
}

type CarDetailsItemData = {
  title: string;
  slug: string;
};

type BrandSlug = {
  brandSlug: string;
};

type YearsSlugs = {
  brandSlug: string;
  modelSlug: string;
};

type EnginesSlugs = {
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
};

type YearsState = {
  data: CarDetailsItemData[] | [];
} & StoreState;

type EnginesState = {
  data: CarDetailsItemData[] | [];
} & StoreState;

type ModelsState = {
  data: CarDetailsItemData[] | [];
} & StoreState;

type BrandsState = {
  data: CarDetailsItemData[] | [];
} & StoreState;

type TransportStore = {
  [TransportStoreBlocks.BRANDS]: BrandsState;
  [TransportStoreBlocks.MODELS]: ModelsState;
  [TransportStoreBlocks.YEARS]: YearsState;
  [TransportStoreBlocks.ENGINES]: EnginesState;
};

export type {
  ErrorAction,
  CarDetailsItemData,
  BrandSlug,
  YearsSlugs,
  EnginesSlugs,
  StoreError,
  TransportStore,
};

export { TransportStoreBlocks };
