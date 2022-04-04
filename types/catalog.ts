export type CatalogChild = {
  id: string;
  name: string;
  url: string;
  image?: string;
  quantity: number;
  sort: number;
  children: CatalogChild[];
};
