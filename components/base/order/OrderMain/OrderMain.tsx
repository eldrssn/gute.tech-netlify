import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';

import { fetchOrder } from 'store/reducers/user/actions';
import { selectUserOrder } from 'store/reducers/user/selectors';
import { Loader } from 'components/ui/Loader';
import { paymentType, PAID_CONFIRM, PAID_DISPROVE } from './constants';
import { getFullDate } from 'utility/helpers';

import { OrderError } from '../OrderError';
import { ProductTable } from '../ProductTable';
import styles from './styles.module.scss';

const OrderMain: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(selectUserOrder);

  const orderId = router.query.itemSlug;

  useEffect(() => {
    if (!Array.isArray(orderId) && orderId) {
      dispatch(fetchOrder({ orderId }));
    }
  }, [orderId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <OrderError />;
  }

  const dateOrder = getFullDate(new Date(data.created_at));

  return (
    <Box className={styles.mainContent}>
      <Box className={styles.titleBox}>
        <Typography className={styles.orderTitle}>
          Заказ номер: {data.id}
        </Typography>
        <Typography className={styles.orderDate}>{dateOrder}</Typography>
      </Box>
      <Box className={styles.infoBox}>
        <Box>
          <Typography>
            Статус заказа: {data.is_paid ? PAID_CONFIRM : PAID_DISPROVE}
          </Typography>
          <Typography>
            Способ оплаты: {paymentType[data.payment_type]}
          </Typography>
        </Box>
        <Box>
          <Typography>Магазин: {data.branch_office}</Typography>
        </Box>
      </Box>
      <ProductTable products={data.products} />
    </Box>
  );
};

export { OrderMain };
