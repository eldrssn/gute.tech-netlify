import { FiltersCategoryResponseData } from 'api/models/catalog';

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

type IconProps = {
  className?: string;
};

export type {
  Sorting,
  FiltersRequest,
  Filter,
  Slug,
  Slugs,
  AnchorClick,
  IconProps,
};
