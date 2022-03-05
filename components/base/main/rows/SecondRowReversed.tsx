import { FC } from 'react';

import { Grid } from '@mui/material';

import { CategoryCard } from 'components/base/main/CategoryCard';
import { Items } from './types';

const SecondRowReversed: FC<Items> = ({ items }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    {items.first && (
      <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
        <CategoryCard quantity={items.first.quantity} image={items.first.image}>
          {items.first.name}
        </CategoryCard>
      </Grid>
    )}
    <Grid item xs={12} lg={6} container spacing={2}>
      {items.second && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard quantity={items.second.quantity} image={items.second.image}>
            {items.second.name}
          </CategoryCard>
        </Grid>
      )}
      {items.third && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard quantity={items.third.quantity} image={items.third.image}>
            {items.third.name}
          </CategoryCard>
        </Grid>
      )}
    </Grid>
  </Grid>
);

export { SecondRowReversed };
