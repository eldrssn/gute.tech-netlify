type PaymentMethodValue = {
  title: string;
  gateway: string;
  description: string;
  icons: string;
  id: number;
};

type PaymentMethodResponseData = {
  title: string;
  type: string;
  values: PaymentMethodValue[];
};

type StatusResponseData = {
  detail: string;
};

type OrderingResponseData = {
  payment_url?: string;
  id: number;
  payment_type: string;
};

type OrderingErrors = {
  name: string[];
  email: string[];
  phone: string[];
  cart: string[];
  detail: string;
};

type OrderingProductCartRequestData = {
  slug: string;
  quantity: number;
};

type OrderingRequestData = {
  name: string;
  phone: string;
  email: string;
  payment_type: string;
  payment_method_id: number;
  cart: OrderingProductCartRequestData[];
  branch_office_id: number;
};

type OrderingResponseErrorData = {
  errors: OrderingErrors;
};

type StatusRequestData = {
  orderId: string | string[] | undefined;
};

export type {
  OrderingErrors,
  PaymentMethodValue,
  StatusRequestData,
  PaymentMethodResponseData,
  StatusResponseData,
  OrderingResponseData,
  OrderingResponseErrorData,
  OrderingRequestData,
};
