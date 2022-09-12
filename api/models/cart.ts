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
  count?: number;
  ordinalId?: number;
};

type productOptions = {
  productSlug: string;
  count: number;
  ordinalId: number;
  isChecked: boolean;
};

type ProductsRequestData = {
  productsOptions: productOptions[];
};

export type {
  ProductResponseData,
  ProductRequestData,
  ProductWarehouse,
  ProductsRequestData,
  productOptions,
};
