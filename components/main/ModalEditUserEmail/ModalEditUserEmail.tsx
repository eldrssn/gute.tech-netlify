import React, { useState } from 'react';
import { Container, Typography, Box, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { CustomButton } from 'components/ui/CustomButton';

import { validatePatterns } from 'constants/patterns';

import { TOuterProps } from './types';
import styles from './modalEditUserEmail.module.scss';

const ModalEditUserEmail: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  setValue,
}) => {
  const [email, setEmail] = useState('');
  const [isNextStep, setNextStep] = useState(false);

  const handleClickGetCode = () => {
    setNextStep(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEmail('');
    setNextStep(false);
  };

  const handleClickSubmitCode = () => {
    setValue('email', email);
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        {!isNextStep && (
          <>
            <Typography className={styles.title}>
              Введите новый email
            </Typography>

            <TextField
              hiddenLabel
              className={styles.inputField}
              placeholder='new-email@email.com'
              inputProps={{
                inputMode: 'email',
                pattern: validatePatterns.email.pattern,
              }}
              value={email}
              autoFocus
              focused
              onChange={(event) => setEmail(event.target.value)}
            />

            <CustomButton onClick={handleClickGetCode}>
              Получить код
            </CustomButton>
          </>
        )}

        {isNextStep && (
          <>
            <Typography className={styles.title}>
              На вашу почту {email} был отправлен код для подверждения
            </Typography>

            <TextField
              hiddenLabel
              className={styles.inputField}
              placeholder='Введите полученный код'
              defaultValue=''
            />

            <CustomButton onClick={handleClickSubmitCode}>
              Подтвердить
            </CustomButton>
          </>
        )}
      </Container>
    </ModalWrapper>
  );
};

export { ModalEditUserEmail };
