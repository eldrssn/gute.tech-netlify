import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { Container, Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import InputMask from 'react-input-mask';

import ModalComponent from 'components/main/Modal';
import FormInput from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { EValidatePattern } from 'constants/types';
import { postFeedback } from 'api/routes/feedback';

import { TFormData, TOuterProps } from './types';
import styles from './styles.module.scss';

const ModalAdvice: React.FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const { handleSubmit, control, setError } = useForm<TFormData>();
  const phoneInput = useController({
    name: 'phoneNumber',
    control,
    rules: getInputRules(EValidatePattern.PHONE_NUMBER),
  });
  const nameInput = useController({
    name: 'nameValue',
    control,
    rules: getInputRules(),
  });
  const message = useController({
    name: 'message',
    control,
    rules: getInputRules(),
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit((data) => {
    postFeedback({
      name: data.nameValue,
      phone: data.phoneNumber,
      message: data.message,
    })
      .then(() => closeModal())
      .catch(() =>
        setError('phoneNumber', {
          type: 'pattern',
          message: 'Введен некорректный номер телефона',
        }),
      );
  });

  return (
    <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box className={styles.closeModal} onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </Box>
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={onSubmit} className={styles.container}>
          <Typography
            className={styles.title}
            id='modal-modal-title'
            variant='h6'
            component='h2'
            mb={1}
          >
            ОСТАВЬТЕ ВАШ НОМЕР ТЕЛЕФОНА
          </Typography>
          <Typography id='modal-modal-description' sx={{ mb: 3 }}>
            Мы перезвоним в течение 17 минут и предложим лучший вариант!
          </Typography>
          <Box component='div' className={styles.inputBox}>
            <Box className={styles.inputContainer}>
              <FormInput
                helperText={nameInput.fieldState.error?.message}
                onChange={nameInput.field.onChange}
                value={nameInput.field.value}
                label='Ваше имя'
                isError={Boolean(nameInput.fieldState.error)}
              />
            </Box>
            <Box className={styles.inputContainer}>
              <InputMask
                onChange={phoneInput.field.onChange}
                value={phoneInput.field.value}
                mask='+79999999999'
              >
                <FormInput
                  helperText={phoneInput.fieldState.error?.message}
                  onChange={phoneInput.field.onChange}
                  value={phoneInput.field.value}
                  label='Телефон'
                  isError={Boolean(phoneInput.fieldState.error)}
                />
              </InputMask>
            </Box>
          </Box>
          <Box className={styles.textAreaContainer}>
            <FormInput
              helperText={message.fieldState.error?.message}
              onChange={message.field.onChange}
              value={message.field.value}
              label='Введите ваше сообщение'
              isError={Boolean(message.fieldState.error)}
              textarea
            />
          </Box>
          <Button onClick={onSubmit} variant={'contained'}>
            Отправить
          </Button>
          <Typography
            className={styles.policy}
            id='modal-modal-title'
            component='p'
            mb={1}
          >
            Нажимая на кнопку «Отправить», вы даете согласие на обработку даных
            и соглашаетесь с{' '}
            <Link href='/policy'>политикой конфиденциальности.</Link>
          </Typography>
        </form>
      </Container>
    </ModalComponent>
  );
};

export default ModalAdvice;
