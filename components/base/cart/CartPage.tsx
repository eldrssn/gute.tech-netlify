import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

import { selectCart, selectOrderTotal } from 'store/reducers/cart/selectors';

import TableOrder from './components/TableOrder';
import Form from './components/RegistrationForm';

import styles from './styles.module.css';

const CartPage: React.FC = () => {
  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <Box component='div' className={styles.main}>
      <Typography className={styles.mainTitle}>Корзина</Typography>
      <TableOrder cart={cart} orderTotal={orderTotal} />
      <Form />
    </Box>
  );
};

export default CartPage;
