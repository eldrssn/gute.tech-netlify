import { FC, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { Description } from 'components/base/main/Description';
import {
  FirstRow,
  SecondRow,
  FirstRowReversed,
  SecondRowReversed,
} from 'components/base/main/rows';
import { Loader } from 'components/ui/Loader';
import { Items } from 'components/base/main/rows/types';
import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { groupItems, getSlugsFromUrl } from 'utility/helpers';
import { fetchTransportReadCategories } from 'store/reducers/catalog/actions';
import {
  selectCategoriesSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';

import { getGroupedChildren } from './helpers';
import { Index } from './types';

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed,
};

const Home: FC = () => {
  const dispatch = useDispatch();
  const { getQueryOption } = useRouterQuery();
  const categoryQuery = getQueryOption(QueryUrl.CATEGORY_QUERY);
  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const currentSelector = transportQuery
    ? selectCategoriesSearchRead
    : selectCategoriesTreeList;

  const { isLoading, data: categories } = useSelector(currentSelector);

  useEffect(() => {
    if (transportQuery) {
      const { brandSlug, modelSlug, yearSlug, engineSlug } =
        getSlugsFromUrl(transportQuery);

      dispatch(
        fetchTransportReadCategories({
          brandSlug,
          modelSlug,
          yearSlug,
          engineSlug,
        }),
      );
    }
  }, [transportQuery, dispatch]);

  const groupedItems = useMemo(
    () =>
      categoryQuery
        ? getGroupedChildren(categoryQuery, categories)
        : groupItems(categories),
    [categoryQuery, categories],
  );

  const isCategories = categories.length > 0;

  return (
    <>
      {(categoryQuery || transportQuery) && <NavigationBreadcrumbs isQuery />}

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
                    isTransportSearch={!!transportQuery}
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
