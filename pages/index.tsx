import { Grid } from '@mui/material';
import { FC } from 'react';
import { items } from 'mock/categories';
import { Category } from 'components/base/main/CategoryCard/types';
import {
  FirstRow,
  SecondRow,
  FirstRowReversed,
  SecondRowReversed,
} from 'components/base/main/rows';
import { Description } from 'components/base/main/Description';

const sortedItems = items.sort((a, b) => (a.sort < b.sort ? -1 : 1));

const groupedItems: Category[][] = [];

for (let i = 0; i < sortedItems.length; i += 3) {
  groupedItems.push(sortedItems.slice(i, i + 3));
}

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
      {groupedItems.map((items, key) => {
        if (key % 4 == 0) {
          return <FirstRow key={key} items={items} />;
        } else if (key % 4 == 1) {
          return <SecondRow key={key} items={items} />;
        } else if (key % 4 == 2) {
          return <FirstRowReversed key={key} items={items} />;
        } else {
          return <SecondRowReversed key={key} items={items} />;
        }
      })}
    </Grid>
    <Description></Description>
  </>
);

export default Home;
