import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Box } from '@mui/material';

import { AsideNavigation } from 'components/ui/AsideNavigation';
import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';

import { OrderMain } from './components/OrderMain';
import styles from './styles.module.scss';

const OrderPage: FC = () => {
  const router = useRouter();

  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  useEffect(() => {
    if (isAuthorized || loadingAuthorized) {
      return;
    }

    router.push('/');
  }, [isAuthorized, router, loadingAuthorized]);

  return (
    <Container disableGutters className={styles.mainContainer}>
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
