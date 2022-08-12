import React from 'react';
import { Container, Typography, Box } from '@mui/material';

import { ModalWrapper } from 'components/main/ModalWrapper';

import { CustomButton } from 'components/ui/CustomButton';
import { TOuterProps } from './types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
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
