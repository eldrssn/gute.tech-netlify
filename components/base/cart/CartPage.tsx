/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { fetchItemsFromCart, setAllChecked } from 'store/reducers/cart/actions';
import {
  selectCart,
  selectCartTotal,
  selectCartSavedItems,
  selectCartUpdated,
  selectCartError,
  selectCartSavedError,
  selectCartLoading,
  selectCartSavedLoading,
  selectCartCheckedItemsTotal,
} from 'store/reducers/cart/selectors';
import { selectLoadingAuthorized } from 'store/reducers/authentication/selectors';

import { RemoveCheckedButton } from './components/RemoveCheckedButton';
import { TableOrder } from './components/TableOrder';
import styles from './styles.module.scss';

const CartPage: React.FC = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const dispatch = useDispatch();

  const cartCheckedItemsTotal = useSelector(selectCartCheckedItemsTotal);
  const isLoadingAuthorized = useSelector(selectLoadingAuthorized);
  const cartSavedItems = useSelector(selectCartSavedItems);
  const cartIsLoading = useSelector(selectCartLoading);
  const cartSavedIsLoading = useSelector(selectCartSavedLoading);
  const cartError = useSelector(selectCartError);
  const cartSavedError = useSelector(selectCartSavedError);
  const cartIsUpdated = useSelector(selectCartUpdated);
  const cartTotal = useSelector(selectCartTotal);
  const cart = useSelector(selectCart);

  const cartSavedProducts = cartSavedItems.map((savedItem) => {
    const productSlug = savedItem.product.slug;
    const quantity = savedItem.quantity;
    const withInstallation = savedItem.product.with_installation;
    const installationPrice = savedItem.product.installation_price;

    return { productSlug, quantity, withInstallation, installationPrice };
  });

  useEffect(() => {
    if (isLoadingAuthorized || cartSavedIsLoading) {
      return;
    }

    dispatch(fetchItemsFromCart({ productsOptions: cartSavedProducts }));
  }, [cartSavedItems]);

  useEffect(() => {
    if (!isFirstRender && cart.length <= 0 && cartIsLoading) {
      return;
    }

    dispatch(setAllChecked());
    setIsFirstRender(false);
  }, []);

  const isError = Boolean(cartError) || Boolean(cartSavedError);
  const isLoading = cartIsUpdated || cartIsLoading || cartSavedIsLoading;

  return (
    <>
      <Container component='div' className={styles.main}>
        <Typography className={styles.mainTitle}>Корзина</Typography>
        {!isError && <RemoveCheckedButton cart={cart} isLoading={isLoading} />}
        <TableOrder
          cart={cart}
          orderTotal={cartTotal}
          cartCheckedItemsTotal={cartCheckedItemsTotal}
          isLoading={isLoading}
          isError={isError}
        />
      </Container>
    </>
  );
};

export { CartPage };
