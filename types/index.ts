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

type filtersRequest = Record<string, (string | number)[]>;

type Filter = {
  filter: FiltersCategoryResponseData;
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<filtersRequest | null>
  >;
  handleAnchorClick: (event: React.MouseEvent<HTMLElement>) => void;
  filtersRequest: filtersRequest | null;
};

type Slug = string | string[] | undefined;
type Slugs = Record<string, Slug>;

type AnchorClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

export type {
  ComponentWithPageLayout,
  Sorting,
  filtersRequest,
  Filter,
  Slug,
  Slugs,
  AnchorClick,
};
