import { FC } from 'react';
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
  selectTransportReadCategories,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { selectTransportStore } from 'store/reducers/transport/selectors';
import { getCategory, makeAnArray } from 'utility/helpers';

import { Index, Props } from './types';

const rowHashMap: Record<Index, FC<Items>> = {
  1: FirstRow,
  2: SecondRow,
  3: FirstRowReversed,
  4: SecondRowReversed,
};

const Home: FC<Props> = ({ isCatalog }) => {
  const router = useRouter();

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);

  const { transportId } = useSelector(selectTransportStore);

  const categoryTreeListSelector = transportId
    ? selectTransportReadCategories
    : selectCategoriesTreeList;
  const categoriesTreeList = useSelector(categoryTreeListSelector);
  const { data: categoriesTreeListData, isLoading } = categoriesTreeList;

  const catalogCategory = getCategory({
    categoryTree: categoriesTreeListData,
    query: categorySlugAnArray,
  });

  const category = isCatalog
    ? catalogCategory?.children
    : categoriesTreeListData;

  if (!category) {
    return null;
  }

  const groupedItems = groupItems(category);

  const isCategories = groupedItems && groupedItems.length > 0;

  if (!groupedItems) {
    return null;
  }

  return (
    <>
      {(categorySlug || transportId) && !isCatalog && <NavigationBreadcrumbs />}

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
              groupedItems.map((items, index) => {
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
