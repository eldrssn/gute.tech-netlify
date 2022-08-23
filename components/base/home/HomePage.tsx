import { FC, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { Description } from './components/Description';
import {
  FirstRow,
  SecondRow,
  FirstRowReversed,
  SecondRowReversed,
} from './components/rows';
import { Loader } from 'components/ui/Loader';
import { Items } from './components/rows/types';
import { groupItems } from 'utility/helpers';
import {
  selectCategoriesSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { selectTransportStore } from 'store/reducers/transport/selectors';

import { getGroupedChildren } from './helpers';
import { Index, Props } from './types';

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed,
};

const Home: FC<Props> = ({ isParentCategory }) => {
  const router = useRouter();

  const { transportId } = useSelector(selectTransportStore);

  const currentSelector = transportId
    ? selectCategoriesSearchRead
    : selectCategoriesTreeList;

  const { isLoading, data: categories } = useSelector(currentSelector);
  const { categorySlug } = router.query;

  const groupedItems = useMemo(
    () =>
      categorySlug
        ? getGroupedChildren(categorySlug, categories)
        : groupItems(categories),
    [categorySlug, categories],
  );

  const isCategories = categories.length > 0;

  return (
    <>
      {(categorySlug || transportId) && !isParentCategory && (
        <NavigationBreadcrumbs />
      )}

      <Grid
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
        direction={'column'}
        sx={{ padding: '20px 0' }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isCategories ? (
              groupedItems?.map((items, index) => {
                const type: Index = ((index % 4) + 1) as Index;

                const Component = rowHashMap[type];

                return (
                  <Component
                    key={index}
                    items={items}
                    isTransportSearch={!!transportId}
                  />
                );
              })
            ) : (
              <p>Pезультаты не найдены</p>
            )}
          </>
        )}
      </Grid>
      <Description />
    </>
  );
};

export default Home;
