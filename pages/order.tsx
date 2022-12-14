import { NextPage } from 'next';
import Container from '@mui/material/Container';

import { OrderPage } from 'components/base/order';

const Order: NextPage = () => (
  <Container disableGutters>
    <OrderPage />
  </Container>
);

export default Order;
