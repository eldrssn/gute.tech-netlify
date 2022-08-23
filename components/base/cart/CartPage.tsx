import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container } from '@mui/material';

import {
  selectCart,
  selectCartOrderTotal,
} from 'store/reducers/cart/selectors';
import { setAllChecked } from 'store/reducers/cart/actions';

import { RemoveCheckedButton } from './components/RemoveCheckedButton';
import { TableOrder } from './components/TableOrder';
import styles from './styles.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectCartOrderTotal);

  useEffect(() => {
    dispatch(setAllChecked());
  }, [dispatch]);

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
