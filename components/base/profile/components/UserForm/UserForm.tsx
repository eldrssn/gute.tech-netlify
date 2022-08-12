import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';

import { CustomButton } from 'components/ui/CustomButton';
import { ModalSaveChanges } from 'components/main/ModalSaveChanges';
import { ModalEditUserEmail } from 'components/main/ModalEditUserEmail';

import { ProfileResponseData } from 'api/models/user';
import {
  editProfile,
  fetchProfile,
  resetEditProfile,
} from 'store/reducers/user/actions';
import {
  selectEditionUserProfile,
  selectUserProfile,
} from 'store/reducers/user/selectors';

import { AccountFields } from './components/AccountFields';
import { PersonalFields } from './components/PersonalFields';
import { filterDirtyFields, setCustomErrors } from './helpers';
import { TFormDataFields } from './types';
import styles from './userForm.module.scss';
import { ModalCancelChanges } from 'components/main/ModalCancelChanges';

const UserForm = () => {
  const dispatch = useDispatch();

  const [isFormChanging, setFormChanging] = useState(false);
  const [isOpenModalSave, setIsOpenModalSave] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [isOpenModalEmail, setIsOpenModalEmail] = useState(false);

  const { data: userProfile } = useSelector(selectUserProfile);
  const { data: editProfileResponse, error: editProfileError } = useSelector(
    selectEditionUserProfile,
  );

  const {
    handleSubmit,
    setValue,
    register,
    trigger,
    getValues,
    setError,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ProfileResponseData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues: { ...userProfile },
    shouldFocusError: true,
  });

  useEffect(() => {
    const isSuccess = editProfileResponse?.status === 'success';

    if (isSuccess) {
      return;
    }

    setCustomErrors({
      editProfileError,
      userProfile,
      setError,
    });
  }, [editProfileError, editProfileResponse, setError, userProfile]);

  const onSumbit = handleSubmit(async (data) => {
    const filteredDirtyFields = filterDirtyFields({ data, dirtyFields });

    dispatch(editProfile(filteredDirtyFields));
    dispatch(resetEditProfile());
    setFormChanging(false);
    setIsOpenModalSave(false);

    setTimeout(() => dispatch(fetchProfile()));
  });

  const openModalSave = async () => {
    const isValid = await trigger();

    if (isValid) {
      setIsOpenModalSave(true);
    }
  };

  const openModalCancel = () => {
    setIsOpenModalCancel(true);
  };

  const onChangeForm = async () => {
    await trigger();
    setFormChanging(true);
  };

  const handleChangeFormValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: TFormDataFields,
  ) => {
    onChangeForm();
    setValue(field, event.target.value, { shouldDirty: true });
  };

  const handleOpenModalEmail = () => setIsOpenModalEmail(true);

  const resetForm = () => {
    reset();
    setFormChanging(false);
  };

  return (
    <>
      {isOpenModalEmail && (
        <ModalEditUserEmail
          isOpen={isOpenModalEmail}
          setIsOpen={setIsOpenModalEmail}
          setValue={setValue}
          getValues={getValues}
        />
      )}

      {isOpenModalCancel && (
        <ModalCancelChanges
          isOpen={isOpenModalCancel}
          setIsOpen={setIsOpenModalCancel}
          resetForm={resetForm}
        />
      )}

      <form onSubmit={onSumbit} className={styles.formContainer}>
        {isOpenModalSave && (
          <ModalSaveChanges
            isOpen={isOpenModalSave}
            setIsOpen={setIsOpenModalSave}
          />
        )}

        <AccountFields
          register={register}
          onChangeForm={onChangeForm}
          setValue={setValue}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          handleChangeFormValue={handleChangeFormValue}
          handleOpenModalEmail={handleOpenModalEmail}
        />

        <PersonalFields
          register={register}
          onChangeForm={onChangeForm}
          errors={errors}
          getValues={getValues}
          handleChangeFormValue={handleChangeFormValue}
          setValue={setValue}
        />

        {isFormChanging && (
          <Box className={styles.buttonsContainer}>
            <CustomButton customStyles={styles.button} onClick={openModalSave}>
              Сохранить
            </CustomButton>
            <CustomButton
              customStyles={styles.button}
              onClick={openModalCancel}
            >
              Отмена
            </CustomButton>
          </Box>
        )}
      </form>
    </>
  );
};

export { UserForm };
