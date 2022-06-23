import React from 'react';
// import Link from 'next/link';
import { Container, Typography, Box } from '@mui/material';

import { ModalWrapper } from 'components/main/ModalWrapper';

import styles from './modalSaveChanges.module.scss';
import { CustomButton } from 'components/ui/CustomButton';
import { TOuterProps } from './types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalSaveChanges: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  onReset,
}) => {
  const closeModal = () => setIsOpen(false);

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        <Typography className={styles.title}>Сохранить изменения?</Typography>

        <Box className={styles.buttonsContainer}>
          <CustomButton type='submit'>Сохранить</CustomButton>
          <CustomButton onClick={onReset}>Сбросить</CustomButton>
        </Box>
      </Container>
    </ModalWrapper>
  );
};

export { ModalSaveChanges };
