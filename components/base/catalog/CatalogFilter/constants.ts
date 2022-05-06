import { FC } from 'react';

import { FilterTypes } from 'api/models/catalog';
import { Filter } from 'types';

import { CheckboxGroup } from 'components/ui/CheckboxGroup';
import { RadioBox } from 'components/ui/RadioBox';
import { Ranger } from 'components/ui/Ranger';

const componentByType: Record<FilterTypes, FC<Filter>> = {
  [FilterTypes.CHECKBOX]: CheckboxGroup,
  [FilterTypes.RADIO]: RadioBox,
  [FilterTypes.RANGE]: Ranger,
};

export { componentByType };
