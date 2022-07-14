import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      {isSuccess ? (
        <div className={styles.wrap}>
          <Box className={styles.closeModal} onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
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
          <Box className={styles.closeModal} onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
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
          />
          {errors[modalFields.REPEAT_NEW_PASSWORD] && (
            <FormHelperText error className={styles.inputField_error}>
              {errors[modalFields.REPEAT_NEW_PASSWORD]?.message}
            </FormHelperText>
          )}

          <Box className={styles.buttonsContainer}>
            <CustomButton type='submit'>Применить</CustomButton>
            <CustomButton onClick={closeModal}>Отмена</CustomButton>
          </Box>
        </form>
      )}
    </ModalWrapper>
  );
};

export { ModalChangePassword };
