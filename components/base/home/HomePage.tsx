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
import { addItemToLocaleStorage, groupItems } from 'utility/helpers';
import { fetchTransportReadCategories } from 'store/reducers/catalog/actions';
import {
  selectCategoriesSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { selectTransportStore } from 'store/reducers/transport/selectors';
import { IS_FROM_WIDGETS, isFromWidgets } from 'utility/utils/constants';

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

  const { transportId } = useSelector(selectTransportStore);

  const currentSelector = transportId
    ? selectCategoriesSearchRead
    : selectCategoriesTreeList;

  const { isLoading, data: categories } = useSelector(currentSelector);
  const categoryQuery = getQueryOption(QueryUrl.CATEGORY_QUERY);

  useEffect(() => {
    if (transportId) {
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
        ? getGroupedChildren(categoryQuery, categories)
        : groupItems(categories),
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
