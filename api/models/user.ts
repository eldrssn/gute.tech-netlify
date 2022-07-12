type ProfileResponseData = {
  last_name: string;
  first_name: string;
  patronymic: string;
  phone_number: string;
  date_of_birthday: string | null;
  email: string;
  date_joined: string;
  transport: string;
};

type ProfileRequestData = {
  status: string;
  debug_code: string;
};

type EditProfileRequestData = {
  last_name?: string;
  first_name?: string;
  patronymic?: string;
  phone_number?: string;
  date_of_birthday?: string | null;
  email?: string;
  date_joined?: string;
  transport?: string;
};

type EditProfileResponseData = Record<string, string | string[]>;
type EditProfileResponseErrorData = { errors: EditProfileResponseData };
type VerifyEmailErrors = { code: string[] };

type VerifyEmailRequestData = {
  code: string;
  email: string;
};

type VerifyEmailResponseData = {
  details: string;
  status: string;
};

type VerifyEmailResponseErrorData = {
  errors: VerifyEmailErrors;
};

type OrdersRequestData = {
  order: string;
  created_after?: string;
  created_before?: string;
  page: number;
  size?: number;
};

type Order = {
  id: string;
  created_at: string;
  total_price: string;
};

type OrdersResponseData = {
  current: number;
  pages: number;
  total: number;
  results: Order[];
};

type OrderRequestData = {
  orderId: string;
};

type Product = {
  id: number;
  title: string;
  vendor_code: string;
  price: number;
  quantity: number;
  is_service: boolean;
};

enum Payment {
  CARD = 'CARD',
  CASH = 'CASH',
}

type OrderResponseData = {
  id: number;
  showcase: string;
  payment_type: Payment;
  branch_office: string;
  is_paid: boolean;
  payment_date: string;
  gateway_order_id: string;
  created_at: string;
  products: Product[];
};

export { Payment };

export type {
  Order,
  OrderRequestData,
  OrdersResponseData,
  OrdersRequestData,
  OrderResponseData,
  Product,
  ProfileResponseData,
  ProfileRequestData,
  EditProfileRequestData,
  EditProfileResponseData,
  EditProfileResponseErrorData,
  VerifyEmailRequestData,
  VerifyEmailResponseData,
  VerifyEmailResponseErrorData,
};
