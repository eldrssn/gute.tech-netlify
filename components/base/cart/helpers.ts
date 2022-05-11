import { CartItemData } from 'store/reducers/cart/types';

const getStockBalance = (item: CartItemData) =>
  item.warehouses.reduce((accumulator, warehouse) => {
    return accumulator + Number(warehouse.quantity);
  }, 0);

export { getStockBalance };
