export type CatalogChild = {
  id: string;
  title: string;
  url?: string;
  children: CatalogChild[];
};
