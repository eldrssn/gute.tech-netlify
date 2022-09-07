import { CheckboxValue } from 'api/models/catalog';
import { AnchorClick } from 'types';

type FiltersProps = {
  filters?: CheckboxValue[];
  searchValue?: string;
  setOnChange: (event: ChangeEvent) => void;
  getIsChecked: (name: string) => boolean;
  handleAnchorClick: AnchorClick;
};

type ExpandedFiltersProps = FiltersProps & {
  slug: string;
};

export type { FiltersProps, ExpandedFiltersProps };
