import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

import { selectOrderTotal } from 'store/reducers/order/selectors';

import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import styles from './styles.module.scss';

const TotalOrderBox: React.FC<{
  redirectUrl: TotalBoxRedirectUrls;
}> = ({ redirectUrl }) => {
  const router = useRouter();

  const orderTotal = useSelector(selectOrderTotal);

  const onClickButton = () => {
    router.push(redirectUrl);
  };

  return (
    <Box className={styles.totalBoxContainer}>
      <Box className={styles.totalBox}>
        <Typography className={styles.orderTotal}>
          К оплате: {orderTotal}&#8381;
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
