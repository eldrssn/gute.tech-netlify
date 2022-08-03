import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container } from '@mui/material';

import {
  selectCart,
  selectCartOrderTotal,
} from 'store/reducers/cart/selectors';
import { setItemsFromOrder, setItemsSlugs } from 'store/reducers/order/actions';
import { TotalOrderBox } from 'components/main/TotalOrderBox';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';

import { RemoveCheckedButton } from './components/RemoveCheckedButton';
import { TableOrder } from './components/TableOrder';
import { getSelectedCartItems } from './helpers';
import styles from './styles.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const [slugsRemovedElements, setSlugsRemovedElements] = useState<string[]>(
    [],
  );

  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectCartOrderTotal);

  const selectedCartItems = getSelectedCartItems(cart, slugsRemovedElements);

  const SumbitOrder = () => {
    dispatch(setItemsSlugs(slugsRemovedElements));
    dispatch(setItemsFromOrder(selectedCartItems));
  };

  useEffect(() => {
    const slugs = cart.map((item) => item.slug);

    setSlugsRemovedElements(slugs);

    return () => {
      setSlugsRemovedElements([]);
    };
  }, [cart]);

  const isAllItemsSelect = cart.length === slugsRemovedElements.length;

  return (
    <>
      <Container component='div' className={styles.main}>
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
      </Container>
      <TotalOrderBox
        redirectUrl={
          isAllItemsSelect
            ? TotalBoxRedirectUrls.PAYMENT
            : TotalBoxRedirectUrls.ORDER
        }
        onClick={SumbitOrder}
        isCartPage
        slugsRemovedElements={slugsRemovedElements}
      />
    </>
  );
};

export { CartPage };
