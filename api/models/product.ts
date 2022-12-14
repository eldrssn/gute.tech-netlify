import { Slug } from 'types';

type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
  categories: string[][];
  manufacturer?: string;
};

type AnalogueItem = {
  title: string;
  slug: string;
  categories: string[];
  manufacturer: string;
  price: string;
  is_original: boolean;
};

type ReviewItem = {
  grade: number;
  comment: string;
  created_at: string;
  first_name: string;
  last_name: string;
};

type ProductWarehouse = {
  title: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  quantity: string;
};

interface Property {
  title: string;
  value: string;
}

type ProductsReadRequestData = {
  productSlug: string;
};

type ProductReadResponseData = {
  title: string;
  slug: string;
  manufacturer?: string;
  vendor_code: string;
  description?: string;
  price?: string;
  images?: string[];
  properties?: Property[];
  is_service: boolean;
  warehouses?: ProductWarehouse[];
  faq: Record<string, string>[];
  installation: string;
  average_rating: number;
};

type ProductAnaloguesResponseData = {
  current: string;
  total: string;
  pages: string;
  results: AnalogueItem[];
};

type ProductReviewsListResponseData = {
  current: string;
  total: string;
  pages: string;
  results: ReviewItem[];
};

type RecommendedResponceData = ProductListData[];

type TransportSearchRequestData = {
  transportId: string;
};

type RecommendedProductsListRequestData = TransportSearchRequestData & {
  productSlug: Slug;
  categorySlug: Slug;
};

type InfoBlock = {
  title: string;
  slug: string;
};

type ProductTransportListResponseData = {
  id: number;
  title: string;
  count: number;
  slug: string;
  years_string?: string;
  brand: InfoBlock;
  engine: InfoBlock;
  model: InfoBlock;
  years: number[];
};

type ProductBrandsListRequestData = {
  productSlug: string;
};

type ProductModelsListRequestData = {
  productSlug: string;
  brandSlug: string;
};

type ProductYearsListRequestData = {
  productSlug: string;
  brandSlug: string;
  modelSlug: string;
};

type ProductTransportListRequestData = {
  productSlug: string;
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
};

type ProductReviewsListRequestData = {
  productSlug: string;
  page?: number;
};

type ProductReviewRequestData = {
  productSlug: string;
  grade: number;
  comment: string | null;
};

type InstallationPriceRequestData = {
  productSlug: string;
  сategorySlug: string;
  transportId: string;
  citySlug: string;
};

type InstallationPriceResponseData = {
  price: string;
};

export type {
  ProductAnaloguesResponseData,
  ProductReadResponseData,
  ProductsReadRequestData,
  RecommendedResponceData,
  RecommendedProductsListRequestData,
  ProductTransportListResponseData,
  ProductBrandsListRequestData,
  ProductModelsListRequestData,
  ProductYearsListRequestData,
  ProductTransportListRequestData,
  ProductReviewsListResponseData,
  ProductReviewsListRequestData,
  ProductReviewRequestData,
  InstallationPriceRequestData,
  InstallationPriceResponseData,
};
