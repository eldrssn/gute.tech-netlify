import { CartItemData } from 'store/reducers/cart/types';

type StateProps = {
  order: CartItemData[];
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
  orderTotal: number;
};

export type {
  StateProps,
  CartItemData,
  TableBodyProps,
  FormCountData,
  CounterProps,
  TableOrderProps,
};
