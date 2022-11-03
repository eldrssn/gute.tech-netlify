import { FC } from 'react';
import Grid from '@mui/material/Grid';

import { CategoryCard } from '../CategoryCard';
import { Items } from './types';

const SecondRowReversed: FC<Items> = ({ items, lazy }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    {items.firstItem && (
      <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
        <CategoryCard item={items.firstItem} lazy={lazy} />
      </Grid>
    )}
    <Grid item xs={12} lg={6} container spacing={2}>
      {items.secondItem && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard item={items.secondItem} lazy={lazy} isSmallBox />
        </Grid>
      )}
      {items.thirdItem && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard item={items.thirdItem} lazy={lazy} isSmallBox />
        </Grid>
      )}
    </Grid>
  </Grid>
);

export { SecondRowReversed };
