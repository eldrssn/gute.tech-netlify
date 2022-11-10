import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { CloseIcon } from 'components/ui/CloseIcon';
import { CustomButton } from 'components/ui/CustomButton';
import { TOuterProps } from './types';

import styles from './modalCancelChanges.module.scss';

const ModalCancelChanges: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  resetForm,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const resetFormHandler = () => {
    resetForm();
    closeModal();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle='cancel-changes'
    >
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal} tabIndex={0}>
          <CloseIcon fillColor='black' />
        </Box>
        <Typography className={styles.title}>Отменить изменения?</Typography>

        <Box className={styles.buttonsContainer}>
          <CustomButton customStyles={styles.button} onClick={resetFormHandler}>
            Да
          </CustomButton>
          <CustomButton customStyles={styles.button} onClick={closeModal}>
            Нет
          </CustomButton>
        </Box>
      </Container>
    </ModalWrapper>
  );
};

export { ModalCancelChanges };
