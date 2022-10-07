import type { AppProps } from 'next/app';
import { FiltersCategoryResponseData } from 'api/models/catalog';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
  metricID: number;
};

type Sorting = {
  sort: string;
  order: string;
};

type FiltersRequest = Record<string, (string | number)[]>;

type Filter = {
  filter: FiltersCategoryResponseData;
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<FiltersRequest | null>
  >;
  handleAnchorClick: (event: React.MouseEvent<HTMLElement>) => void;
  filtersRequest: FiltersRequest | null;
};

type Slug = string | string[] | undefined;
type Slugs = Record<string, Slug>;

type AnchorClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

export type {
  ComponentWithPageLayout,
  Sorting,
  FiltersRequest,
  Filter,
  Slug,
  Slugs,
  AnchorClick,
};
