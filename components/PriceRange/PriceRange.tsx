import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useRouterQuery from '../../hooks/useRouterQuery';
import styles from './styles.module.css';

const PriceRange: React.FC = () => {
  const routerQuery = useRouterQuery();

  const setPrice = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: 'maxPrice' | 'minPrice',
  ) => {
    const { value } = event.target;

    routerQuery.setQueryOption(type, value);

    if (!value) {
      routerQuery.removeQuery(type);
    }
  };

  const setMaxPrice = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setPrice(event, 'maxPrice');

  const setMinPrice = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setPrice(event, 'minPrice');

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
