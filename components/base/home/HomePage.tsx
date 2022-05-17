import { FC, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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
import { fetchSearchReadCategory } from 'store/reducers/catalog/actions';
import { selectRootCategories } from 'store/reducers/catalog/selectors';

import { getGroupedChildren, getlastQueryUrl } from './helpers';
import { rootCategories } from './constants';
import { Index } from './types';

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed,
};

const Home: FC = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const routerQuery = useRouterQuery();
  const categoryQuery = routerQuery.getQueryOption(QueryUrl.CATEGORY_QUERY);
  const transportQuery = routerQuery.getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const lastQueryUrl = getlastQueryUrl(query);

  const currentRootCategories = useSelector(
    selectRootCategories(rootCategories[lastQueryUrl]),
  );

  const { isLoading, data: categories } = currentRootCategories;

  useEffect(() => {
    if (transportQuery) {
      const { brandSlug, modelSlug, yearSlug, engineSlug } =
        getSlugsFromUrl(transportQuery);

      dispatch(
        fetchSearchReadCategory({
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
            {categories.length ? (
              groupedItems?.map((items, index) => {
                const type: Index = ((index % 4) + 1) as Index;

                const Component = rowHashMap[type];

                return <Component key={index} items={items} />;
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
