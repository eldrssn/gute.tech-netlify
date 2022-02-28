import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useRouterQuery from '../../hooks/useRouterQuery/useRouterQuery';
import styles from './styles.module.css';

const PriceRange: React.FC = () => {
  const routerQuery = useRouterQuery();

  const setMaxPrice = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;
    routerQuery.set('maxPrice', value);

    if (!value) {
      routerQuery.remove('maxPrice');
    }
  };

  const setMinPrice = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;
    routerQuery.set('minPrice', value);

    if (!value) {
      routerQuery.remove('minPrice');
    }
  };

  return (
    <Box className={styles.price_range_wrapper} component='div'>
      <TextField
        onChange={setMinPrice}
        type='number'
        variant='outlined'
        value={routerQuery.get('minPrice')}
      />
      <span className={styles.range_separator} />
      <TextField
        onChange={setMaxPrice}
        type='number'
        variant='outlined'
        value={routerQuery.get('maxPrice')}
      />
    </Box>
  );
};

export default PriceRange;
