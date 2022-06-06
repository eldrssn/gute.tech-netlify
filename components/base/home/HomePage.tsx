import { FC, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

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
import { groupItems } from 'utility/helpers';
import { fetchTransportReadCategories } from 'store/reducers/catalog/actions';
import {
  selectCategoriesSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';

import { getGroupedChildren } from './helpers';
import { isFromWidgets } from './constants';
import { Index } from './types';
import { addItemToLocaleStorage } from 'components/main/Header/helpers';
import { IS_FROM_WIDGETS } from 'utility/utils/constants';

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
  const transportId = getQueryOption(QueryUrl.TRANSPORT_ID);

  const currentSelector = transportId
    ? selectCategoriesSearchRead
    : selectCategoriesTreeList;

  const { isLoading, data: categories } = useSelector(currentSelector);

  useEffect(() => {
    if (typeof transportId === 'string') {
      dispatch(fetchTransportReadCategories({ transportId }));
    }
  }, [transportId, dispatch]);

  useEffect(() => {
    categoryQuery
      ? addItemToLocaleStorage({
          slug: IS_FROM_WIDGETS,
          title: isFromWidgets.TRUE,
        })
      : addItemToLocaleStorage({
          slug: IS_FROM_WIDGETS,
          title: isFromWidgets.FALSE,
        });
  }, [categoryQuery]);

  const groupedItems = useMemo(
    () =>
      categoryQuery
        ? getGroupedChildren(categoryQuery, [...categories, ...categories])
        : groupItems([...categories, ...categories, ...categories]),
    [categoryQuery, categories],
  );

  const isCategories = categories.length > 0;

  return (
    <>
      {(categoryQuery || transportId) && <NavigationBreadcrumbs isQuery />}

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
