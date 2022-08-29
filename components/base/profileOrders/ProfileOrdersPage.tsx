import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Container, Box } from '@mui/material';

import { AsideNavigation } from 'components/ui/AsideNavigation';
import { PaginationNav } from 'components/ui/PaginationNav';
import { selectUserOrders } from 'store/reducers/user/selectors';
import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';
import { fetchOrders } from 'store/reducers/user/actions';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { makeStringify } from 'utility/helpers';

import { SearchPanel } from './components/SearchPanel';
import { OrderGrid } from './components/OrderGrid';
import { OrdersSort } from './components/OrdersSort';
import { OrdersFilter } from './components/OrdersFilter';
import { isNotEnoughtItems } from './helpers';
import { PAGE_QUERY, NUM_PAGES_IN_SEARCH } from './constants';
import styles from './styles.module.scss';

const ProfileOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();
  const { getQueryOption } = useRouterQuery();

  const { data: userOrders } = useSelector(selectUserOrders);
  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  const { ordering, created_after, created_before } = router.query;
  const { pages, total } = userOrders;

  const order = makeStringify(ordering);
  const pageCount = Number(
    searchValue.length > 0 ? NUM_PAGES_IN_SEARCH : pages,
  );

  useEffect(() => {
    if (isAuthorized || loadingAuthorized) {
      return;
    }

    router.push('/');
  }, [isAuthorized, router, loadingAuthorized]);

  useEffect(() => {
    if (!router.isReady || !total) {
      return;
    }
    const pageFromQuery = Number(getQueryOption(PAGE_QUERY));

    if (pageFromQuery) {
      setPage(pageFromQuery);
    }

    if (isNotEnoughtItems(total)) {
      setPage(1);
    }
  }, [router.isReady, getQueryOption, total]);

  useEffect(() => {
    if (Array.isArray(created_after) || Array.isArray(created_before)) {
      return;
    }

    dispatch(fetchOrders({ order, created_after, created_before, page }));
  }, [created_after, created_before, dispatch, order, page]);

  return (
    <Container disableGutters className={styles.mainContainer}>
      <Box>
        <h1>История заказов</h1>
      </Box>

      <Box className={styles.mainBox}>
        <AsideNavigation />

        <Box className={styles.mainContent}>
          <Box
            component='section'
            className={cn(styles.cardHeader, styles.cardHeaderContainer)}
          >
            <SearchPanel
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <OrdersSort />
            <OrdersFilter />
            <PaginationNav
              pageCount={pageCount}
              currentPage={page}
              setPage={setPage}
            />
          </Box>
          <OrderGrid searchValue={searchValue} />
        </Box>
      </Box>
    </Container>
  );
};

export { ProfileOrdersPage };
