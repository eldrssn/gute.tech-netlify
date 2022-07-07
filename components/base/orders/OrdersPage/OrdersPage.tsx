import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Container, Box } from '@mui/material';

import { OrderGrid } from 'components/base/orders/OrderGrid';
import { OrdersSort } from 'components/base/orders/OrdersSort';
import { OrdersFilter } from 'components/base/orders/OrdersFilter';
import { AsideNavigation } from 'components/ui/AsideNavigation';
import { PaginationNav } from 'components/ui/PaginationNav';
import { selectUserOrders } from 'store/reducers/user/selectors';
import { fetchOrders } from 'store/reducers/user/actions';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { makeStringify } from 'utility/helpers';

import { isNotEnoughtItems } from '../helpers';
import { PAGE_QUERY } from '../constants';
import styles from './styles.module.scss';

const OrdersPage = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const router = useRouter();
  const { getQueryOption } = useRouterQuery();

  const { ordering, created_after, created_before } = router.query;
  const { data: userOrders } = useSelector(selectUserOrders);
  const { pages, total } = userOrders;

  const order = makeStringify(ordering);
  const pageCount = Number(pages);

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
    if (
      Array.isArray(created_after) ||
      Array.isArray(created_before) ||
      !order
    ) {
      return;
    }
    dispatch(fetchOrders({ order, created_after, created_before, page }));
  }, [created_after, created_before, dispatch, order, page]);

  return (
    <Container className={styles.mainContainer}>
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
            <OrdersSort />
            <OrdersFilter />
            <PaginationNav
              pageCount={pageCount}
              currentPage={page}
              setPage={setPage}
            />
          </Box>
          <OrderGrid />
        </Box>
      </Box>
    </Container>
  );
};

export { OrdersPage };
