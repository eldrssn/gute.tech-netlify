import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';

import { CustomButton } from 'components/ui/CustomButton';
import { ModalSaveChanges } from 'components/main/ModalSaveChanges';
import { ModalCancelChanges } from 'components/main/ModalCancelChanges';

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
import {
  filterDirtyFields,
  setCustomErrors,
  formatBirthDate,
  formatDate,
} from './helpers';
import { UPDATE_DELAY } from './constants';
import { TFormDataFields, FormData } from './types';
import styles from './userForm.module.scss';
import { ModalEditUserEmail } from 'components/main/ModalEditUserEmail';

const UserForm = () => {
  const dispatch = useDispatch();

  const [isFormChanging, setFormChanging] = useState(false);
  const [isOpenModalSave, setIsOpenModalSave] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const { data: userProfile } = useSelector(selectUserProfile);
  const { data: editProfileResponse, error: editProfileError } = useSelector(
    selectEditionUserProfile,
  );

  const getDefaultValue = (): FormData => {
    const { date_of_birthday, ...other } = userProfile;
    if (date_of_birthday) {
      return { ...other, date_of_birthday: formatDate(date_of_birthday) };
    }

    return { ...other, date_of_birthday: null };
  };

  const defaultValue = getDefaultValue();

  const {
    handleSubmit,
    setValue,
    register,
    trigger,
    getValues,
    setError,
    reset,
    control,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues: defaultValue,
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
    const { date_of_birthday, ...other } = data;
    const newData = () => {
      if (date_of_birthday) {
        const formatDateOfBirthday = formatBirthDate(date_of_birthday);
        return { ...other, date_of_birthday: formatDateOfBirthday };
      }

      return { ...other, date_of_birthday: null };
    };

    const filteredDirtyFields = filterDirtyFields({
      data: newData(),
      dirtyFields,
    });

    dispatch(editProfile(filteredDirtyFields));
    dispatch(resetEditProfile());
    setFormChanging(false);
    setIsOpenModalSave(false);

    setTimeout(() => dispatch(fetchProfile()), UPDATE_DELAY);
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

  const resetForm = () => {
    dispatch(fetchProfile());
    reset();
    setFormChanging(false);
  };

  const [isOpenModalEmail, setIsOpenModalEmail] = useState(false);

  return (
    <>
      <form onSubmit={onSumbit} className={styles.formContainer}>
        <AccountFields
          register={register}
          onChangeForm={onChangeForm}
          setValue={setValue}
          errors={errors}
          control={control}
          getValues={getValues}
          handleChangeFormValue={handleChangeFormValue}
          setIsOpenModalEmail={setIsOpenModalEmail}
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

            {isOpenModalSave && (
              <ModalSaveChanges
                isOpen={isOpenModalSave}
                setIsOpen={setIsOpenModalSave}
              />
            )}

            <CustomButton
              customStyles={styles.button}
              onClick={openModalCancel}
            >
              Отмена
            </CustomButton>

            {isOpenModalCancel && (
              <ModalCancelChanges
                isOpen={isOpenModalCancel}
                setIsOpen={setIsOpenModalCancel}
                resetForm={resetForm}
              />
            )}
          </Box>
        )}
      </form>

      {isOpenModalEmail && (
        <ModalEditUserEmail
          isOpen={isOpenModalEmail}
          setIsOpen={setIsOpenModalEmail}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    </>
  );
};

export { UserForm };
