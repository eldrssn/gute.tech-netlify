import { StoreState } from 'store/types';

type BrandSlug = {
  brandSlug: string;
  transportType?: string;
};

type YearsSlugs = {
  brandSlug: string;
  modelSlug: string;
  transportType?: string;
};

type EnginesSlugs = {
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
  transportType?: string;
};

type ListOptionsItemData = {
  title: string;
  slug: string;
  brands?: ListOptionsItemData[];
  transport_id?: string;
};

type ListOptionsYearData = string;

type ListOptionsItem = {
  data: ListOptionsItemData[];
} & StoreState;

export type {
  BrandSlug,
  YearsSlugs,
  EnginesSlugs,
  ListOptionsItemData,
  ListOptionsYearData,
  ListOptionsItem,
};
