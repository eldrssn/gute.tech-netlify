import React, { FC, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { clearUserProfileData } from 'store/reducers/user/actions';
import { logOut } from 'store/reducers/authentication/exceptionAction';
import { CustomButton } from 'components/ui/CustomButton';
import { CloseIcon } from 'components/ui/CloseIcon';
import { handleEnterPress } from 'utility/utils';

import { TOuterProps } from '../ModalSaveChanges/types';
import { ModalWrapper } from '../ModalWrapper';
import styles from './modalLogOut.module.scss';

const ModalLogOut: FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleKeyClose = (event: KeyboardEvent) =>
    handleEnterPress(event, closeModal);

  const handleClickExit = () => {
    dispatch(logOut());
    dispatch(clearUserProfileData());
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen} modalTitle='logout'>
      <Container id='modal' fixed className={styles.wrap}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          onKeyPress={handleKeyClose}
          tabIndex={0}
          id='closeExitModal'
        >
          <CloseIcon fillColor='black' />
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
