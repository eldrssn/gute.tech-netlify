import { CartItemData } from 'store/reducers/cart/types';

type TStateProps = {
  cart: CartItemData[];
};

type TTableBodyProps = { isLoading: boolean } & Pick<TStateProps, 'cart'>;

type TDeleteItemButtonProps = {
  item: CartItemData;
  isLoading: boolean;
};

type TTableOrderProps = {
  cart: CartItemData[];
  orderTotal: number;
  isLoading: boolean;
  isError: boolean;
  cartCheckedItemsTotal: number;
};

type TCounterProps = {
  item: CartItemData;
  stockBalance: number;
  isLoading: boolean;
};

type TRemoveCheckedButtonProps = {
  cart: CartItemData[];
  isLoading: boolean;
};

type TFormCountData = {
  count: number | null;
};

export type {
  TStateProps,
  CartItemData,
  TCounterProps,
  TFormCountData,
  TTableBodyProps,
  TTableOrderProps,
  TDeleteItemButtonProps,
  TRemoveCheckedButtonProps,
};
