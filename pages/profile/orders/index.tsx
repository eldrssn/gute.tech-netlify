import React from 'react';

import { WithAuthorize } from 'hoc/WithAuthorize';
import { ProfileOrdersPage } from 'components/base/profileOrders';

const Orders = () =>
  WithAuthorize({
    ComponentForAuthorized: <ProfileOrdersPage />,
  });

export default Orders;
