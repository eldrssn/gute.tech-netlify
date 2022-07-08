import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography, Box, TextField, FormHelperText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { CustomButton } from 'components/ui/CustomButton';
import {
  inputCodeRule,
  inputEmailRule,
  ProfileFields,
} from 'components/base/profile/UserForm/constants';

import {
  editProfile,
  resetVerifyEmail,
  verifyEmail,
  resetEditProfile,
} from 'store/reducers/user/actions';
import { selectVerifyEmail } from 'store/reducers/user/selectors';

import { modalFields } from './constants';
import { checkForErrors } from './helpers';
import { TFormData, TFormDataKeys, TOuterProps } from './types';
import styles from './modalEditUserEmail.module.scss';

const ModalEditUserEmail: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  setValue,
}) => {
  const {
    register,
    getValues: getValuesModal,
    trigger,
    handleSubmit,
    setError,
    formState: { errors },
    setValue: setValueModal,
  } = useForm<TFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',

    shouldFocusError: true,
  });
  const dispatch = useDispatch();
  const [isNextStep, setNextStep] = useState(false);
  const { data: verifyEmailResponse, error: verifyEmailError } =
    useSelector(selectVerifyEmail);

  const isCorrectEmail = Boolean(!errors.email);
  const isCorrectCode = Boolean(!errors.code);

  useEffect(() => {
    if (!isOpen) {
      setValueModal(modalFields.EMAIL, '');
      setValueModal(modalFields.CODE, '');
    }
  }, [isOpen, setValueModal]);

  useEffect(() => {
    checkForErrors(verifyEmailError, setError);
  }, [verifyEmailError, setError]);

  const closeModal = () => {
    setIsOpen(false);
    setNextStep(false);
    dispatch(resetVerifyEmail());
    dispatch(resetEditProfile());
  };

  const handleClickGetCode = () => {
    trigger();

    const email = getValuesModal(modalFields.EMAIL);
    if (isCorrectEmail && email) {
      dispatch(editProfile({ email }));
      setNextStep(true);
    }
  };

  const handleChangeFormValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: TFormDataKeys,
  ) => {
    setValueModal(field, event.target.value);
  };

  const handleClickSubmitCode = handleSubmit(() => {
    const code = getValuesModal(modalFields.CODE);
    const email = getValuesModal(modalFields.EMAIL);

    if (isCorrectCode && code) {
      dispatch(verifyEmail({ code, email }));
    }

    if (verifyEmailResponse?.status === 'Почта подтверждена') {
      closeModal();
      setValue(ProfileFields.EMAIL, email);
    }
  });

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className={styles.wrap} onSubmit={handleClickSubmitCode}>
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
              {...register(modalFields.EMAIL, inputEmailRule)}
              hiddenLabel
              className={styles.inputField}
              placeholder='new-email@email.com'
              error={Boolean(errors.email)}
              autoComplete='email'
              onChange={(event) =>
                handleChangeFormValue(event, modalFields.EMAIL)
              }
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
              На вашу почту {getValuesModal(modalFields.EMAIL)} был отправлен
              код для подверждения
            </Typography>

            <TextField
              hiddenLabel
              className={styles.inputField}
              placeholder='Введите полученный код'
              {...register(modalFields.CODE, inputCodeRule)}
              onChange={(event) =>
                handleChangeFormValue(event, modalFields.CODE)
              }
            />
            {errors.code && (
              <FormHelperText error className={styles.inputField_error}>
                {errors.code.message}
              </FormHelperText>
            )}

            <CustomButton type='submit'>Подтвердить</CustomButton>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export { ModalEditUserEmail };
