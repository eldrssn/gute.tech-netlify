import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Box, TextField, FormHelperText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { CustomButton } from 'components/ui/CustomButton';
import {
  inputCodeRule,
  inputEmailRule,
} from 'components/base/profile/UserForm/constants';

import { TFormData, TOuterProps } from './types';
import styles from './modalEditUserEmail.module.scss';

const ModalEditUserEmail: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  setValue,
}) => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  const [isNextStep, setNextStep] = useState(false);
  const email = getValues('email');

  const handleClickGetCode = () => {
    trigger();
    if (!errors.email && email) {
      setNextStep(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setNextStep(false);
  };

  const handleClickSubmitCode = () => {
    // FIXME: добавить сабмит при связке с апи
    // проверить правильность работы reset()
    if (!errors.code) {
      setValue('email', email);
      closeModal();

      reset();
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        {!isNextStep && (
          <>
            <Typography className={styles.title}>
              Введите новый email
            </Typography>

            <TextField
              type='email'
              {...register('email', inputEmailRule)}
              hiddenLabel
              className={styles.inputField}
              placeholder='new-email@email.com'
              error={Boolean(errors.email)}
              required
            />
            {errors.email && (
              <FormHelperText error className={styles.inputField_error}>
                {errors.email.message}
              </FormHelperText>
            )}

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
              {...register('code', inputCodeRule)}
            />
            {errors.code && (
              <FormHelperText error className={styles.inputField_error}>
                {errors.code.message}
              </FormHelperText>
            )}

            <CustomButton onClick={handleClickSubmitCode}>
              Подтвердить
            </CustomButton>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export { ModalEditUserEmail };
