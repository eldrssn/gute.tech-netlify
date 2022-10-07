import { NextPage } from 'next';
import Container from '@mui/material/Container';

import { PaymentPage } from 'components/base/payment';

const Order: NextPage = () => (
  <Container disableGutters>
    <PaymentPage />
  </Container>
);

export default Order;
