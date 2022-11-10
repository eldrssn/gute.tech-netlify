import React, { FC, useEffect, useState, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { CloseIcon } from 'components/ui/CloseIcon';
import { CustomButton } from 'components/ui/CustomButton';
import {
  changePassword,
  resetChangePassword,
} from 'store/reducers/user/actions';
import {
  selectChangePassword,
  selectChangePasswordError,
} from 'store/reducers/user/selectors';
import { TIMEOUT_DELAY } from 'utility/utils/constants';
import { handleEnterPress } from 'utility/utils';

import { ModalWrapper } from '../ModalWrapper';
import { modalFields, passwordRule } from './constants';
import { TFormData, TOuterProps } from './types';
import { comparisonNewPasswords, checkCurrentPasswordError } from './helpers';

import styles from './modalChangePassword.module.scss';

const ModalChangePassword: FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const changePasswordResponse = useSelector(selectChangePassword);
  const changePasswordErrors = useSelector(selectChangePasswordError);

  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<TFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  const closeModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      setIsSuccess(false);
      reset();
      dispatch(resetChangePassword());
    }, TIMEOUT_DELAY);
  };

  useEffect(() => {
    checkCurrentPasswordError({ changePasswordErrors, setError });

    if (changePasswordResponse) {
      setIsSuccess(true);
    }
  }, [changePasswordErrors, setError, changePasswordResponse]);

  const onSubmit = handleSubmit((data) => {
    dispatch(changePassword(data));
  });

  const onEnterPress = (event: KeyboardEvent) => {
    handleEnterPress(event, closeModal);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle='change-password'
      initialFocus='#enter-password'
    >
      {isSuccess ? (
        <div className={styles.wrap}>
          <Box
            className={styles.closeModal}
            onClick={closeModal}
            tabIndex={0}
            onKeyPress={onEnterPress}
          >
            <CloseIcon fillColor='black' />
          </Box>

          <Typography className={styles.title}>
            {changePasswordResponse}
          </Typography>
          <Box className={styles.buttonsContainer}>
            <CustomButton onClick={closeModal}>Ок</CustomButton>
          </Box>
        </div>
      ) : (
        <form className={styles.wrap} onSubmit={onSubmit}>
          <Box
            className={styles.closeModal}
            onClick={closeModal}
            tabIndex={0}
            onKeyPress={onEnterPress}
          >
            <CloseIcon fillColor='black' />
          </Box>

          <Typography className={styles.title}>Изменение пароля</Typography>

          <span className={styles.inputField_label}>
            Введите текущий пароль
          </span>

          <TextField
            className={styles.inputField}
            type='password'
            {...register(modalFields.CURRENT_PASSWORD, passwordRule)}
            error={Boolean(errors[modalFields.CURRENT_PASSWORD])}
            autoComplete='none'
            id='enter-password'
          />
          {errors[modalFields.CURRENT_PASSWORD] && (
            <FormHelperText error className={styles.inputField_error}>
              {errors[modalFields.CURRENT_PASSWORD]?.message}
            </FormHelperText>
          )}

          <span className={styles.inputField_label}>Введите новый пароль</span>
          <TextField
            className={styles.inputField}
            type='password'
            {...register(modalFields.NEW_PASSWORD, passwordRule)}
            error={Boolean(errors[modalFields.NEW_PASSWORD])}
            autoComplete='none'
          />
          {errors[modalFields.NEW_PASSWORD] && (
            <FormHelperText error className={styles.inputField_error}>
              {errors[modalFields.NEW_PASSWORD]?.message}
            </FormHelperText>
          )}

          <span className={styles.inputField_label}>
            Повторите новый пароль
          </span>
          <TextField
            className={styles.inputField}
            type='password'
            {...register(modalFields.REPEAT_NEW_PASSWORD, {
              ...passwordRule,
              onBlur: () => trigger(),
              validate: {
                isSamePassword: () => comparisonNewPasswords(getValues),
              },
            })}
            error={Boolean(errors[modalFields.REPEAT_NEW_PASSWORD])}
            autoComplete='none'
          />
          {errors[modalFields.REPEAT_NEW_PASSWORD] && (
            <FormHelperText error className={styles.inputField_error}>
              {errors[modalFields.REPEAT_NEW_PASSWORD]?.message}
            </FormHelperText>
          )}

          <Box className={styles.buttonsContainer}>
            <CustomButton customStyles={styles.button} type='submit'>
              Применить
            </CustomButton>
            <CustomButton customStyles={styles.button} onClick={closeModal}>
              Отмена
            </CustomButton>
          </Box>
        </form>
      )}
    </ModalWrapper>
  );
};

export { ModalChangePassword };
