import { FC } from 'react';

import { Grid } from '@mui/material';

import { CategoryCard } from 'components/base/main/CategoryCard';

import { Items } from './types';

const FirstRow: FC<Items> = ({ items }) => (
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
          <CategoryCard item={items.firstItem} />
        </Grid>
      )}
      {items.secondItem && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard item={items.secondItem} />
        </Grid>
      )}
    </Grid>
    {items.thirdItem && (
      <Grid item xs={12} lg={6} sx={{ height: { xs: '305px', lg: '610px' } }}>
        <CategoryCard item={items.thirdItem} />
      </Grid>
    )}
  </Grid>
);

export { FirstRow };
