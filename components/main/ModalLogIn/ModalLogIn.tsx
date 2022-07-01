import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { setActiveAuthorizationForm } from 'store/reducers/authentication/actions';
import {
  selectactiveAuthorizationForm,
  selectIsAuthorized,
} from 'store/reducers/authentication/selectors';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { resetAllField } from 'store/reducers/authentication/actions';
import { ActiveAutorizationFormKey } from 'constants/types';

import { FormLogIn } from './components/FormLogIn';
import { FormRegistration } from './components/FormRegistration';
// import { FormResetPassword } from './components/FormResetPassword';
import { FormRegistrationVerification } from './components/FormRegistrationVerification';
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

  useEffect(() => {
    if (isAuthorized) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const ActiveFormComponent = {
    [ActiveAutorizationFormKey.AUTHORIZATION]: <FormLogIn isOpen={isOpen} />,
    [ActiveAutorizationFormKey.REGISTRATION]: <FormRegistration />,
    [ActiveAutorizationFormKey.REGISTRATION_VERIFICATION]: (
      <FormRegistrationVerification closeModal={closeModal} />
    ),
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={closeModal}>
      <Box className={styles.closeModal} onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </Box>
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box className={styles.formWrap}>
          {ActiveFormComponent[activeAuthorizationForm]}
        </Box>
      </Container>
    </ModalWrapper>
  );
};

export { ModalLogIn };
