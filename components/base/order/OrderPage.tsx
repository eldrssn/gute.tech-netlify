import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

import { Loader } from 'components/ui/Loader';
import { TotalOrderBox } from 'components/main/TotalOrderBox';
import {
  selectOrder,
  selectOrderLoading,
} from 'store/reducers/order/selectors';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import { useWindowSize } from 'hooks/useWindowSize';

import { TableOrder } from './components/TableOrder';
import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const order = useSelector(selectOrder);
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
    <Box component='div' className={styles.main}>
      <TotalOrderBox redirectUrl={TotalBoxRedirectUrls.PAYMENT} />
      <Typography className={styles.mainTitle}>Заказ</Typography>
      {isLoadingOrder ? <Loader /> : <TableOrder order={order} />}
    </Box>
  );
};

export { OrderPage };
