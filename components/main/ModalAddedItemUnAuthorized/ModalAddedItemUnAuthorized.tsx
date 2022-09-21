import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalLogIn } from 'components/main/ModalLogIn';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { addProductToCartUnAuthorized } from 'store/reducers/cart/actions';
import { setAuthorizationWarning } from 'store/reducers/modal/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';

import styles from './styles.module.scss';
import { TOuterProps } from './types';
import { ModalPortal } from '../ModalPortal';

const ModalAddedItemUnAuthorized: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  slug,
}) => {
  const [isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);

  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);

  const closeModal = () => {
    dispatch(addProductToCartUnAuthorized({ product: slug, quantity: 1 }));
    dispatch(setAuthorizationWarning(false));
    setIsOpen(false);
  };

  const openModalLogin = () => {
    setIsOpenModalLogIn(true);
  };

  return (
    <>
      <ModalPortal>
        <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
          <Container fixed className={styles.wrap}>
            <Box className={styles.closeModal} onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </Box>
            <Typography className={styles.title}>Вы не авторизованы</Typography>
            <Button onClick={openModalLogin} className={styles.button}>
              Авторизироваться и добавить товар в корзину
            </Button>
            <Button onClick={closeModal} className={styles.button}>
              Добавить товар в корзину без авторизации
            </Button>
          </Container>
        </ModalWrapper>
      </ModalPortal>
      {!isAuthorized && (
        <ModalPortal>
          <ModalLogIn
            isOpen={isOpenModalLogIn}
            setIsOpen={setIsOpenModalLogIn}
          />
        </ModalPortal>
      )}
    </>
  );
};

export { ModalAddedItemUnAuthorized };
