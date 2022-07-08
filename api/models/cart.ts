type PaymentMethodValue = {
  title: string;
  gateway: string;
};

type PaymentMethodResponseData = {
  title: string;
  payment_type: string;
  values: PaymentMethodValue[];
};

type ProductFAQ = {
  question: string;
  answer: string;
};

type ProductWarehouse = {
  title: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  quantity: string;
};

type ProductProperties = {
  title: string;
  value: string;
};

type ProductResponseData = {
  title: string;
  slug: string;
  manufacturer: string;
  vendor_code: string;
  popular: boolean;
  description: string;
  installation: string;
  faq: ProductFAQ[];
  price: number;
  images: string[];
  is_service: boolean;
  warehouses: ProductWarehouse[];
  properties: ProductProperties[];
};

type ProductRequestData = {
  productSlug: string;
  count?: number;
  ordinalId?: number;
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
  gateway: string;
  cart: OrderingProductCartRequestData[];
  branch_office_id: number;
};

type OrderingResponseData = {
  payment_url?: string;
  id: number;
  payment_type: string;
};

type OrderingResponseErrorData = {
  name: string[];
  email: string[];
  phone: string[];
  cart: string[];
  detail: string;
};

type StatusRequestData = {
  orderId: string | string[] | undefined;
};

type StatusResponseData = {
  detail: string;
};

export type {
  OrderingRequestData,
  PaymentMethodResponseData,
  OrderingResponseErrorData,
  ProductResponseData,
  StatusResponseData,
  ProductRequestData,
  OrderingResponseData,
  ProductWarehouse,
  StatusRequestData,
};
