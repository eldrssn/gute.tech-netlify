/* eslint-disable react-hooks/exhaustive-deps */
import React, { KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FocusTrap from 'focus-trap-react';

import { setActiveAuthorizationForm } from 'store/reducers/authentication/actions';
import {
  selectactiveAuthorizationForm,
  selectIsAuthorized,
} from 'store/reducers/authentication/selectors';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { resetAllField } from 'store/reducers/authentication/actions';
import { ActiveAutorizationFormKey } from 'constants/types';
import { handleEnterPress } from 'utility/utils';

import { FormLogIn } from './components/FormLogIn';
import { FormRegistration } from './components/FormRegistration';
import { FormResetPassword } from './components/FormResetPassword';
import { FormRegistrationVerification } from './components/FormRegistrationVerification';
import { FormResetPasswordVerification } from './components/FormResetPasswordVerification';
import { FormResetPasswordSet } from './components/FormResetPasswordSet';
import { FormResetPasswordSuccess } from './components/FormResetPasswordSuccess';
import { OuterProps } from './types';
import styles from './styles.module.scss';

const ModalLogIn: React.FC<OuterProps> = ({ isOpen, setIsOpen }) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const activeAuthorizationForm = useSelector(selectactiveAuthorizationForm);

  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
    );
    dispatch(resetAllField());
  };

  const handlePress = (event: KeyboardEvent) =>
    handleEnterPress(event, closeModal);

  useEffect(() => {
    if (isAuthorized) {
      closeModal();
    }
  }, [isAuthorized]);

  const ActiveFormComponent = {
    [ActiveAutorizationFormKey.AUTHORIZATION]: <FormLogIn isOpen={isOpen} />,
    [ActiveAutorizationFormKey.REGISTRATION]: <FormRegistration />,
    [ActiveAutorizationFormKey.REGISTRATION_VERIFICATION]: (
      <FormRegistrationVerification closeModal={closeModal} />
    ),
    [ActiveAutorizationFormKey.RESET_PASSWORD]: <FormResetPassword />,
    [ActiveAutorizationFormKey.RESET_PASSWORD_VERIFY]: (
      <FormResetPasswordVerification />
    ),
    [ActiveAutorizationFormKey.RESET_PASSWORD_SET]: <FormResetPasswordSet />,
    [ActiveAutorizationFormKey.RESET_PASSWORD_SUCCESS]: (
      <FormResetPasswordSuccess />
    ),
  };

  return (
    <FocusTrap>
      <ModalWrapper isOpen={isOpen} setIsOpen={closeModal}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          onKeyPress={handlePress}
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box className={styles.formWrap}>
            {ActiveFormComponent[activeAuthorizationForm]}
          </Box>
        </Container>
      </ModalWrapper>
    </FocusTrap>
  );
};

export { ModalLogIn };
