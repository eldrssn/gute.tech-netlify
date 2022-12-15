import { FC } from 'react';
import Grid from '@mui/material/Grid';

import { CategoryCard } from '../CategoryCard';
import { Items } from './types';

const FirstRow: FC<Items> = ({ items, lazy }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    <Grid
      item
      xs={12}
      lg={6}
      container
      spacing={2}
      direction={'column'}
      justifyContent='space-between'
    >
      {items.firstItem && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard item={items.firstItem} lazy={lazy} />
        </Grid>
      )}
      {items.secondItem && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard item={items.secondItem} lazy={lazy} />
        </Grid>
      )}
    </Grid>
    {items.thirdItem && (
      <Grid item xs={12} lg={6} sx={{ height: { xs: '305px', lg: '610px' } }}>
        <CategoryCard item={items.thirdItem} lazy={lazy} />
      </Grid>
    )}
  </Grid>
);

export { FirstRow };
