import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';

import styles from './styles.module.scss';
import { TOuterProps } from './types';

const ModalAddedItem: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  title,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        <Typography className={styles.title}>&quot;{title}&quot;</Typography>
        <Typography className={styles.action}>добавлен в корзину</Typography>
        <Link href='/cart' passHref>
          <Button className={styles.button}>Перейти в Корзину</Button>
        </Link>
        <Button onClick={closeModal} className={styles.button}>
          Продолжить покупки
        </Button>
      </Container>
    </ModalWrapper>
  );
};

export { ModalAddedItem };
