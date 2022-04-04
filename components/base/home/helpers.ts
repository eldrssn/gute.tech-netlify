import { CatalogChild } from 'types/catalog';
import { groupItems } from 'utility/helpers';

export const getGroupedChildren = (
  category?: string | string[],
  catalogData?: CatalogChild[],
) => {
  if (!category) {
    return;
  }

  const choosenItem = catalogData?.find((item) => item.url === category);
  const groupedChildren = choosenItem
    ? groupItems(choosenItem?.children)
    : null;
  return groupedChildren;
};
