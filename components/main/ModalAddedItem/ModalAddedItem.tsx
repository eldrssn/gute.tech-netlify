/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';
import {
  addProductToCartAuthorized,
  addProductToCartUnAuthorized,
} from 'store/reducers/cart/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';

import styles from './styles.module.scss';
import { TOuterProps } from './types';
import { ModalPortal } from '../ModalPortal';

const ModalAddedItem: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  title,
  slug,
}) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(addProductToCartAuthorized({ product: slug, quantity: 1 }));
    }

    if (!isAuthorized) {
      dispatch(addProductToCartUnAuthorized({ product: slug, quantity: 1 }));
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ModalPortal>
        <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
          <Container fixed className={styles.wrap}>
            <Box className={styles.closeModal} onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </Box>
            <Typography className={styles.title}>
              &quot;{title}&quot;
            </Typography>
            <Typography className={styles.action}>
              добавлен в корзину
            </Typography>
            <Link href='/cart' passHref>
              <Button className={styles.button}>Перейти в Корзину</Button>
            </Link>
            <Button onClick={closeModal} className={styles.button}>
              Продолжить покупки
            </Button>
          </Container>
        </ModalWrapper>
      </ModalPortal>
    </>
  );
};

export { ModalAddedItem };
