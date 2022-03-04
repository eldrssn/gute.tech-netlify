import React from 'react';

import Box from '@mui/material/Box';

import CatalogMenu from '../CatalogMenu';
import CheckboxGroup from '../CheckboxGroup';
import PriceRange from '../PriceRange';

import { filterOptions } from '../../mock/CatalogFilter';
import styles from './styles.module.css';

const CatalogFilter: React.FC = () => (
  <div>
    <Box
      className={styles.catalog_filter_wrapper}
      component='form'
      noValidate
      autoComplete='off'
      sx={{ width: 300 }}
    >
      <PriceRange />
      <CheckboxGroup
        title='example title'
        queryName='example'
        options={filterOptions}
      />
    </Box>
    <CatalogMenu />
  </div>
);

export default CatalogFilter;
