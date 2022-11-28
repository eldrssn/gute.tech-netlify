import { ProductWarehouse } from 'api/models/cart';

const getWithInstallation = (warehouses?: ProductWarehouse[]) =>
  warehouses?.filter((warehouse) => warehouse.installation);

const getWithoutIntsallation = (warehouses?: ProductWarehouse[]) =>
  warehouses?.filter((warehouse) => !warehouse.installation);

export { getWithInstallation, getWithoutIntsallation };
