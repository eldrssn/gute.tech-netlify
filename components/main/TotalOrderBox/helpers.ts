import { CartItemData } from 'store/reducers/cart/types';

const getCartOrderTotal = (
  cart: CartItemData[],
  slugsRemovedElements: string[],
) =>
  cart.reduce((total, item) => {
    const isItemChecked = slugsRemovedElements.some(
      (slug) => slug === item.slug,
    );

    if (!isItemChecked) {
      return total;
    }

    return item.count * item.price + total;
  }, 0);

export { getCartOrderTotal };
