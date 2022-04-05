import { StoreState } from 'store/types';

export type ListOptionsItemData = {
  title: string;
  slug: string;
};

export type ListOptionsItem = {
  data: ListOptionsItemData[] | [];
} & StoreState;

export type BrandSlug = {
  brandSlug: string;
};

export type YearsSlugs = {
  brandSlug: string;
  modelSlug: string;
};

export type EnginesSlugs = {
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
};
