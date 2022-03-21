import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { Container, Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import ModalComponent from 'components/main/Modal';
import FormInput from 'components/main/FormInput';

import { getInputRules } from 'utility/helpers';

import { EValidatePattern } from 'constants/types';

import { TFormData, TOuterProps } from './types';

import styles from './styles.module.css';

const ModalAdvice: React.FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const { handleSubmit, control } = useForm<TFormData>();
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

  const closeModal = () => {
    setIsOpen(false);
  };

  //TODO: обработка отправки
  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
            <Box sx={{ width: '48%' }}>
              <FormInput
                helperText={nameInput.fieldState.error?.message}
                onChange={nameInput.field.onChange}
                value={nameInput.field.value}
                label='Ваше имя'
                isError={Boolean(nameInput.fieldState.error)}
              />
            </Box>
            <Box sx={{ width: '48%' }}>
              <FormInput
                helperText={phoneInput.fieldState.error?.message}
                onChange={phoneInput.field.onChange}
                value={phoneInput.field.value}
                label='Телефон'
                isError={Boolean(phoneInput.fieldState.error)}
              />
            </Box>
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
