import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

import { selectOrder, selectOrderTotal } from 'store/reducers/order/selectors';

import { TableOrder } from './components/TableOrder';
import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  const router = useRouter();

  const order = useSelector(selectOrder);
  const orderTotal = useSelector(selectOrderTotal);

  const onClickButton = () => {
    router.push('/payment');
  };

  if (!order || !orderTotal) {
    router.push('/cart');
    return null;
  }

  return (
    <Box component='div' className={styles.main}>
      <Box className={styles.totalBoxContainer}>
        <Box className={styles.totalBox}>
          <Typography className={styles.orderTotal}>
            Всего: {orderTotal}&#8381;
          </Typography>
          <Button onClick={onClickButton} variant={'contained'}>
            Заказать
          </Button>
        </Box>
      </Box>
      <Typography className={styles.mainTitle}>Заказ</Typography>
      <TableOrder order={order} orderTotal={orderTotal} />
    </Box>
  );
};

export { OrderPage };
