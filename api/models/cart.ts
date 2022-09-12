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
  categories: string[][];
};

type ProductRequestData = {
  productSlug: string;
  quantity?: number;
};

type productOptions = {
  productSlug: string;
  quantity: number;
};

type ProductsRequestData = {
  productsOptions: productOptions[];
};

//TODO: метод получения корзины

type Product = {
  id: number;
  slug: string;
  price: string;
  warehouse_stock: string;
};

type CartItemResponseData = {
  id: number;
  product: Product;
  quantity: number;
};

type CartResponseData = {
  total_price: number;
  total: number;
  results: CartItemResponseData[];
};

//TODO: метод добавления товара

type CartAddItemRequestData = {
  product: string;
  quantity: number;
};

type CartAddItemResponseData = {
  total_price: number;
  total: number;
};

//TODO: метод изменения количества товара

type CartUpdateItemRequestData = {
  quantity: number;
  product: string;
};

type CartUpdateItemResponeData = {
  total_price: number;
  total: number;
};

//TODO: изменить под реализованную модель

export type {
  CartItemResponseData,
  ProductResponseData,
  ProductRequestData,
  ProductWarehouse,
  ProductsRequestData,
  productOptions,
  CartResponseData,
  CartAddItemRequestData,
  CartAddItemResponseData,
  CartUpdateItemRequestData,
  CartUpdateItemResponeData,
};
