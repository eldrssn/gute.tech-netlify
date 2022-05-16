import { Control, UseFormSetValue } from 'react-hook-form';

import { CartItemData, orderTotal } from 'store/reducers/cart/types';
import { BranchOfficeData, BranchesData } from 'api/models/regions';

type TStateProps = {
  cart: CartItemData[];
  orderTotal: orderTotal;
};

type TTableBodyProps = {
  removeItem: (item: CartItemData) => void;
  addCount: (item: CartItemData) => void;
  removeCount: (item: CartItemData) => void;
  slugsRemovedElements: string[];
  setSlugsRemovedElements: (idsArray: string[]) => void;
} & Pick<TStateProps, 'cart'>;

type TFormData = {
  nameValue: string;
  phoneNumber: string;
  emailValue: string;
  paymentMethod: string;
  paymentGateway: string;
  branchesData: BranchesData | null;
  branch: BranchOfficeData | null;
};

type TDeleteItemButtonProps = {
  removeItem: (item: CartItemData) => void;
  item: CartItemData;
};

type TPaymentMethodProps = {
  control: Control<TFormData>;
};

type TContactInformationProps = {
  control: Control<TFormData>;
};

type TTableOrderProps = {
  slugsRemovedElements: string[];
  setSlugsRemovedElements: (idsArray: string[]) => void;
  cart: CartItemData[];
  orderTotal: orderTotal;
};

type TDeliveryAddressProps = {
  control: Control<TFormData>;
  setValue: UseFormSetValue<TFormData>;
};

type TCounterProps = {
  item: CartItemData;
  addCount: (item: CartItemData) => void;
  removeCount: (item: CartItemData) => void;
  stockBalance: number;
};

type TRemoveCheckedButtonProps = {
  cart: CartItemData[];
  slugsRemovedElements: string[];
  setSlugsRemovedElements: (idsArray: string[]) => void;
};

type TFormCountData = {
  count: number;
};

export type {
  TFormData,
  TStateProps,
  CartItemData,
  TCounterProps,
  TFormCountData,
  TTableBodyProps,
  TTableOrderProps,
  TPaymentMethodProps,
  TDeliveryAddressProps,
  TDeleteItemButtonProps,
  TContactInformationProps,
  TRemoveCheckedButtonProps,
};
