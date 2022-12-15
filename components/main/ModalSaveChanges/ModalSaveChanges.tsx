import React, { KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { CloseIcon } from 'components/ui/CloseIcon';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { CustomButton } from 'components/ui/CustomButton';
import { handleEnterPress } from 'utility/utils';
import { TOuterProps } from './types';

import styles from './modalSaveChanges.module.scss';

const ModalSaveChanges: React.FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleKeyClose = (event: KeyboardEvent) =>
    handleEnterPress(event, closeModal);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle='save-changes'
    >
      <Container fixed className={styles.wrap}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          tabIndex={0}
          onKeyPress={handleKeyClose}
        >
          <CloseIcon fillColor='black' />
        </Box>
        <Typography className={styles.title}>Сохранить изменения?</Typography>

        <Box className={styles.buttonsContainer}>
          <CustomButton
            customStyles={styles.button}
            form='user-form'
            type='submit'
          >
            Сохранить
          </CustomButton>
          <CustomButton customStyles={styles.button} onClick={closeModal}>
            Отмена
          </CustomButton>
        </Box>
      </Container>
    </ModalWrapper>
  );
};

export { ModalSaveChanges };
