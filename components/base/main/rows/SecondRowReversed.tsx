import { FC } from 'react';

import { Grid } from '@mui/material';

import { CategoryCard } from 'components/base/main/CategoryCard';
import { Items } from './types';

const SecondRowReversed: FC<Items> = ({ items }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    {items.firstItem && (
      <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
        <CategoryCard
          quantity={items.firstItem.quantity}
          image={items.firstItem.image}
          url={items.firstItem.url}
          name={items.firstItem.name}
        />
      </Grid>
    )}
    <Grid item xs={12} lg={6} container spacing={2}>
      {items.secondItem && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard
            quantity={items.secondItem.quantity}
            image={items.secondItem.image}
            url={items.secondItem.url}
            name={items.secondItem.name}
          />
        </Grid>
      )}
      {items.thirdItem && (
        <Grid item xs={12} lg={6} sx={{ height: '305px' }}>
          <CategoryCard
            quantity={items.thirdItem.quantity}
            image={items.thirdItem.image}
            url={items.thirdItem.url}
            name={items.thirdItem.name}
          />
        </Grid>
      )}
    </Grid>
  </Grid>
);

export { SecondRowReversed };
