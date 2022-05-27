import type { AppProps } from 'next/app';
import { FiltersCategoryResponseData } from 'api/models/catalog';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

type Sorting = {
  sort: string;
  order: string;
};

type FilterRequest = Record<string, (string | number)[]>;

type Filter = {
  filter: FiltersCategoryResponseData;
  setFilterRequest: React.Dispatch<React.SetStateAction<FilterRequest | null>>;
};

export type { ComponentWithPageLayout, Sorting, FilterRequest, Filter };
