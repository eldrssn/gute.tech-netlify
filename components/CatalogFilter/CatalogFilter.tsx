import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles.module.css';
import CatalogMenu from '../CatalogMenu';
import CheckboxGroup from '../CheckboxGroup';
import PriceRange from '../PriceRange';

const CatalogFilter: React.FC = () => {
  return (
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
          options={[
            { name: 'abc007', displayName: 'example' },
            { name: 'bcd566', displayName: 'bcd566' },
          ]}
        />
      </Box>
      <CatalogMenu />
    </div>
  );
};

export default CatalogFilter;
