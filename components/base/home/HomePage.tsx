import { FC, useMemo } from 'react';
import { Grid } from '@mui/material';

import { CATEGORY_QUERY } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { groupItems } from 'utility/helpers';
import { catalogData } from 'mock/catalogData';

import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { Description } from 'components/base/main/Description';
import {
  FirstRow,
  SecondRow,
  FirstRowReversed,
  SecondRowReversed,
} from 'components/base/main/rows';
import { Items } from 'components/base/main/rows/types';

import { getGroupedChildren } from './helpers';
import { Index } from './types';

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed,
};

const Home: FC = () => {
  const router = useRouterQuery();
  const categoryQuery = router.getQueryOption(CATEGORY_QUERY);

  const groupedItems = useMemo(
    () =>
      categoryQuery
        ? getGroupedChildren(categoryQuery, catalogData)
        : groupItems(catalogData),
    [categoryQuery],
  );

  return (
    <>
      {categoryQuery && <NavigationBreadcrumbs isQuery />}

      <Grid
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
        direction={'column'}
        sx={{ padding: '20px 0' }}
      >
        {groupedItems?.map((items, index) => {
          const type: Index = ((index % 4) + 1) as Index;

          const Component = rowHashMap[type];

          return <Component key={index} items={items} />;
        })}
      </Grid>
      <Description />
    </>
  );
};

export default Home;
