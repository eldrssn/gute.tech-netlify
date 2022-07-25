import { CartItemData, orderTotal } from 'store/reducers/cart/types';

type TStateProps = {
  order: CartItemData[];
  orderTotal: orderTotal;
};

type TTableBodyProps = Pick<TStateProps, 'order'>;

export type { TStateProps, CartItemData, TTableBodyProps };
