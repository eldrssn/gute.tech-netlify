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
import { items } from 'mock/categories';

import { GroupedItemsItem, ItemKeys } from './types';


const sortedItems = items.sort((a, b) => (a.sort < b.sort ? -1 : 1));

let objByThree: GroupedItemsItem = { first: null, second: null, third: null }
let objByThreeKeys: ItemKeys[] = Object.keys(objByThree) as ItemKeys[]

const groupedItems = sortedItems.reduce<GroupedItemsItem[]>((acc, val, index) => {
  objByThree[objByThreeKeys[index % 3]] = val

  if ((index + 1) % 3 == 0 || index + 1 == sortedItems.length) {
    acc.push(objByThree)

    objByThree = { first: null, second: null, third: null }

    return acc
  }

  return acc
}, [])

type Index = 1 | 2 | 3 | 4;

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed
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
      {groupedItems.map((items, index) => {
        const type: Index = index % 4 + 1 as Index;

        const Component = rowHashMap[type];

        return <Component key={index} items={items} />;
      })}
    </Grid>
    <Description></Description>
  </>
);

export default Home;
