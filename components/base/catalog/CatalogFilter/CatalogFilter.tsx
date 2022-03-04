import React from 'react';

import Box from '@mui/material/Box';

import CatalogMenu from 'components/base/catalog/CatalogMenu';
import CheckboxGroup from 'components/CheckboxGroup';
import PriceRange from 'components/PriceRange';

import { filterOptions } from 'mock/CatalogFilter';
import styles from './styles.module.css';

const CatalogFilter: React.FC = () => (
  <>
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
  </>
);

export default CatalogFilter;
