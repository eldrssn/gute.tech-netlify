import { ProductWarehouse } from 'api/models/cart';

type ModalWarehousesProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  warehouses?: ProductWarehouse[];
};

export type { ModalWarehousesProps };
