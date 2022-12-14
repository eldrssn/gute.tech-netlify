import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { CustomButton } from 'components/ui/CustomButton';
import {
  inputCodeRule,
  inputEmailRule,
  ProfileFields,
} from 'components/base/profile/components/UserForm/constants';

import {
  editProfile,
  resetVerifyEmail,
  verifyEmail,
  resetEditProfile,
} from 'store/reducers/user/actions';
import {
  selectEditionUserProfile,
  selectVerifyEmail,
} from 'store/reducers/user/selectors';

import { TIMEOUT_DELAY } from 'utility/utils/constants';
import { handleEnterPress } from 'utility/utils';

import { modalFields } from './constants';
import { checkForErrors, checkSameEmail } from './helpers';
import { TFormData, TFormDataKeys, TOuterProps } from './types';

import styles from './modalEditUserEmail.module.scss';

const ModalEditUserEmail: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  setValue,
  getValues,
}) => {
  const {
    register,
    getValues: getValuesModal,
    trigger,
    handleSubmit,
    setError,
    clearErrors,
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

  const { error: editProfileError } = useSelector(selectEditionUserProfile);

  const isCorrectEmail = Boolean(!errors.email);
  const isCorrectCode = Boolean(!errors.code);

  useEffect(() => {
    if (!isOpen) {
      setValueModal(modalFields.EMAIL, '');
      setValueModal(modalFields.CODE, '');
      clearErrors(modalFields.EMAIL);
      clearErrors(modalFields.CODE);
    }
  }, [isOpen, setValueModal, clearErrors]);

  useEffect(() => {
    checkForErrors(verifyEmailError, setError);
    checkForErrors(editProfileError, setError);
  }, [verifyEmailError, editProfileError, setError]);

  const closeModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      setNextStep(false);
      dispatch(resetVerifyEmail());
      dispatch(resetEditProfile());
    }, TIMEOUT_DELAY);
  };

  const handleClickGetCode = async () => {
    await trigger();

    const newEmail = getValuesModal(modalFields.EMAIL);
    const oldEmail = getValues(ProfileFields.EMAIL);

    if (newEmail === oldEmail) {
      checkSameEmail(setError);
      return;
    }

    if (isCorrectEmail && newEmail) {
      dispatch(editProfile({ email: newEmail }));
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

    if (verifyEmailResponse?.status === '?????????? ????????????????????????') {
      closeModal();
      setValue(ProfileFields.EMAIL, email, { shouldDirty: true });
    }
  });

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialFocus='#enter-email'
      modalTitle='edit-email'
    >
      <form className={styles.wrap} onSubmit={handleClickSubmitCode}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          tabIndex={0}
          onKeyPress={(event: KeyboardEvent) =>
            handleEnterPress(event, closeModal)
          }
        >
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        {!isNextStep && (
          <>
            <Typography className={styles.title}>
              ?????????????? ?????????? email
            </Typography>

            <TextField
              type='email'
              {...register(modalFields.EMAIL, inputEmailRule)}
              hiddenLabel
              className={styles.inputField}
              placeholder='new-email@email.com'
              error={Boolean(errors.email)}
              autoComplete='email'
              id='enter-email'
              onChange={(event) =>
                handleChangeFormValue(event, modalFields.EMAIL)
              }
              required
              inputProps={{ maxLength: 60 }}
            />
            {errors.email && (
              <FormHelperText error className={styles.inputField_error}>
                {errors.email.message}
              </FormHelperText>
            )}

            <CustomButton
              customStyles={styles.button}
              onClick={handleClickGetCode}
            >
              ???????????????? ??????
            </CustomButton>
          </>
        )}

        {isNextStep && (
          <>
            <Typography className={styles.title}>
              ???? ???????? ?????????? {getValuesModal(modalFields.EMAIL)} ?????? ??????????????????
              ?????? ?????? ????????????????????????
            </Typography>

            <TextField
              hiddenLabel
              className={styles.inputField}
              placeholder='?????????????? ???????????????????? ??????'
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

            <CustomButton customStyles={styles.button} type='submit'>
              ??????????????????????
            </CustomButton>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export { ModalEditUserEmail };
