import { combineReducers } from '@reduxjs/toolkit';

import { testStore } from './TestStore';

const reducers = combineReducers({
  testStore,
});

export { reducers };
