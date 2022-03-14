import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import ModalComponent from 'components/main/Modal';
import FormInput from 'components/main/FormInput';

import styles from './styles.module.css';

import { IFormData } from './types';

const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const View: React.FC = ({}) => {
  const { handleSubmit, control } = useForm<IFormData>({
    defaultValues: {
      nameValue: '',
      phoneNumber: '',
    },
  });
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  }); //TODO: обработка отправки

  return (
    <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box className={styles.closeModal} onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </Box>
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component='div' className={styles.container}>
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
              <FormInput name='nameValue' control={control} label='Ваше имя' />
            </Box>
            <Box sx={{ width: '48%' }}>
              <FormInput
                name='phoneNumber'
                control={control}
                label='Телефон'
                pattern={phonePattern}
                errorMessagePattern='Номер введен неверно'
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
        </Box>
      </Container>
    </ModalComponent>
  );
};

export default View;
