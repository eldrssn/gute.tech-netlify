import { createAction } from '@reduxjs/toolkit';

const setAuthorizationWarning = createAction<boolean>(
  'setTrueAuthorizationWarning',
);

export { setAuthorizationWarning };
