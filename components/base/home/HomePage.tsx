import { FC } from 'react';
import { Grid } from '@mui/material';

import { Description } from 'components/base/main/Description';
import {
  FirstRow,
  SecondRow,
  FirstRowReversed,
  SecondRowReversed,
} from 'components/base/main/rows';

import { Items } from 'components/base/main/rows/types';
import { groupedItems } from 'mock/categories';

import { Index } from './types';

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed,
};

const Home: FC = () => (
  <>
    <Grid
      container
      spacing={2}
      justifyContent='center'
      alignItems='center'
      direction={'column'}
      sx={{ padding: '20px 0' }}
    >
      {groupedItems.map((items, index) => {
        const type: Index = ((index % 4) + 1) as Index;

        const Component = rowHashMap[type];

        return <Component key={index} items={items} />;
      })}
    </Grid>
    <Description />
  </>
);

export default Home;
