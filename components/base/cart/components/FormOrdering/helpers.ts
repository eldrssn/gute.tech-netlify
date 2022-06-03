import { CartItemData } from 'store/reducers/cart/types';

const getCartOrder = (cart: CartItemData[]) =>
  cart
    .filter((item) => item.count > 0)
    .map((item) => ({
      quantity: Number(item.count),
      slug: item.slug,
    }));

export { getCartOrder };
