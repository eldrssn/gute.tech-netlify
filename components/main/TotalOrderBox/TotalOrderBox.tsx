import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

import { selectOrderTotal } from 'store/reducers/order/selectors';
import { selectCart } from 'store/reducers/cart/selectors';

import { getCartOrderTotal } from './helpers';
import styles from './styles.module.scss';
import { Props } from './types';

const TotalOrderBox: React.FC<Props> = ({
  redirectUrl,
  onClick,
  isCartPage,
  slugsRemovedElements = [],
}) => {
  const router = useRouter();

  const orderTotal = useSelector(selectOrderTotal);
  const cart = useSelector(selectCart);

  const cartOrderTotal = getCartOrderTotal(cart, slugsRemovedElements);

  const onClickButton = () => {
    if (onClick) {
      onClick();
    }
    router.push(redirectUrl);
  };

  return (
    <Box className={styles.totalBoxContainer}>
      <Box className={styles.totalBox}>
        <Typography className={styles.orderTotal}>
          К оплате: {isCartPage ? cartOrderTotal : orderTotal}&#8381;
        </Typography>
        <Button
          className={styles.button}
          onClick={onClickButton}
          variant={'contained'}
        >
          Оформить заказ
        </Button>
      </Box>
    </Box>
  );
};

export { TotalOrderBox };
