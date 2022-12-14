import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

import { Loader } from 'components/ui/Loader';
import {
  selectOrder,
  selectOrderLoading,
  selectOrderTotal,
} from 'store/reducers/order/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import { TableOrder } from './components/TableOrder';
import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const order = useSelector(selectOrder);
  const orderTotal = useSelector(selectOrderTotal);
  const isLoadingOrder = useSelector(selectOrderLoading);

  const isOrderList = order.length > 0;

  useEffect(() => {
    if (!isOrderList && !isLoadingOrder) {
      router.push('/cart');
    }
  }, [isOrderList, router, isLoadingOrder]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.paddingBottom = '50px';
      return;
    }
    document.body.style.paddingBottom = '0px';

    return () => {
      document.body.style.paddingBottom = '0px';
    };
  }, [isMobile]);

  return (
    <>
      <Box component='div' className={styles.main}>
        <Typography className={styles.mainTitle}>Заказ</Typography>
        {isLoadingOrder ? (
          <Loader />
        ) : (
          <TableOrder order={order} orderTotal={orderTotal} />
        )}
      </Box>
    </>
  );
};

export { OrderPage };
