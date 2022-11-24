import { ProductWarehouse } from 'api/models/cart';

const getWholeQuantity = (warehouses: ProductWarehouse[] | undefined) => {
  const quantity =
    warehouses &&
    warehouses.reduce(
      (accumulator, warehouse) => accumulator + Number(warehouse.quantity),
      0,
    );

  return Number(quantity);
};

export { getWholeQuantity };
