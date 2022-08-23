import { CartItemData } from 'store/reducers/cart/types';

const getCheckedCartItems = (cart: CartItemData[]) =>
  cart.filter((item) => item.isChecked === true);

const getCheckedCartItemsSlug = (checkedCartItems: CartItemData[]) =>
  checkedCartItems.map((item) => item.slug);

export { getCheckedCartItems, getCheckedCartItemsSlug };
