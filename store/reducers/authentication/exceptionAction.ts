import { createAction } from '@reduxjs/toolkit';

import { deleteCookie } from 'utility/helpers';
import { CookieKey } from 'constants/types';

export const logOut = createAction('authentication/LogOut', function prepare() {
  deleteCookie(CookieKey.ACCESS_TOKEN);
  deleteCookie(CookieKey.REFRESH_TOKEN);
  return {
    payload: {},
  };
});
