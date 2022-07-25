import { Control, UseFormSetValue } from 'react-hook-form';

import { BranchOfficeData, BranchesData } from 'api/models/regions';

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

type TPaymentMethodProps = {
  control: Control<TFormData>;
};

type TContactInformationProps = {
  control: Control<TFormData>;
};

type TDeliveryAddressProps = {
  control: Control<TFormData>;
  setValue: UseFormSetValue<TFormData>;
};

export { FormKey };
export type {
  TFormData,
  TPaymentMethodProps,
  TContactInformationProps,
  TDeliveryAddressProps,
};
