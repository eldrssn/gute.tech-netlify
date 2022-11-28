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

const addMockInstallation = (warehouses?: ProductWarehouse[]) =>
  warehouses?.map((warehouse, index) => {
    const isEven = index % 2 === 0;
    return { ...warehouse, installation: isEven ? true : false };
  });

export { getWholeQuantity, addMockInstallation };
