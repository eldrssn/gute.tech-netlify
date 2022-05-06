import { StoreState } from 'store/types';

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

type ListOptionsItemData = {
  title: string;
  slug: string;
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
