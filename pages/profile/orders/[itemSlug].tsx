import React from 'react';

import { WithAuthorize } from 'hoc/WithAuthorize';
import { ProfileOrderPage } from 'components/base/profileOrder';

const Item = () =>
  WithAuthorize({
    ComponentForAuthorized: <ProfileOrderPage />,
  });

export default Item;
