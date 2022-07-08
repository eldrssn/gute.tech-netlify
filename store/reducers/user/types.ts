import {
  EditProfileResponseData,
  VerifyEmailResponseData,
  ProfileResponseData,
  OrdersResponseData,
  OrderResponseData,
  VerifyEmailResponseErrorData,
  EditProfileResponseErrorData,
} from 'api/models/user';
import { StoreState, StoreError, ErrorAction, State } from 'store/types';

enum UserStoreBlocks {
  PROFILE = 'profile',
  EDIT_PROFILE = 'editProfile',
  VERIFY_EMAIL = 'verifyEmail',
  ORDERS = 'orders',
  ORDER = 'order',
}

type ProfileState = {
  data: ProfileResponseData | null;
} & StoreState;

type EditProfileState = {
  data: EditProfileResponseData | null;
  isLoading: boolean;
  error: EditProfileResponseErrorData | null;
};

type VerifyEmailState = {
  data: VerifyEmailResponseData | null;
  isLoading: boolean;
  error: VerifyEmailResponseErrorData | null;
};

type OrdersState = {
  data: OrdersResponseData;
} & StoreState;

type OrderState = {
  data: OrderResponseData | null;
} & StoreState;

type UserStore = {
  [UserStoreBlocks.PROFILE]: ProfileState;
  [UserStoreBlocks.EDIT_PROFILE]: EditProfileState;
  [UserStoreBlocks.VERIFY_EMAIL]: VerifyEmailState;
  [UserStoreBlocks.ORDERS]: OrdersState;
  [UserStoreBlocks.ORDER]: OrderState;
};

export type { ErrorAction, StoreError, UserStore, State };
