export type ProductListData = {
  title: string;
  slug: string;
  image?: string;
  price?: string;
};

export type CategoriesSearchReadRequestData = {
  brandSlug: string;
  modelSlug: string;
  yearSlug: string;
  engineSlug: string;
};

export type CategoriesFiltersListRequestData = {
  categorySlug: string;
};

export type CategoriesProductsListRequestData = {
  categorySlug: string;
};

export type CategoriesProductsReadRequestData = {
  categorySlug: string;
  productSlug: string;
};

export type CategoriesSubcategoriesListRequestData = {
  categorySlug: string;
};

export type CategoryResponseData = {
  title: string;
  slug: string;
  image: string;
};

export type TreeCategoryResponseData = {
  title: string;
  slug: string;
  image?: string;
  children?: TreeCategoryResponseData[];
};

export type FiltersCategoryResponseData = {
  title: string;
  slug: string;
  type?: string;
  values?: string;
};

export type CategoriesProductsListResponseData = {
  count: number;
  next: string;
  previous: string;
  results: ProductListData[];
};

export type CategoriesProductsReadResponseData = {
  title: string;
  manufacturer?: string;
  vendor_code: string;
  description?: string;
  price?: string;
  images?: string;
  properties?: string;
  warehouses?: string;
};
