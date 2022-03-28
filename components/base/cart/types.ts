import { CartItemData, orderTotal } from 'store/reducers/cart/types';

type TStateProps = {
  cart: CartItemData[];
  orderTotal: orderTotal;
};

type TTableBodyProps = {
  removeItem: (item: CartItemData) => void;
  addCount: (item: CartItemData) => void;
  removeCount: (item: CartItemData) => void;
} & Pick<TStateProps, 'cart'>;

type TFormData = {
  nameValue: string;
  phoneNumber: string;
  emailValue: string;
};

export type { TStateProps, CartItemData, TFormData, TTableBodyProps };
