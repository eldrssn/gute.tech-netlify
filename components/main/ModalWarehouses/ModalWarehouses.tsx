import React, { KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { CloseIcon } from 'components/ui/CloseIcon';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { handleEnterPress } from 'utility/utils';

import { WarehouseItem } from './components/WarehouseItem';
import { ModalWarehousesProps } from './types';

import styles from './modalWarehouses.module.scss';

const ModalWarehouses: React.FC<ModalWarehousesProps> = ({
  isOpen,
  setIsOpen,
  warehouses,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePress = (event: KeyboardEvent) =>
    handleEnterPress(event, closeModal);

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
        <Divider className={styles.divider} />

        <Box className={styles.warehousesBox}>
          {warehouses?.map((warehouse, index) => (
            <WarehouseItem key={index} warehouse={warehouse} />
          ))}
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export { ModalWarehouses };
