import { TreeCategoryResponseData } from 'api/models/catalog';
import { groupItems } from 'utility/helpers';

export const getGroupedChildren = (
  category?: string | string[],
  catalogTree?: TreeCategoryResponseData[],
) => {
  if (!category) {
    return;
  }

  const choosenItem = catalogTree?.find((item) => item.slug === category);
  const groupedChildren = choosenItem
    ? groupItems(choosenItem?.children)
    : null;
  return groupedChildren;
};
