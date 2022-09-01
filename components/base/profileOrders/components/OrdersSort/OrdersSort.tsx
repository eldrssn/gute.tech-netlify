/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import cn from 'classnames';
import Box from '@mui/material/Box';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { getQueryParams } from 'hooks/useRouterQuery/helpers';

import { changeOrderType } from './helpers';
import { ORDERING_QUERY, DIRECTIONS } from '../../constants';
import styles from './styles.module.scss';

const OrdersSort: FC = () => {
  const routerQuery = useRouterQuery();

  const orderType = getQueryParams(routerQuery, ORDERING_QUERY);

  const setDirectionByDate = () => {
    const changedOrderType = changeOrderType(orderType);
    routerQuery.setQueryOption({ [ORDERING_QUERY]: changedOrderType });
  };

  const isDown = () => orderType === DIRECTIONS.DOWN;

  return (
    <div className={styles.sortContainer}>
      <span className={styles.sortItem}>Сортировать по:</span>
      <Box className={styles.sortButton}>
        <a
          className={cn(styles.sortItem, styles.sortItemType, styles.active, {
            [styles.down]: isDown(),
          })}
          onClick={setDirectionByDate}
        >
          Дате
        </a>
      </Box>
    </div>
  );
};

export { OrdersSort };
