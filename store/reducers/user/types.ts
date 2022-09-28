import {
  EditProfileResponseData,
  VerifyEmailResponseData,
  ProfileResponseData,
  OrdersResponseData,
  OrderResponseData,
  VerifyEmailResponseErrorData,
  EditProfileResponseErrorData,
  ChangePasswordResponseData,
  ChangePasswordResponseDataError,
} from 'api/models/user';
import { StoreState, StoreError, ErrorAction, State } from 'store/types';

enum UserStoreBlocks {
  PROFILE = 'profile',
  EDIT_PROFILE = 'editProfile',
  VERIFY_EMAIL = 'verifyEmail',
  ORDERS = 'orders',
  ORDER = 'order',
  CHANGE_PASSWORD = 'changePassword',
}

type ProfileState = {
  data: ProfileResponseData;
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

type ChangePasswordState = {
  data: ChangePasswordResponseData | null;
  isLoading: boolean;
  error: ChangePasswordResponseDataError | null;
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
  [UserStoreBlocks.CHANGE_PASSWORD]: ChangePasswordState;
};

export type { ErrorAction, StoreError, UserStore, State };
