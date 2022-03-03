import { FC } from 'react';
import { Props as CategoryCardProps } from '../CategoryCard/types';
import { Grid } from '@mui/material';
import { CategoryCard } from '../CategoryCard';

type Items = { items: Array<CategoryCardProps> };

const FirstRowReversed: FC<Items> = ({ items }) => (
  <Grid item xs={12} lg={6} container spacing={2}>
    <Grid item xs={12} lg={6} sx={{ height: { xs: '305px', lg: '610px' } }}>
      <CategoryCard quantity={items[0].quantity} image={items[0].image}>
        {items[0].name}
      </CategoryCard>
    </Grid>
    <Grid
      item
      xs={12}
      lg={6}
      container
      spacing={2}
      direction={'column'}
      justifyContent='space-between'
    >
      {items.length > 1 && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard quantity={items[1].quantity} image={items[1].image}>
            {items[1].name}
          </CategoryCard>
        </Grid>
      )}
      {items.length > 2 && (
        <Grid item sx={{ height: '305px' }}>
          <CategoryCard quantity={items[2].quantity} image={items[2].image}>
            {items[2].name}
          </CategoryCard>
        </Grid>
      )}
    </Grid>
  </Grid>
);

export { FirstRowReversed };
