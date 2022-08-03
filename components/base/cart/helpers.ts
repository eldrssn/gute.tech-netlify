import { CartItemData } from 'store/reducers/cart/types';

const getSelectedCartItems = (
  cart: CartItemData[],
  slugsRemovedElements: string[],
) =>
  cart.filter((item) =>
    slugsRemovedElements.some((slug) => slug === item.slug),
  );

export { getSelectedCartItems };
