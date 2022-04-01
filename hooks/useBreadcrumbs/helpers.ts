import { CatalogChild } from 'types/catalog';

// !TODO: [item.url as string] <- прописать везде в моках url
export const getCrumbs = (catalogData?: CatalogChild[]) => {
  if (!catalogData) {
    return {};
  }

  return catalogData.reduce(
    (crumbs, item) => ({ ...crumbs, [item.url as string]: item.title }),
    {},
  );
};
