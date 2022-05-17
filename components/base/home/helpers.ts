import { TreeCategoryResponseData } from 'api/models/catalog';
import { groupItems } from 'utility/helpers';
import { ParsedUrlQuery } from 'querystring';

const getGroupedChildren = (
  category?: string | string[],
  catalogTree?: TreeCategoryResponseData[],
) => {
  if (!category) {
    return;
  }

  const choosenItem = catalogTree?.find((item) => item.slug === category);
  const groupedChildren = choosenItem ? groupItems(choosenItem.children) : null;
  return groupedChildren;
};

const getlastQueryUrl = (query: ParsedUrlQuery) =>
  Object.keys(query)[Object.keys(query).length - 1];

export { getGroupedChildren, getlastQueryUrl };
