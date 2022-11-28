import React, { KeyboardEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { CloseIcon } from 'components/ui/CloseIcon';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { handleEnterPress } from 'utility/utils';
import { ProductWarehouse } from 'api/models/cart';

import { FilterInstallation } from './components/FilterInstallation';
import { WarehouseItem } from './components/WarehouseItem';
import { ModalWarehousesProps } from './types';

import { getWithInstallation, getWithoutIntsallation } from './helpers';
import styles from './modalWarehouses.module.scss';

const ModalWarehouses: React.FC<ModalWarehousesProps> = ({
  isOpen,
  setIsOpen,
  warehouses,
}) => {
  const [withInstall, setWithInstall] = useState(true);
  const [withoutInstall, setWithoutIntall] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePress = (event: KeyboardEvent) =>
    handleEnterPress(event, closeModal);

  const filterWarehouses = (warehouses?: ProductWarehouse[]) => {
    if ((withInstall && withoutInstall) || (!withInstall && !withoutInstall)) {
      return warehouses;
    }

    if (withInstall) {
      return getWithInstallation(warehouses);
    }

    if (withoutInstall) {
      return getWithoutIntsallation(warehouses);
    }
  };

  const filtredWarehouses = filterWarehouses(warehouses);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={closeModal}
      modalTitle='warehouses'
    >
      <Box component='div' className={styles.container}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          onKeyPress={handlePress}
          tabIndex={0}
        >
          <CloseIcon />
        </Box>
        <Typography
          className={styles.title}
          id='modal-modal-title'
          variant='h6'
          component='h2'
          mb={1}
        >
          Наличие товара
        </Typography>

        <FilterInstallation
          setWithInstall={setWithInstall}
          setWithoutIntall={setWithoutIntall}
        />

        <Divider className={styles.divider} />

        <Box className={styles.warehousesBox}>
          {filtredWarehouses?.map((warehouse, index) => (
            <WarehouseItem key={index} warehouse={warehouse} />
          ))}
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export { ModalWarehouses };
