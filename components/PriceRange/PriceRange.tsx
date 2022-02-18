import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from './styles.module.css';

const PriceRange: React.FC = () => {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    const priceRange: { [key: string]: string } = {};

    if (!router.isReady) {
      return;
    }

    if (minPrice) {
      priceRange.minPrice = minPrice;
    }

    if (maxPrice) {
      priceRange.maxPrice = maxPrice;
    }

    const newQuery = { ...router.query, ...priceRange };

    if (!minPrice) {
      delete newQuery.minPrice;
    }

    if (!maxPrice) {
      delete newQuery.maxPrice;
    }

    router.push({
      pathname: router.pathname,
      query: { ...newQuery },
    });
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const { minPrice, maxPrice } = router.query;

    if (minPrice) {
      setMinPrice(minPrice as string);
    }

    if (maxPrice) {
      setMaxPrice(maxPrice as string);
    }
  }, [router.isReady]);

  return (
    <Box className={styles.price_range_wrapper} component='div'>
      <TextField
        onChange={(e) => setMinPrice(e.target.value)}
        type='number'
        variant='outlined'
        value={minPrice}
      />
      <span className={styles.range_separator} />
      <TextField
        onChange={(e) => setMaxPrice(e.target.value)}
        type='number'
        variant='outlined'
        value={maxPrice}
      />
    </Box>
  );
};

export default PriceRange;
