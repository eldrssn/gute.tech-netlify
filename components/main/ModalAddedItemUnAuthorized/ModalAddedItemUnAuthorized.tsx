import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { CloseIcon } from 'components/ui/CloseIcon';
import { ModalLogIn } from 'components/main/ModalLogIn';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { addProductToCartUnAuthorized } from 'store/reducers/cart/actions';
import { setAuthorizationWarning } from 'store/reducers/modal/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';

import { TOuterProps } from './types';
import styles from './styles.module.scss';

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
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle='add-item-unauthorized'
      >
        <Container fixed className={styles.wrap}>
          <Box className={styles.closeModal} onClick={closeModal}>
            <CloseIcon fillColor='black' />
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

      {!isAuthorized && (
        <ModalLogIn isOpen={isOpenModalLogIn} setIsOpen={setIsOpenModalLogIn} />
      )}
    </>
  );
};

export { ModalAddedItemUnAuthorized };
