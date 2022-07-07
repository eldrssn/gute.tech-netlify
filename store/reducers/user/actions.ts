import { getProfile, getOrders, getOrder } from 'api/routes/user';
import {
  ProfileResponseData,
  OrdersRequestData,
  OrdersResponseData,
  OrderRequestData,
  OrderResponseData,
} from 'api/models/user';
import { createAsyncAction } from 'utility/helpers/store';

const fetchProfile = createAsyncAction<ProfileResponseData>({
  typeAction: 'user/fetchProfile',
  request: getProfile,
  shouldHandleError: true,
});

const fetchOrders = createAsyncAction<OrdersResponseData, OrdersRequestData>({
  typeAction: 'user/fetchOrders',
  request: getOrders,
});

const fetchOrder = createAsyncAction<OrderResponseData, OrderRequestData>({
  typeAction: 'user/fetchOrder',
  request: getOrder,
});

export { fetchProfile, fetchOrders, fetchOrder };
