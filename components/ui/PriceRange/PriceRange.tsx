import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useRouterQuery from 'hooks/useRouterQuery';

import styles from './styles.module.scss';
import { setQueryParam } from 'hooks/useRouterQuery/helpers';

const PriceRange: React.FC = () => {
  const routerQuery = useRouterQuery();

  const setMaxPrice = setQueryParam(routerQuery, 'maxPrice');
  const setMinPrice = setQueryParam(routerQuery, 'minPrice');

  return (
    <Box className={styles.price_range_wrapper} component='div'>
      <TextField
        onChange={setMinPrice}
        type='number'
        variant='outlined'
        value={routerQuery.getQueryOption('minPrice')}
      />
      <span className={styles.range_separator} />
      <TextField
        onChange={setMaxPrice}
        type='number'
        variant='outlined'
        value={routerQuery.getQueryOption('maxPrice')}
      />
    </Box>
  );
};

export default PriceRange;
