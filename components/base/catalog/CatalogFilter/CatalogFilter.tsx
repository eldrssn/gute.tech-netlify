import React from 'react';
import Box from '@mui/material/Box';

import { CheckboxGroup } from 'components/ui/CheckboxGroup';
import { Ranger } from 'components/ui/Ranger';
import { RadioBox } from 'components/ui/RadioBox';

import { filterOptions, radioOptions, rangeOptions } from 'mock/CatalogFilter';

import styles from './catalogFilter.module.scss';

export const CatalogFilter: React.FC = () => (
  <Box className={styles.catalogFilterContainer}>
    <CheckboxGroup
      title='example title'
      queryName='example'
      options={filterOptions}
    />

    <RadioBox title='radio title' queryName='radio' options={radioOptions} />

    <Ranger title='Цена' queryNames={rangeOptions} />
  </Box>
);
