import React, { FC } from 'react';
import classnames from 'classnames/bind';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { getQueryParams } from 'hooks/useRouterQuery/helpers';

import { ORDER_QUERY } from '../constants';
import { changeOrderType } from './helpers';
import { DIRECTIONS, ORDER_TYPES } from './constants';

import styles from './catalogSort.module.scss';

const cn = classnames.bind(styles);

export const CatalogSort: FC = () => {
  const routerQuery = useRouterQuery();

  const orderType = getQueryParams(routerQuery, ORDER_QUERY);

  const setDirectionByPopular = () => {
    const changedOrderType = changeOrderType(orderType, ORDER_TYPES.byPopular);
    routerQuery.setQueryOption(ORDER_QUERY, changedOrderType);
  };

  const setDirectionByPrice = () => {
    const changedOrderType = changeOrderType(orderType, ORDER_TYPES.byPrice);
    routerQuery.setQueryOption(ORDER_QUERY, changedOrderType);
  };

  if (!orderType) {
    setDirectionByPopular();
  }

  const isActive = (start: string) => orderType.startsWith(start);
  const isUp = (start: string) => orderType === `${start}${DIRECTIONS.UP}`;

  return (
    <div className={styles.sortContainer}>
      <span className={styles.sortItem}>Сортировать по:</span>
      <a
        className={cn(styles.sortItem, styles.sortItemType, {
          [styles.active]: isActive(ORDER_TYPES.byPopular),
          [styles.up]: isUp(ORDER_TYPES.byPopular),
        })}
        onClick={setDirectionByPopular}
      >
        популярности
      </a>
      <a
        className={cn(styles.sortItem, styles.sortItemType, {
          [styles.active]: isActive(ORDER_TYPES.byPrice),
          [styles.up]: isUp(ORDER_TYPES.byPrice),
        })}
        onClick={setDirectionByPrice}
      >
        цене
      </a>
    </div>
  );
};
