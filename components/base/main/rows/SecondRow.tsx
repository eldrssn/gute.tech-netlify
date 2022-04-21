import { FC } from 'react';

import { Grid } from '@mui/material';

import { CategoryCard } from 'components/base/main/CategoryCard';

import { Items } from './types';

const SecondRow: FC<Items> = ({ items }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    <Grid item xs={12} lg={6} container spacing={2}>
      {items.firstItem && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard item={items.firstItem} />
        </Grid>
      )}
      {items.secondItem && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard item={items.secondItem} />
        </Grid>
      )}
    </Grid>
    {items.thirdItem && (
      <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
        <CategoryCard item={items.thirdItem} />
      </Grid>
    )}
  </Grid>
);

export { SecondRow };
