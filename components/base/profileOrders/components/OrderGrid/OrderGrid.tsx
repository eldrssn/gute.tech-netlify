import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { Loader } from 'components/ui/Loader';
import { selectUserOrders } from 'store/reducers/user/selectors';

import { OrderCard } from '../OrderCard';
import styles from './styles.module.scss';

const OrderGrid: FC = () => {
  const { data: userOrders, isLoading, error } = useSelector(selectUserOrders);

  if (isLoading) {
    return <Loader />;
  }

  if (!userOrders || error) {
    return <p className={styles.noItems}>Заказы не найдены</p>;
  }

  return (
    <>
      {userOrders.results.length > 0 ? (
        <Grid
          container
          spacing={4}
          columns={4}
          className={styles.gridContainer}
        >
          {userOrders.results.map((card) => (
            <Grid key={card.id} item xs={12} sm={6} md={6} lg={4}>
              <OrderCard order={card} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p className={styles.noItems}>Заказы не найдены</p>
      )}
    </>
  );
};

export { OrderGrid };
