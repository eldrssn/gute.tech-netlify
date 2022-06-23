import React from 'react';
import { Container } from '@mui/material';
import { AsideNavigation } from 'components/ui/AsideNavigation';

const OrdersPage = () => {
  return (
    <Container>
      <h1>История заказов</h1>
      <AsideNavigation />
    </Container>
  );
};

export { OrdersPage };
