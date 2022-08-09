import { CartItemData, orderTotal } from 'store/reducers/cart/types';

type StateProps = {
  order: CartItemData[];
  orderTotal: orderTotal;
};

type TableBodyProps = Pick<StateProps, 'order'>;

type FormCountData = {
  count: number | null;
};

type CounterProps = {
  item: CartItemData;
  stockBalance: number;
};

type TableOrderProps = {
  order: CartItemData[];
  orderTotal: orderTotal;
};

export type {
  StateProps,
  CartItemData,
  TableBodyProps,
  FormCountData,
  CounterProps,
  TableOrderProps,
};
