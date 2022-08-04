import React, { FC, useEffect } from 'react';
import classnames from 'classnames/bind';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { getQueryParams } from 'hooks/useRouterQuery/helpers';

import { ORDER_QUERY } from '../../constants';
import { changeOrderType } from './helpers';
import { DIRECTIONS, ORDER_TYPES } from './constants';

import { CatalogSortProps } from './types';
import styles from './catalogSort.module.scss';

const cn = classnames.bind(styles);

const CatalogSort: FC<CatalogSortProps> = ({
  setSorting,
  setAnchorApplyButton,
}) => {
  const routerQuery = useRouterQuery();

  const orderType = getQueryParams(routerQuery, ORDER_QUERY);

  useEffect(() => {
    const sortingTypes: Record<string, () => void> = {
      byPopularDown: () => setSorting({ sort: 'popular', order: 'asc' }),
      byPopularUp: () => setSorting({ sort: 'popular', order: 'desc' }),
      byPriceUp: () => setSorting({ sort: 'price', order: 'desc' }),
      byPriceDown: () => setSorting({ sort: 'price', order: 'asc' }),
    };

    orderType && sortingTypes[orderType]();
  }, [orderType, setSorting]);

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!setAnchorApplyButton || !event) {
      return;
    }
    setAnchorApplyButton(null);
    setAnchorApplyButton(event.currentTarget);
  };

  const setDirectionByPopular = () => {
    const changedOrderType = changeOrderType(orderType, ORDER_TYPES.byPopular);
    routerQuery.setQueryOption({ [ORDER_QUERY]: changedOrderType });
  };

  const setDirectionByPrice = () => {
    const changedOrderType = changeOrderType(orderType, ORDER_TYPES.byPrice);
    routerQuery.setQueryOption({ [ORDER_QUERY]: changedOrderType });
  };

  if (!orderType) {
    setDirectionByPopular();
  }

  const isActive = (start: string) => orderType.startsWith(start);
  const isDown = (start: string) => orderType === `${start}${DIRECTIONS.DOWN}`;

  return (
    <div className={styles.sortContainer}>
      <span className={styles.sortItem}>Сортировать по:</span>
      <div className='sortButtons' onClick={handleAnchorClick}>
        <a
          className={cn(styles.sortItem, styles.sortItemType, {
            [styles.active]: isActive(ORDER_TYPES.byPopular),
            [styles.up]: isDown(ORDER_TYPES.byPopular),
          })}
          onClick={setDirectionByPopular}
        >
          популярности
        </a>
        <a
          className={cn(styles.sortItem, styles.sortItemType, {
            [styles.active]: isActive(ORDER_TYPES.byPrice),
            [styles.down]: isDown(ORDER_TYPES.byPrice),
          })}
          onClick={setDirectionByPrice}
        >
          цене
        </a>
      </div>
    </div>
  );
};

export { CatalogSort };
