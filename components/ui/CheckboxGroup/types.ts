import { CheckboxValue } from 'api/models/catalog';

type GetQueryOptions = (name: string) => string | string[] | undefined;

type ButtonProps = {
  onClick: () => void;
  className?: string;
};

type FiltersProps = {
  filters?: CheckboxValue[];
  searchValue?: string;
  setOnChange: (checked: boolean, { value }: CheckboxValue) => void;
  getIsChecked: (name: string) => boolean | undefined;
  handleAnchorClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

type ExpandedFilterProps = FiltersProps & {
  slug: string;
};

export type { GetQueryOptions, ButtonProps, FiltersProps, ExpandedFilterProps };
