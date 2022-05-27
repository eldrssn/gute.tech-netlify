import {
  CategoryResponseData,
  TreeCategoryResponseData,
} from 'api/models/catalog';
import { groupItems } from 'utility/helpers';

const getGroupedChildren = (
  category: string | string[],
  catalogTree: TreeCategoryResponseData[],
) => {
  const choosenItem = catalogTree.find(
    (item: TreeCategoryResponseData | CategoryResponseData) =>
      item.slug === category,
  );
  const groupedChildren = choosenItem ? groupItems(choosenItem.children) : null;
  return groupedChildren;
};

export { getGroupedChildren };
