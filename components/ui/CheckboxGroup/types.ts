import { CheckboxValue } from 'api/models/catalog';

type GetQueryOptions = (name: string) => string | string[] | undefined;

type AnchorClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

type ButtonProps = {
  onClick: AnchorClick;
  className?: string;
};

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

export type { GetQueryOptions, ButtonProps, FiltersProps, ExpandedFilterProps };
