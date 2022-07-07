import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';

import { selectCart, selectOrderTotal } from 'store/reducers/cart/selectors';
import {
  fetchPaymentMethods,
  clearCreateOrdering,
} from 'store/reducers/cart/actions';

import { RemoveCheckedButton } from './components/RemoveCheckedButton';
import { TableOrder } from './components/TableOrder';
import { FormOrdering } from './components/FormOrdering';
import styles from './styles.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const [slugsRemovedElements, setSlugsRemovedElements] = useState<string[]>(
    [],
  );

  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectOrderTotal);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
    dispatch(clearCreateOrdering());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component='div' className={styles.main}>
      <Typography className={styles.mainTitle}>Корзина</Typography>
      <RemoveCheckedButton
        cart={cart}
        slugsRemovedElements={slugsRemovedElements}
        setSlugsRemovedElements={setSlugsRemovedElements}
      />
      <TableOrder
        cart={cart}
        orderTotal={orderTotal}
        slugsRemovedElements={slugsRemovedElements}
        setSlugsRemovedElements={setSlugsRemovedElements}
      />
      <FormOrdering />
    </Box>
  );
};

export { CartPage };
