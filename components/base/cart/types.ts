import { Control, UseFormSetValue } from 'react-hook-form';

import { CartItemData } from 'store/reducers/cart/types';
import { BranchOfficeData, BranchesData } from 'api/models/regions';

type TStateProps = {
  cart: CartItemData[];
};

type TTableBodyProps = { isLoading: boolean } & Pick<TStateProps, 'cart'>;

type TFormData = {
  nameValue: string;
  phoneNumber: string;
  emailValue: string;
  paymentMethod: string;
  paymentGateway: string;
  branchesData: BranchesData | null;
  branch: BranchOfficeData | null;
};

enum FormKey {
  NAME_VALUE = 'nameValue',
  PHONE_NUMBER = 'phoneNumber',
  EMAIL_VALUE = 'emailValue',
  PAYMENT_METHODS = 'paymentMethod',
  PAYMENT_GATEWAY = 'paymentGateway',
  BRANCHES_DATA = 'branchesData',
  BRANCH = 'BRANCH',
}

type TDeleteItemButtonProps = {
  item: CartItemData;
  isLoading: boolean;
};

type TPaymentMethodProps = {
  control: Control<TFormData>;
};

type TContactInformationProps = {
  control: Control<TFormData>;
};

type TTableOrderProps = {
  cart: CartItemData[];
  orderTotal: number;
  isLoading: boolean;
  isError: boolean;
  cartCheckedItemsTotal: number;
};

type TDeliveryAddressProps = {
  control: Control<TFormData>;
  setValue: UseFormSetValue<TFormData>;
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

export { FormKey };
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
