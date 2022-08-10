import { productData } from 'api/models/user';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { getParentCategory, getLinkToProduct } from 'utility/helpers';

const getLink = (
  product: productData,
  categoriesTreeListData: TreeCategoryResponseData[],
) => {
  const slug = product.slug;
  const categorySlug = product.categories[0];
  const parentCategorySlug = getParentCategory({
    categoriesTreeListData,
    childrenCategorySlug: categorySlug,
  });

  return getLinkToProduct(parentCategorySlug, categorySlug, slug);
};

export { getLink };
