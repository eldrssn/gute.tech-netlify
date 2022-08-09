import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';

import {
  selectCart,
  selectCartOrderTotal,
} from 'store/reducers/cart/selectors';

import { RemoveCheckedButton } from './components/RemoveCheckedButton';
import { TableOrder } from './components/TableOrder';
import styles from './styles.module.scss';

const CartPage: React.FC = () => {
  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectCartOrderTotal);

  return (
    <>
      <Container component='div' className={styles.main}>
        <Typography className={styles.mainTitle}>Корзина</Typography>
        <RemoveCheckedButton cart={cart} />
        <TableOrder cart={cart} orderTotal={orderTotal} />
      </Container>
    </>
  );
};

export { CartPage };
