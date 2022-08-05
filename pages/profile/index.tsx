import React from 'react';

import { WithAuthorize } from 'hoc/WithAuthorize';
import { ProfilePage } from 'components/base/profile/ProfilePage';

const Profile = () =>
  WithAuthorize({
    ComponentForAuthorized: <ProfilePage />,
  });

export default Profile;
