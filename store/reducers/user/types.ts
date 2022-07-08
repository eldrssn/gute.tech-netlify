import {
  ProfileResponseData,
  OrdersResponseData,
  OrderResponseData,
} from 'api/models/user';
import { StoreState, StoreError, ErrorAction, State } from 'store/types';

enum UserStoreBlocks {
  PROFILE = 'profile',
  ORDERS = 'orders',
  ORDER = 'order',
}

type ProfileState = {
  data: ProfileResponseData | null;
} & StoreState;

type OrdersState = {
  data: OrdersResponseData;
} & StoreState;

type OrderState = {
  data: OrderResponseData | null;
} & StoreState;

type UserStore = {
  [UserStoreBlocks.PROFILE]: ProfileState;
  [UserStoreBlocks.ORDERS]: OrdersState;
  [UserStoreBlocks.ORDER]: OrderState;
};

export type { ErrorAction, StoreError, UserStore, State };
