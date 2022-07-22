import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logOut } from 'store/reducers/authentication/exceptionAction';
import { CustomButton } from 'components/ui/CustomButton';

import { TOuterProps } from '../ModalSaveChanges/types';
import { ModalWrapper } from '../ModalWrapper';
import styles from './modalLogOut.module.scss';

const ModalLogOut: FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickExit = () => {
    dispatch(logOut());
    closeModal();
    router.push('/');
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        <Typography className={styles.title}>Вы точно хотите выйти?</Typography>

        <Box className={styles.buttonsContainer}>
          <CustomButton customStyles={styles.button} onClick={handleClickExit}>
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

export { ModalLogOut };
