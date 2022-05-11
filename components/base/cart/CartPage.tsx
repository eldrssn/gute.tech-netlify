import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';

import { selectCart, selectOrderTotal } from 'store/reducers/cart/selectors';
import { fetchPaymentMethods } from 'store/reducers/cart/actions';

import { TableOrder } from './components/TableOrder';
import { FormOrdering } from './components/FormOrdering';
import styles from './styles.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectOrderTotal);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  return (
    <Box component='div' className={styles.main}>
      <Typography className={styles.mainTitle}>Корзина</Typography>
      <TableOrder cart={cart} orderTotal={orderTotal} />
      <FormOrdering />
    </Box>
  );
};

export { CartPage };
