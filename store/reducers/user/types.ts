import { ProfileResponseData } from 'api/models/user';
import { StoreState, StoreError, ErrorAction, State } from 'store/types';

enum UserStoreBlocks {
  PROFILE = 'profile',
  // ORDERS = 'odrers',
}

type ProfileState = {
  data: ProfileResponseData | null;
} & StoreState;

type UserStore = {
  [UserStoreBlocks.PROFILE]: ProfileState;
  // [UserStoreBlocks.ORDERS]: YearsState;
};

export type { ErrorAction, StoreError, UserStore, State };
