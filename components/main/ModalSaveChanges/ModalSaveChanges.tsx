import React, { KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { handleEnterPress } from 'utility/utils';

import { CustomButton } from 'components/ui/CustomButton';
import { TOuterProps } from './types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        <Typography className={styles.title}>Сохранить изменения?</Typography>

        <Box className={styles.buttonsContainer}>
          <CustomButton customStyles={styles.button} type='submit'>
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
