import { FC } from 'react';

import { Grid } from '@mui/material';

import { CategoryCard } from 'components/base/main/CategoryCard';

import { Items } from './types';

const FirstRowReversed: FC<Items> = ({ items, isTransportSearch }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    {items.firstItem && (
      <Grid item xs={12} lg={6} sx={{ height: { xs: '305px', lg: '610px' } }}>
        <CategoryCard
          item={items.firstItem}
          isTransportSearch={isTransportSearch}
        />
      </Grid>
    )}
    <Grid
      item
      xs={12}
      lg={6}
      container
      spacing={2}
      direction={'column'}
      justifyContent='space-between'
    >
      {items.secondItem && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard
            item={items.secondItem}
            isTransportSearch={isTransportSearch}
          />
        </Grid>
      )}
      {items.thirdItem && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard
            item={items.thirdItem}
            isTransportSearch={isTransportSearch}
          />
        </Grid>
      )}
    </Grid>
  </Grid>
);

export { FirstRowReversed };
