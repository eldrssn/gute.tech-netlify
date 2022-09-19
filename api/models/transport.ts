import { StoreState } from 'store/types';

type BrandsSlug = {
  yearSlug: string;
};

type ModelsSlug = {
  yearSlug: string;
  brandSlug: string;
  transportTypeSlug: string;
};

type EnginesSlugs = {
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
  transportTypeSlug: string;
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

type TransportInfoItem = {
  title: string;
  slug: string;
};

type TransportInfoResponseData = {
  type: TransportInfoItem;
  brand: TransportInfoItem;
  model: TransportInfoItem;
  years: number[];
  engine: TransportInfoItem;
};

type TransportInfoRequestData = {
  transportId: string;
};

export type {
  BrandsSlug,
  ModelsSlug,
  EnginesSlugs,
  TransportInfoResponseData,
  TransportInfoRequestData,
  ListOptionsItemData,
  ListOptionsYearData,
  ListOptionsItem,
};
