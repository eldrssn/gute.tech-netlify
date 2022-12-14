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
  installation?: boolean;
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
  with_installation: boolean;
  installation_price: number;
};

type ProductRequestData = {
  productSlug: string;
  quantity?: number;
};

type productOptions = {
  productSlug: string;
  quantity: number;
  withInstallation: boolean;
  installationPrice: number;
};

type ProductsRequestData = {
  productsOptions: productOptions[];
};

type Product = {
  id: number;
  slug: string;
  price: string;
  warehouse_stock: string;
  with_installation: boolean;
  installation_price: number;
};

type CartItemRequestData = {
  transport: string;
  city: string;
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

type CartAddItemRequestData = {
  product: string;
  quantity: number;
  with_installation: boolean;
  transport: string;
  city: string;
};

type CartUpdateItem = {
  quantity: number;
  product: string;
  with_installation: boolean;
};

type CartUpdateItemRequestData = {
  items: CartUpdateItem[];
  transport: string;
  city: string;
};

export type {
  CartItemRequestData,
  CartItemResponseData,
  ProductResponseData,
  ProductRequestData,
  ProductWarehouse,
  ProductsRequestData,
  productOptions,
  CartResponseData,
  CartAddItemRequestData,
  CartUpdateItemRequestData,
};
