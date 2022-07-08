export type ProfileResponseData = {
  last_name: string;
  first_name: string;
  patronymic: string;
  phone_number: string;
  date_of_birthday: string;
  email: string;
  date_joined: string;
  transport: string[];
};

export type OrdersRequestData = {
  order: string;
  created_after?: string;
  created_before?: string;
  page: number;
  size?: number;
};

export type Order = {
  id: string;
  created_at: string;
  total_price: string;
};

export type OrdersResponseData = {
  current: number;
  pages: number;
  total: number;
  results: Order[];
};

export type OrderRequestData = {
  orderId: string;
};

export type Product = {
  id: number;
  title: string;
  vendor_code: string;
  price: number;
  quantity: number;
  is_service: boolean;
};

export enum Payment {
  CARD = 'CARD',
  CASH = 'CASH',
}

export type OrderResponseData = {
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
