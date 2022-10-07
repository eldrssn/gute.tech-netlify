import { CheckboxValue } from 'api/models/catalog';
import { AnchorClick, FiltersRequest } from 'types';

type GetQueryOptions = (name: string) => string | string[] | undefined;

type FiltersProps = {
  filters?: CheckboxValue[];
  searchValue?: string;
  setOnChange: (checked: boolean, { value }: CheckboxValue) => void;
  getIsChecked: (name: string) => boolean | undefined;
  handleAnchorClick: AnchorClick;
};

type ExpandedFilterProps = FiltersProps & {
  slug: string;
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<FiltersRequest | null>
  >;
};

type ChooseAllFilters = {
  setFiltersRequest: React.Dispatch<
    React.SetStateAction<FiltersRequest | null>
  >;
  slug: string;
  filters?: CheckboxValue[];
};

export type {
  GetQueryOptions,
  FiltersProps,
  ExpandedFilterProps,
  ChooseAllFilters,
};
