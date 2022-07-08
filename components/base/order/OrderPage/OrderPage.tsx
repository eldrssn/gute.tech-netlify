import React, { FC } from 'react';
import { Container, Box } from '@mui/material';

import { AsideNavigation } from 'components/ui/AsideNavigation';
import { OrderMain } from 'components/base/order/OrderMain';

import styles from './styles.module.scss';

const OrderPage: FC = () => {
  return (
    <Container className={styles.mainContainer}>
      <Box>
        <h1>Информация о заказе</h1>
      </Box>
      <Box className={styles.mainBox}>
        <AsideNavigation />
        <OrderMain />
      </Box>
    </Container>
  );
};

export { OrderPage };
