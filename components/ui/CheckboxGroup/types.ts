import { CheckboxValue } from 'api/models/catalog';
import { AnchorClick } from 'types';

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
};

export type { GetQueryOptions, FiltersProps, ExpandedFilterProps };
