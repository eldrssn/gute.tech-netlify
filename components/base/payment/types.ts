import { Control, UseFormSetValue } from 'react-hook-form';

import { BranchOfficeData, BranchesData } from 'api/models/regions';

type TFormData = {
  nameValue: string;
  phoneNumber: string;
  emailValue: string;
  paymentMethod: string;
  paymentId: number;
  branchesData: BranchesData | null;
  branch: BranchOfficeData | null;
};

type WatchFormData = {
  nameValue?: string;
  phoneNumber?: string;
  emailValue?: string;
  paymentMethod?: string;
  paymentId?: number;
};

enum FormKey {
  NAME_VALUE = 'nameValue',
  PHONE_NUMBER = 'phoneNumber',
  EMAIL_VALUE = 'emailValue',
  PAYMENT_METHODS = 'paymentMethod',
  PAYMENT_ID = 'paymentId',
  BRANCHES_DATA = 'branchesData',
  BRANCH = 'BRANCH',
}

type TPaymentMethodProps = {
  control: Control<TFormData>;
  setValue: UseFormSetValue<TFormData>;
};

type TContactInformationProps = {
  control: Control<TFormData>;
};

type TDeliveryAddressProps = {
  control: Control<TFormData>;
  setValue: UseFormSetValue<TFormData>;
};

enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD',
}

export { FormKey, PaymentType };
export type {
  WatchFormData,
  TFormData,
  TPaymentMethodProps,
  TContactInformationProps,
  TDeliveryAddressProps,
};
